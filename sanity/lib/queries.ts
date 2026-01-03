import { groq } from 'next-sanity'

export const homePageQuery = groq`
*[_type == "home"][0]{
  _id,

  // ===== HOME: Title (string) =====
  "title": coalesce(
    titleLocalized[$lang],   // nouveau champ localisé
    title[$lang],            // si un jour title devient localeString
    titleLocalized.en,
    title.en,
    titleLocalized.fr,
    title.fr,
    titleLocalized.ar,
    title.ar,
    title                    // legacy string (actuel)
  ),

  // ===== HOME: Description / Overview (PortableText) =====
  "overview": coalesce(
    overviewLocalized[$lang],  // futur localeBlock
    overview[$lang],           // si overview devient localeBlock
    overviewLocalized.en,
    overview.en,
    overviewLocalized.fr,
    overview.fr,
    overviewLocalized.ar,
    overview.ar,
    overview                   // legacy array (actuel)
  ),

  sections[]->{
    _id,
    _type,

    // ===== SECTION TITLE =====
    "title": coalesce(
      titleLocalized[$lang],
      title[$lang],
      titleLocalized.en,
      title.en,
      titleLocalized.fr,
      title.fr,
      titleLocalized.ar,
      title.ar,
      title
    ),

    // ===== SECTION SUBTITLE =====
    "subtitle": coalesce(
      subtitleLocalized[$lang],
      subtitle[$lang],
      subtitleLocalized.en,
      subtitle.en,
      subtitleLocalized.fr,
      subtitle.fr,
      subtitleLocalized.ar,
      subtitle.ar,
      subtitle
    ),

    // ===== SECTION DESCRIPTION (overviewLocalized + fallback description legacy) =====
    "description": coalesce(
      overviewLocalized[$lang],
      overviewLocalized.en,
      overviewLocalized.fr,
      overviewLocalized.ar,
      description              // blockContent legacy
    ),

    // ===== SECTION CTA (localisé) =====
    "cta": coalesce(
      ctaLocalized[$lang],
      ctaLocalized.en,
      ctaLocalized.fr,
      ctaLocalized.ar,
      cta                      // legacy
    ),

    ctaLink,
    coverImage,
    icon,
    tags,

    videos[]{
      asset->{ url }
    },

    // ===== NESTED BLOCKS (customBlock[]) =====
    blocks[]{
      _key,

      "title": coalesce(
        titleLocalized[$lang],
        title[$lang],
        titleLocalized.en,
        title.en,
        titleLocalized.fr,
        title.fr,
        titleLocalized.ar,
        title.ar,
        title
      ),

      "subtitle": coalesce(
        subtitleLocalized[$lang],
        subtitle[$lang],
        subtitleLocalized.en,
        subtitle.en,
        subtitleLocalized.fr,
        subtitle.fr,
        subtitleLocalized.ar,
        subtitle.ar,
        subtitle
      ),

      "description": coalesce(
        overviewLocalized[$lang],
        overviewLocalized.en,
        overviewLocalized.fr,
        overviewLocalized.ar,
        description
      ),

      "cta": coalesce(
        ctaLocalized[$lang],
        ctaLocalized.en,
        ctaLocalized.fr,
        ctaLocalized.ar,
        cta
      ),

      icon,
      author->{ name, picture },
      ctaLink
    },

    // ===== APPLICATIONS MISES EN AVANT =====
    showcaseApplications[]->{
      _id,
      "coverImage": coverImage.asset->url,

      // TITLE
      "title": coalesce(
        titleLocalized[$lang],
        title[$lang],
        titleLocalized.en,
        title.en,
        titleLocalized.fr,
        title.fr,
        titleLocalized.ar,
        title.ar,
        title
      ),

      // DESCRIPTION (riche)
      "description": coalesce(
        descriptionLocalized[$lang],
        description[$lang],
        descriptionLocalized.en,
        description.en,
        descriptionLocalized.fr,
        description.fr,
        descriptionLocalized.ar,
        description.ar,
        description
      ),

      // OVERVIEW courte
      "overview": coalesce(
        overviewLocalized[$lang],
        overview[$lang],
        overviewLocalized.en,
        overview.en,
        overviewLocalized.fr,
        overview.fr,
        overviewLocalized.ar,
        overview.ar,
        overview
      ),

      "slug": slug.current,
      tags,
      ios,
      android,
      github,
      playstore,
      site,
      appstore,
    },

    // ===== PROJECTS MISES EN AVANT =====
    showcaseProjects[]->{
      _id,
      _type,
      coverImage,
      "overview": coalesce(
        overviewLocalized[$lang],
        overview[$lang],
        overviewLocalized.en,
        overview.en,
        overviewLocalized.fr,
        overview.fr,
        overviewLocalized.ar,
        overview.ar,
        overview
      ),
      "slug": slug.current,
      tags,
      "title": coalesce(
        titleLocalized[$lang],
        title[$lang],
        titleLocalized.en,
        title.en,
        titleLocalized.fr,
        title.fr,
        titleLocalized.ar,
        title.ar,
        title
      ),
    },

    // ===== POSTS MISES EN AVANT =====
    showcasePosts[]->{
      _id,
      coverImage,
      "overview": coalesce(
        overviewLocalized[$lang],
        overview[$lang],
        overviewLocalized.en,
        overview.en,
        overviewLocalized.fr,
        overview.fr,
        overviewLocalized.ar,
        overview.ar,
        overview
      ),
      "slug": slug.current,
      "title": coalesce(
        titleLocalized[$lang],
        title[$lang],
        titleLocalized.en,
        title.en,
        titleLocalized.fr,
        title.fr,
        titleLocalized.ar,
        title.ar,
        title
      ),
      tags
    }
  },

  partners[]->{
    _id,
    name,
    "logo": logo.asset->url,
    "alt": logo.alt,
  },

  innovation->{
    _id,
    "title": coalesce(
      titleLocalized[$lang],
      title[$lang],
      titleLocalized.en,
      title.en,
      titleLocalized.fr,
      title.fr,
      titleLocalized.ar,
      title.ar,
      title
    ),
    "overview": coalesce(
      overviewLocalized[$lang],
      overview[$lang],
      overviewLocalized.en,
      overview.en,
      overviewLocalized.fr,
      overview.fr,
      overviewLocalized.ar,
      overview.ar,
      overview
    ),
    images,
    "slug": slug.current,
  },

  opportunity->{
    _id,
    image,
    duration,
    "overview": coalesce(
      overviewLocalized[$lang],
      overview[$lang],
      overviewLocalized.en,
      overview.en,
      overviewLocalized.fr,
      overview.fr,
      overviewLocalized.ar,
      overview.ar,
      overview
    ),
    "title": coalesce(
      titleLocalized[$lang],
      title[$lang],
      titleLocalized.en,
      title.en,
      titleLocalized.fr,
      title.fr,
      titleLocalized.ar,
      title.ar,
      title
    ),
    "slug": slug.current,
  },
}
`

export const pagesBySlugQuery = groq`
  *[_type == "page" && slug.current == $slug][0]{
    _id,

    "title": coalesce(
      titleLocalized[$lang],
      title[$lang],
      titleLocalized.en,
      title.en,
      title.fr,
      title.ar,
      title
    ),

    "overview": coalesce(
      overviewLocalized[$lang],
      overview[$lang],
      overviewLocalized.en,
      overview.en,
      overview
    ),

    "body": coalesce(
      bodyLocalized[$lang],
      body[$lang],
      bodyLocalized.en,
      body.en,
      body
    ),

    certifications[]->{
      _id,
      "url": coverImage.asset->url,
      "overview": coalesce(
        overviewLocalized[$lang],
        overview[$lang],
        overviewLocalized.en,
        overview.en,
        overview
      ),
      "title": coalesce(
        titleLocalized[$lang],
        title[$lang],
        titleLocalized.en,
        title.en,
        title.fr,
        title.ar,
        title
      ),
      "slug": slug.current,
    },

    images[]{
      "url": asset->url,
      alt,
      caption
    },

    videos[]{
      "url": asset->url,
      alt,
      caption
    },

    files[]{
      _key,
      "url": asset->url
    },

    "slug": slug.current,
  }
`

export const projectsQuery = groq`
  *[_type == "projects_page"][0]{
    _id,

    // titre de la page, localisé puis fallback legacy
    "title": coalesce(
      titleLocalized[$lang],
      titleLocalized.en,
      title
    ),

    // overview de la page, localisé puis fallback legacy
    "overview": coalesce(
      overviewLocalized[$lang],
      overviewLocalized.en,
      overview
    ),

    items[]->{
      _id,
      _type,
      client,
      coverImage,

      // titre du projet
      "title": coalesce(
        titleLocalized[$lang],
        titleLocalized.en,
        title
      ),

      // overview du projet
      "overview": coalesce(
        overviewLocalized[$lang],
        overviewLocalized.en,
        overview
      ),

      // description courte / riche si tu en as besoin dans la liste
      "description": coalesce(
        descriptionLocalized[$lang],
        descriptionLocalized.en,
        description
      ),

      duration,
      site,
      "slug": slug.current,
      tags,
    },
  }
`

export const projectBySlugQuery = groq`
  *[_type == "project" && slug.current == $slug][0]{
    _id,
    client,
    coverImage,

    "title": coalesce(
      titleLocalized[$lang],
      titleLocalized.en,
      title
    ),

    "overview": coalesce(
      overviewLocalized[$lang],
      overviewLocalized.en,
      overview
    ),

    "description": coalesce(
      descriptionLocalized[$lang],
      descriptionLocalized.en,
      description
    ),

    duration,
    site,
    "slug": slug.current,
    tags,

    certifications[]->{
      _id,
      "url": coverImage.asset->url,
      overview,
      title,
      "slug": slug.current,
    },

    images[]{ "url": asset->url, alt, caption },
    videos[]{ "url": asset->url, alt, caption },
    files[]{ _key, "url": asset->url },
  }
`

export const certificationsQuery = groq`
  *[_type == "certification"]{
    _id,
    coverImage,
    "overview": coalesce(
      overviewLocalized[$lang],
      overview[$lang],
      overviewLocalized.en,
      overview.en,
      overview
    ),
    "title": coalesce(
      titleLocalized[$lang],
      title[$lang],
      titleLocalized.en,
      title.en,
      title.fr,
      title.ar,
      title
    ),
    "slug": slug.current,
  }
`
export const certificationBySlugQuery = groq`
  *[_type == "certification" && slug.current == $slug][0]{
    _id,
    coverImage{
      asset->{ _id, url }
    },
    "overview": coalesce(
      overviewLocalized[$lang],
      overview[$lang],
      overviewLocalized.en,
      overview.en,
      overview
    ),
    "title": coalesce(
      titleLocalized[$lang],
      title[$lang],
      titleLocalized.en,
      title.en,
      title.fr,
      title.ar,
      title
    ),
  }
`

export const opportunitiesPageQuery = groq`
  *[_type == "opportunities_page"][0]{
    _id,
    "title": coalesce(
      titleLocalized[$lang],
      titleLocalized.en,
      title
    ),
    "overview": coalesce(
      overviewLocalized[$lang],
      overviewLocalized.en,
      overview
    ),

    items[]->{
      _id,
      _type,
      image,
      duration,
      "overview": coalesce(overviewLocalized[$lang], overviewLocalized.en, overview),
      "title": coalesce(titleLocalized[$lang], titleLocalized.en, title),
      "slug": slug.current,
      tags,
    },
  }
`

export const opportunityBySlugQuery = groq`
  *[_type == "opportunity" && slug.current == $slug][0]{
    _id,
    image,
    duration,

    "title": coalesce(
      titleLocalized[$lang],
      titleLocalized.en,
      title
    ),

    "overview": coalesce(
      overviewLocalized[$lang],
      overviewLocalized.en,
      overview
    ),

    "description": coalesce(
      descriptionLocalized[$lang],
      descriptionLocalized.en,
      description
    ),

    files[]{ _key, "url": asset->url },
    links[],
  }
`

export const innovationsQuery = groq`
*[_type == "innovations_page"][0]{
  _id,

  // ===== PAGE TITLE (string) =====
  "title": coalesce(
    titleLocalized[$lang],   // nouveau modèle
    title[$lang],            // si un jour tu migres le legacy en localeString
    titleLocalized.en,
    title.en,
    titleLocalized.fr,
    title.fr,
    titleLocalized.ar,
    title.ar,
    title                    // legacy string (actuel)
  ),

  // ===== PAGE OVERVIEW (PortableText) =====
  "overview": coalesce(
    overviewLocalized[$lang],  // nouveau modèle localeBlock
    overview[$lang],           // si overview devient localeBlock
    overviewLocalized.en,
    overview.en,
    overviewLocalized.fr,
    overview.fr,
    overviewLocalized.ar,
    overview.ar,
    overview                   // legacy array (actuel)
  ),

  // ===== ITEMS: liste des innovations =====
  items[]->{
    _id,
    _type,
    "slug": slug.current,

    // ===== INNOVATION TITLE =====
    "title": coalesce(
      // modèle actuel : localeString
      title[$lang],
      title.en,
      title.fr,
      title.ar,
      // fallback legacy éventuel
      title
    ),

    // ===== INNOVATION OVERVIEW =====
    "overview": coalesce(
      // modèle actuel : localeBlock
      overview[$lang],
      overview.en,
      overview.fr,
      overview.ar,
      // fallback legacy éventuel
      overview
    ),

    // (optionnel) si tu veux un extrait de description
    "description": coalesce(
      description[$lang],
      description.en,
      description.fr,
      description.ar,
      description
    ),

    coverImage,
    tags,
    images,
  }
}
`

export const innovationBySlugQuery = groq`
*[_type == "innovation" && slug.current == $slug][0]{
  _id,

  "title": coalesce(
    titleLocalized[$lang],
    titleLocalized.en,
    titleLocalized.fr,
    titleLocalized.ar,
    title
  ),

  "overview": coalesce(
    overviewLocalized[$lang],
    overviewLocalized.en,
    overviewLocalized.fr,
    overviewLocalized.ar,
    overview
  ),

  "description": coalesce(
    descriptionLocalized[$lang],
    descriptionLocalized.en,
    descriptionLocalized.fr,
    descriptionLocalized.ar,
    description
  ),

  "slug": slug.current,
  certifications[]->{
    _id,
    "url": coverImage.asset->url,
    "slug": slug.current,

    "title": coalesce(
      titleLocalized[$lang],
      titleLocalized.en,
      titleLocalized.fr,
      titleLocalized.ar,
      title
    ),

    "overview": coalesce(
      overviewLocalized[$lang],
      overviewLocalized.en,
      overviewLocalized.fr,
      overviewLocalized.ar,
      overview
    ),
  },
  images[]{ "url": asset->url, alt, caption },
  videos[]{ "url": asset->url, alt, caption },
  files[]{ _key, "url": asset->url },
}

`

export const postsQuery = groq`
*[_type == "posts_page"][0]{
  _id,

  // ===== PAGE TITLE =====
  "title": coalesce(
    titleLocalized[$lang],
    title[$lang],
    titleLocalized.en,
    title.en,
    titleLocalized.fr,
    title.fr,
    titleLocalized.ar,
    title.ar,
    title
  ),

  // ===== PAGE OVERVIEW =====
  "overview": coalesce(
    overviewLocalized[$lang],
    overview[$lang],
    overviewLocalized.en,
    overview.en,
    overviewLocalized.fr,
    overview.fr,
    overviewLocalized.ar,
    overview.ar,
    overview
  ),

  // ===== PAGE DESCRIPTION (optionnelle) =====
  "description": coalesce(
    descriptionLocalized[$lang],
    description[$lang],
    descriptionLocalized.en,
    description.en,
    descriptionLocalized.fr,
    description.fr,
    descriptionLocalized.ar,
    description.ar,
    description
  ),

  // ===== ITEMS = POSTS =====
  items[]->{
    _id,
    _type,

    "title": coalesce(
      titleLocalized[$lang],
      title[$lang],
      titleLocalized.en,
      title.en,
      titleLocalized.fr,
      title.fr,
      titleLocalized.ar,
      title.ar,
      title
    ),

    "overview": coalesce(
      overviewLocalized[$lang],
      overview[$lang],
      overviewLocalized.en,
      overview.en,
      overviewLocalized.fr,
      overview.fr,
      overviewLocalized.ar,
      overview.ar,
      overview
    ),

    "description": coalesce(
      descriptionLocalized[$lang],
      description[$lang],
      descriptionLocalized.en,
      description.en,
      descriptionLocalized.fr,
      description.fr,
      descriptionLocalized.ar,
      description.ar,
      description
    ),

    date,
    tags,
    coverImage,
    "slug": slug.current,
    author->{ name, picture },
  },
}
`

export const postBySlugQuery = groq`
*[_type == "post" && slug.current == $slug][0]{
  _id,
  coverImage,

  // ===== TITLE =====
  "title": coalesce(
    // modèle actuel : localeString
    title[$lang],
    title.en,
    title.fr,
    title.ar,
    // fallback legacy : string simple
    title
  ),

  // ===== OVERVIEW =====
  "overview": coalesce(
    // modèle actuel : localeBlock
    overview[$lang],
    overview.en,
    overview.fr,
    overview.ar,
    // fallback legacy : array de blocks
    overview
  ),

  // ===== DESCRIPTION =====
  "description": coalesce(
    description[$lang],
    description.en,
    description.fr,
    description.ar,
    description
  ),

  "slug": slug.current,
  tags,

  author->{ name, picture },
  date,

  // ===== CERTIFICATIONS ASSOCIÉES =====
  certifications[]->{
    _id,
    "url": coverImage.asset->url,
    "slug": slug.current,

    "title": coalesce(
      title[$lang],
      title.en,
      title.fr,
      title.ar,
      title
    ),

    "overview": coalesce(
      overview[$lang],
      overview.en,
      overview.fr,
      overview.ar,
      overview
    ),
  },

  // ===== MÉDIAS NORMALISÉS =====
  images[]{ "url": asset->url, alt, caption },
  videos[]{ "url": asset->url, alt, caption },
  files[]{ _key, "url": asset->url },
}
`

export const settingsQuery = groq`
  *[_type == "settings"][0]{
    "brand": coalesce(
      brandLocalized[$lang],
      brandLocalized.en,
      brandLocalized.fr,
      brandLocalized.ar,
      // fallback legacy : string simple
      brand
    ),

    "slogan": coalesce(
     // modèle actuel : localeString
      sloganLocalized[$lang],
      sloganLocalized.en,
      sloganLocalized.fr,
      sloganLocalized.ar,
      // fallback legacy : string simple
      slogan
    ),
    footer,
    menuItems[]->{
      _type,
      "slug": slug.current,
      title,
    },
    legal[]->{
      _type,
      "slug": slug.current,
      title,
    },
    socialNetworks{
      title,
      fields[]->{
        "title": name,
        "url": link,
      }
    },
    contacts{
      title,
      fields[]->{
        label,
        value,
        icon,
        type,
      }
    },
    ogImage,
  }
`
