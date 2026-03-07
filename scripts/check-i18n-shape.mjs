// scripts/check-i18n-shape.mjs
import { createClient } from '@sanity/client'
const {
  DRY_RUN = 'true',
  INCLUDE_DRAFTS = 'true',
  BATCH_SIZE = '300',
} = process.env
const client = createClient({
  projectId: '1vde8zeh',
  dataset: 'production',
  token:
    'skKwMPpCUbB7PoyqhOzaLQVu4XBMndi4mEAO8rA152bDlIpDuGPbyeGQV5yP8d7h1LMBjEwZgCrm4KBdxzgXuiRPCiVP7mO91RWTCdHmp51HwdZPfGYoyFH2VHH9MYGRzkqhZyphx1lOx2IAsxPSHCDo8pPzOf0OHKwvZKjyFSGkaVHgTpQP',
  apiVersion: '2023-10-01',
  useCdn: false,
})

const LANGS = ['en', 'fr', 'ar']
const dryRun = DRY_RUN !== 'false'
const includeDrafts = INCLUDE_DRAFTS !== 'false'
const batchSize = Number(BATCH_SIZE) || 300

function isPlainObject(v) {
  return !!v && typeof v === 'object' && !Array.isArray(v)
}

const EXPECTED = {
  localeBlock: 'array',
  localeRichBlock: 'array',
  localeString: 'string',
}

function normalizeLocale(existing, localeType) {
  const base = isPlainObject(existing) ? existing : {}
  const expected = EXPECTED[localeType]

  const out = { ...base, _type: localeType }

  for (const lang of LANGS) {
    const v = base[lang]

    if (expected === 'array') out[lang] = Array.isArray(v) ? v : []
    if (expected === 'string') out[lang] = typeof v === 'string' ? v : ''
  }

  return out
}

function collectFixes(node, path, fixes, docMeta) {
  if (Array.isArray(node)) {
    node.forEach((item, idx) =>
      collectFixes(item, `${path}[${idx}]`, fixes, docMeta),
    )
    return
  }

  if (!isPlainObject(node)) return

  const localeType = node._type
  const expected = EXPECTED[localeType]

  if (expected) {
    let needs = false

    for (const lang of LANGS) {
      const v = node[lang]

      if (expected === 'array') {
        if (!Array.isArray(v)) needs = true // includes undefined, null, string...
      }
      if (expected === 'string') {
        if (typeof v !== 'string') needs = true // includes undefined, null, array...
      }
    }

    if (needs) {
      fixes.push({
        _id: docMeta._id,
        _type: docMeta._type,
        path,
        localeType,
        after: normalizeLocale(node, localeType),
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

  while (true) {
    const q = `*[
      !(_type match "system.**")
      ${includeDrafts ? '' : ' && !(_id match "drafts.*")'}
    ] | order(_id asc) [${start}...${start + batchSize}]`

    const docs = await client.fetch(q)
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
      patch = patch.set({ [fx.path]: fx.after })
      console.log(`  - set ${fx.path} (${fx.localeType})`)
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
