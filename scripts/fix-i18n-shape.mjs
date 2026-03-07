import { createClient } from '@sanity/client'

const client = createClient({
  projectId: '1vde8zeh',
  dataset: 'production',
  token:
    'skKwMPpCUbB7PoyqhOzaLQVu4XBMndi4mEAO8rA152bDlIpDuGPbyeGQV5yP8d7h1LMBjEwZgCrm4KBdxzgXuiRPCiVP7mO91RWTCdHmp51HwdZPfGYoyFH2VHH9MYGRzkqhZyphx1lOx2IAsxPSHCDo8pPzOf0OHKwvZKjyFSGkaVHgTpQP',
  apiVersion: '2023-10-01',
  useCdn: false,
})
const TARGET_TYPES = new Set(['localeBlock', 'localeRichBlock'])
const LANGS = ['en', 'fr', 'ar']
const dryRun = DRY_RUN !== 'false'
const batchSize = Number(BATCH_SIZE) || 200

function isPlainObject(v) {
  return !!v && typeof v === 'object' && !Array.isArray(v)
}

function looksLikeLocaleObject(node) {
  if (!isPlainObject(node)) return false
  return LANGS.some((k) => Object.prototype.hasOwnProperty.call(node, k))
}

// Choose locale type:
// - if node._type is valid target => keep
// - else default to localeBlock (safe) OR infer from usage? Here default localeBlock.
function resolveLocaleType(node) {
  const t = node?._type
  if (typeof t === 'string' && TARGET_TYPES.has(t)) return t
  // If you want stricter behavior, return null to skip unknown
  return 'localeBlock'
}

function buildNormalizedLocaleObject(existing, localeType) {
  const base = isPlainObject(existing) ? existing : {}
  const out = { ...base, _type: localeType }
  for (const lang of LANGS) {
    const v = base[lang]
    out[lang] = Array.isArray(v) ? v : []
  }
  return out
}

function collectFixes(node, path, fixes, docMeta) {
  if (Array.isArray(node)) {
    node.forEach((item, idx) => {
      const seg =
        isPlainObject(item) && typeof item._key === 'string'
          ? `[_key=="${item._key}"]`
          : `[${idx}]`
      collectFixes(item, path ? `${path}${seg}` : seg, fixes, docMeta)
    })
    return
  }

  if (!isPlainObject(node)) return

  const nodeType = resolveLocaleType(node)
  const isTarget =
    (typeof node._type === 'string' && TARGET_TYPES.has(node._type)) ||
    looksLikeLocaleObject(node)

  if (isTarget && nodeType) {
    let needs = false

    for (const lang of LANGS) {
      const hasKey = Object.prototype.hasOwnProperty.call(node, lang)
      const v = node[lang]
      // needs fix if missing key OR key exists but not array
      if (!hasKey) needs = true
      else if (!Array.isArray(v)) needs = true
    }

    // also ensure _type is correct target if possible
    if (!(typeof node._type === 'string' && TARGET_TYPES.has(node._type))) {
      needs = true
    }

    if (needs) {
      fixes.push({
        _id: docMeta._id,
        _type: docMeta._type,
        path,
        localeType: nodeType,
        after: buildNormalizedLocaleObject(node, nodeType),
      })
    }
  }

  for (const [k, v] of Object.entries(node)) {
    if (k === '_type') continue
    collectFixes(v, path ? `${path}.${k}` : k, fixes, docMeta)
  }
}

async function fetchAllDocs() {
  let start = 0
  const all = []
  const sysFilter = `!(_type match "system.**")`
  const draftFilter =
    INCLUDE_DRAFTS !== 'false' ? '' : ` && !(_id match "drafts.*")`

  while (true) {
    const query = `*[
      ${sysFilter}${draftFilter}
    ] | order(_id asc) [${start}...${start + batchSize}]`
    const docs = await client.fetch(query)
    if (!docs.length) break
    all.push(...docs)
    start += batchSize
  }
  return all
}

function groupByDoc(fixes) {
  const map = new Map()
  for (const fx of fixes) {
    if (!map.has(fx._id)) map.set(fx._id, [])
    map.get(fx._id).push(fx)
  }
  return map
}

async function main() {
  console.log(`DRY_RUN = ${dryRun ? 'true' : 'false'}`)
  console.log('Fetching documents...')
  const docs = await fetchAllDocs()
  console.log(`Fetched ${docs.length} docs.`)

  const fixes = []
  for (const doc of docs) {
    collectFixes(doc, '', fixes, { _id: doc._id, _type: doc._type })
  }

  if (!fixes.length) {
    console.log('No fixes needed ✅')
    return
  }

  console.log(`Found ${fixes.length} locale objects to normalize.`)
  const byDoc = groupByDoc(fixes)

  for (const [docId, docFixes] of byDoc.entries()) {
    console.log(`\n--- Patching doc: ${docId} (${docFixes.length} changes)`)

    let patch = client.patch(docId)

    for (const fx of docFixes) {
      if (!fx.path) continue
      patch = patch.set({ [fx.path]: fx.after })
      console.log(`  - set ${fx.path} => ${fx.localeType} (en/fr/ar arrays)`)
    }

    if (dryRun) {
      console.log('  (dry run) not committed.')
      continue
    }

    const res = await patch.commit({ autoGenerateArrayKeys: true })
    console.log(`  ✅ committed: ${res._id}`)
  }

  console.log('\nDone.')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
