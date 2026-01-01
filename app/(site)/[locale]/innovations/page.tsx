import dynamic from 'next/dynamic'
import { draftMode } from 'next/headers'

import HandleLink from '@/components/global/HandleLink'
import InnovationListPage from '@/components/pages/innovation/InnovationListPage'
import { studioUrl } from '@/sanity/lib/api'
import { loadInnovations } from '@/sanity/loader/loadQuery'

const InnovationListPagePreview = dynamic(
  () => import('@/components/pages/innovation/InnovationListPagePreview'),
)

type Props = {
  params: { locale: 'en' | 'fr' | 'ar' }
}

export default async function IndexRoute({ params }: Props) {
  const lang = params.locale ?? 'en'
  const initial = await loadInnovations(lang)
  if (draftMode().isEnabled) {
    return <InnovationListPagePreview initial={initial} />
  }

  if (!initial.data) {
    return (
      <div className="text-center">
        You don&rsquo;t have posts yet,{' '}
        <HandleLink
          href={`${studioUrl}/desk/innovations`}
          className="underline"
        >
          create one now
        </HandleLink>
        !
      </div>
    )
  }

  return <InnovationListPage data={initial.data} />
}
