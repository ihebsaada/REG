import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { createClient } from '@sanity/client'

// ====== 1) Load schema.json ======
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// schema.json is at project root, script is in /scripts
const schemaPath = path.join(__dirname, '..', 'schema.json')
const schema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'))

const client = createClient({
  projectId: '1vde8zeh',
  dataset: 'production',
  token:
    'skKwMPpCUbB7PoyqhOzaLQVu4XBMndi4mEAO8rA152bDlIpDuGPbyeGQV5yP8d7h1LMBjEwZgCrm4KBdxzgXuiRPCiVP7mO91RWTCdHmp51HwdZPfGYoyFH2VHH9MYGRzkqhZyphx1lOx2IAsxPSHCDo8pPzOf0OHKwvZKjyFSGkaVHgTpQP',
  apiVersion: '2023-10-01',
  useCdn: false,
})

// const isArray = (v) => Array.isArray(v)

// const q = `*[_type=="opportunity"]{
//   _id,
//   title,
//   overview,
//   description,
//   overviewLocalized,
//   descriptionLocalized
// }`

// function checkLocale(obj) {
//   if (!obj || typeof obj !== 'object')
//     return { ok: false, reason: 'not object' }
//   return {
//     ok: isArray(obj.en) && isArray(obj.fr) && isArray(obj.ar),
//     reason: `en:${typeof obj.en} fr:${typeof obj.fr} ar:${typeof obj.ar}`,
//   }
// }

// async function run() {
//   const docs = await client.fetch(q)
//   const bad = []

//   for (const d of docs) {
//     const problems = []

//     // legacy
//     if (!isArray(d.overview))
//       problems.push(`overview not array (${typeof d.overview})`)
//     if (!isArray(d.description))
//       problems.push(`description not array (${typeof d.description})`)

//     // localized
//     const ol = checkLocale(d.overviewLocalized)
//     if (!ol.ok) problems.push(`overviewLocalized invalid (${ol.reason})`)

//     const dl = checkLocale(d.descriptionLocalized)
//     if (!dl.ok) problems.push(`descriptionLocalized invalid (${dl.reason})`)

//     if (problems.length) bad.push({ id: d._id, title: d.title, problems })
//   }

//   console.log('BAD DOCS:', bad.length)
//   for (const b of bad) {
//     console.log('\n---', b.id, '-', b.title)
//     b.problems.forEach((p) => console.log('  •', p))
//   }
// }

// run().catch(console.error)

//find-nonarray-global

// const isArray = (v) => Array.isArray(v)

// // On check les champs les plus probables dans ton projet
// const ARRAY_FIELDS = [
//   'overview',
//   'description',
//   'body',
//   'items',
//   'sections',
//   'blocks',
//   'images',
//   'videos',
//   'files',
//   'menuItems',
//   'legal',
//   'links',
// ]

// const LOCALE_BLOCK_FIELDS = [
//   'overviewLocalized',
//   'descriptionLocalized',
//   'bodyLocalized',
// ]

// function checkLocaleArray(obj, label) {
//   // Doit être un object {en:[], fr:[], ar:[]}
//   if (!obj || typeof obj !== 'object') {
//     return [`${label} is not object (${typeof obj})`]
//   }
//   const probs = []
//   for (const k of ['en', 'fr', 'ar']) {
//     if (obj[k] !== undefined && !isArray(obj[k])) {
//       probs.push(`${label}.${k} not array (${typeof obj[k]})`)
//     }
//   }
//   // Si aucune des langues n'existe -> pas forcément une erreur, mais on note pas
//   return probs
// }

// // Tous les docs
// const q = `*[]{
//   _id, _type, title,
//   overview, description, body, items, sections, blocks, images, videos, files, menuItems, legal, links,
//   overviewLocalized, descriptionLocalized, bodyLocalized
// }`

// async function run() {
//   const docs = await client.fetch(q)
//   const bad = []

//   for (const d of docs) {
//     const problems = []

//     for (const f of ARRAY_FIELDS) {
//       if (d[f] !== undefined && !isArray(d[f])) {
//         problems.push(`${f} not array (${typeof d[f]})`)
//       }
//     }

//     for (const f of LOCALE_BLOCK_FIELDS) {
//       if (d[f] !== undefined) {
//         problems.push(...checkLocaleArray(d[f], f))
//       }
//     }

//     if (problems.length) {
//       bad.push({
//         id: d._id,
//         type: d._type,
//         title: typeof d.title === 'string' ? d.title : '',
//         problems,
//       })
//     }
//   }

//   console.log('BAD DOCS:', bad.length)
//   bad.slice(0, 50).forEach((b) => {
//     console.log(`\n--- ${b.type} | ${b.id} | ${b.title}`)
//     b.problems.forEach((p) => console.log('  •', p))
//   })

//   if (bad.length > 50) {
//     console.log(`\n...and ${bad.length - 50} more`)
//   }
// }

// run().catch(console.error)

//find-nonarray-shemajson
const isArray = (v) => Array.isArray(v)

// schema.json is an ARRAY => find directly
function getType(name) {
  return schema.find((t) => t?.name === name)
}

// In exported schema: arrays are usually type:"array" OR type:"reference"/"object"... with attributes.
// Easiest safe rule:
// - If the schema definition for a field has `value.type === 'arrayAttribute'` => it must be array
function fieldIsArrayAttribute(fieldAttr) {
  // fieldAttr is something like doc.attributes[fieldName]
  const v = fieldAttr?.value
  if (!v) return false

  // direct array
  if (v.type === 'arrayAttribute') return true

  // custom type that wraps an array (example blockContent)
  // ex: v.type === "typeReference" and v.to === "blockContent"
  if (v.type === 'typeReference') {
    const refName = v.to
    const t = getType(refName)
    // some referenced types are defined as "array" or have array-like "value"
    if (t?.value?.type === 'arrayAttribute') return true
  }

  return false
}

function collectArrayPaths(docTypeName) {
  const t = getType(docTypeName)
  const attrs = t?.attributes
  if (!attrs) return []

  const paths = []

  for (const [fieldName, fieldAttr] of Object.entries(attrs)) {
    if (fieldIsArrayAttribute(fieldAttr)) {
      paths.push(fieldName)
      continue
    }

    // localeBlock / localeRichBlock => en/fr/ar must be arrays
    // In exported schema, locale types appear as typeReference in fieldAttr.value.to
    const v = fieldAttr?.value
    if (
      v?.type === 'typeReference' &&
      (v.to === 'localeBlock' || v.to === 'localeRichBlock')
    ) {
      for (const k of ['en', 'fr', 'ar']) paths.push(`${fieldName}.${k}`)
    }
  }

  return paths
}

async function run() {
  // document types in exported schema: type === "document"
  const docTypes = schema
    .filter((t) => t?.type === 'document')
    .map((t) => t.name)

  const bad = []

  for (const typeName of docTypes) {
    const paths = collectArrayPaths(typeName)
    if (!paths.length) continue

    const projection = paths
      .map((p) => `"${p.replace(/\./g, '_')}": ${p}`)
      .join(', ')
    const query = `*[_type=="${typeName}"]{ _id, title, ${projection} }`
    const docs = await client.fetch(query)

    for (const d of docs) {
      const problems = []

      for (const p of paths) {
        const key = p.replace(/\./g, '_')
        const val = d[key]

        if (val === undefined) continue // missing is ok
        if (!isArray(val)) problems.push(`${p} not array (${typeof val})`)
      }

      if (problems.length) {
        bad.push({
          type: typeName,
          id: d._id,
          title: typeof d.title === 'string' ? d.title : '',
          problems,
        })
      }
    }
  }

  console.log('BAD DOCS:', bad.length)
  bad.slice(0, 80).forEach((b) => {
    console.log(`\n--- ${b.type} | ${b.id} | ${b.title}`)
    b.problems.forEach((p) => console.log('  •', p))
  })
  if (bad.length > 80) console.log(`\n...and ${bad.length - 80} more`)
}

run().catch(console.error)
