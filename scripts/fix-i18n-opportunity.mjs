import { createClient } from '@sanity/client'

const client = createClient({
  projectId: '1vde8zeh',
  dataset: 'production',
  token:
    'skKwMPpCUbB7PoyqhOzaLQVu4XBMndi4mEAO8rA152bDlIpDuGPbyeGQV5yP8d7h1LMBjEwZgCrm4KBdxzgXuiRPCiVP7mO91RWTCdHmp51HwdZPfGYoyFH2VHH9MYGRzkqhZyphx1lOx2IAsxPSHCDo8pPzOf0OHKwvZKjyFSGkaVHgTpQP',
  apiVersion: '2023-10-01',
  useCdn: false,
})

// const q = `*[_type=="opportunity"]{
//   _id,
//   overviewLocalized,
//   descriptionLocalized
// }`

// const isArray = (v) => Array.isArray(v)

// function normalizeLocaleBlock(v) {
//   const ol = v && typeof v === 'object' ? v : {}
//   return {
//     _type: 'localeBlock',
//     en: isArray(ol.en) ? ol.en : [],
//     fr: isArray(ol.fr) ? ol.fr : [],
//     ar: isArray(ol.ar) ? ol.ar : [],
//   }
// }

// function normalizeLocaleRichBlock(v) {
//   const dl = v && typeof v === 'object' ? v : {}
//   return {
//     _type: 'localeRichBlock',
//     en: isArray(dl.en) ? dl.en : [],
//     fr: isArray(dl.fr) ? dl.fr : [],
//     ar: isArray(dl.ar) ? dl.ar : [],
//   }
// }

// async function run() {
//   const docs = await client.fetch(q)

//   for (const d of docs) {
//     const patches = {}

//     // overviewLocalized: localeBlock
//     const nextOL = normalizeLocaleBlock(d.overviewLocalized)
//     const needsOL =
//       !d.overviewLocalized ||
//       !isArray(d.overviewLocalized?.en) ||
//       !isArray(d.overviewLocalized?.fr) ||
//       !isArray(d.overviewLocalized?.ar)

//     if (needsOL) patches.overviewLocalized = nextOL

//     // descriptionLocalized: localeRichBlock
//     const nextDL = normalizeLocaleRichBlock(d.descriptionLocalized)
//     const needsDL =
//       !d.descriptionLocalized ||
//       !isArray(d.descriptionLocalized?.en) ||
//       !isArray(d.descriptionLocalized?.fr) ||
//       !isArray(d.descriptionLocalized?.ar)

//     if (needsDL) patches.descriptionLocalized = nextDL

//     if (Object.keys(patches).length) {
//       await client.patch(d._id).set(patches).commit()
//       console.log('patched', d._id, Object.keys(patches))
//     }
//   }

//   console.log('done')
// }

// run().catch(console.error)
// scripts/fix-singleton-opportunities-page.mjs

const isArray = (v) => Array.isArray(v)

function normalizeLocaleBlock(v) {
  const obj = v && typeof v === 'object' ? v : {}
  return {
    _type: 'localeBlock',
    en: isArray(obj.en) ? obj.en : [],
    fr: isArray(obj.fr) ? obj.fr : [],
    ar: isArray(obj.ar) ? obj.ar : [],
  }
}

function normalizeLocaleRichBlock(v) {
  const obj = v && typeof v === 'object' ? v : {}
  return {
    _type: 'localeRichBlock',
    en: isArray(obj.en) ? obj.en : [],
    fr: isArray(obj.fr) ? obj.fr : [],
    ar: isArray(obj.ar) ? obj.ar : [],
  }
}

async function run() {
  const doc = await client.fetch(
    `*[_type=="opportunities_page"][0]{_id, overviewLocalized, descriptionLocalized}`,
  )
  if (!doc?._id) {
    console.log('No opportunities_page doc found')
    return
  }

  const patches = {}

  // overviewLocalized is localeBlock
  const nextOL = normalizeLocaleBlock(doc.overviewLocalized)
  const needsOL =
    !doc.overviewLocalized ||
    !isArray(doc.overviewLocalized?.en) ||
    !isArray(doc.overviewLocalized?.fr) ||
    !isArray(doc.overviewLocalized?.ar)

  if (needsOL) patches.overviewLocalized = nextOL

  // descriptionLocalized (if you have it in this singleton) is localeRichBlock
  if (doc.descriptionLocalized !== undefined) {
    const nextDL = normalizeLocaleRichBlock(doc.descriptionLocalized)
    const needsDL =
      !doc.descriptionLocalized ||
      !isArray(doc.descriptionLocalized?.en) ||
      !isArray(doc.descriptionLocalized?.fr) ||
      !isArray(doc.descriptionLocalized?.ar)

    if (needsDL) patches.descriptionLocalized = nextDL
  }

  if (!Object.keys(patches).length) {
    console.log('Singleton already OK')
    return
  }

  await client.patch(doc._id).set(patches).commit()
  console.log('patched singleton', doc._id, Object.keys(patches))
}

run().catch(console.error)
