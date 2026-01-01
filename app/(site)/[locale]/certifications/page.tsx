import dynamic from 'next/dynamic'
import { draftMode } from 'next/headers'

import HandleLink from '@/components/global/HandleLink'
import CertificationListPage from '@/components/pages/certification/CertificationListPage'
import { getDictionary } from '@/lib/i18n'
import { studioUrl } from '@/sanity/lib/api'
import { loadCertifications } from '@/sanity/loader/loadQuery'

const CertificationListPagePreview = dynamic(
  () => import('@/components/pages/certification/CertificationListPagePreview'),
)

type Props = {
  params: { locale: 'en' | 'fr' | 'ar' }
}

export default async function IndexRoute({ params }: Props) {
  const initial = await loadCertifications()
  const lang = params.locale ?? 'en'
  const [dict] = await Promise.all([
    getDictionary(lang), // static JSON dict
  ])

  if (draftMode().isEnabled) {
    return <CertificationListPagePreview initial={initial} />
  }

  if (!initial.data) {
    return (
      <div className="text-center">
        You don&rsquo;t have posts yet,{' '}
        <HandleLink
          href={`${studioUrl}/desk/certification`}
          className="underline"
        >
          create one now
        </HandleLink>
        !
      </div>
    )
  }

  return <CertificationListPage data={initial.data} dict={dict} lang={lang} />
}
