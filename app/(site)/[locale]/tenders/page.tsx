import dynamic from 'next/dynamic'
import { draftMode } from 'next/headers'

import HandleLink from '@/components/global/HandleLink'
import OpportunityListPage from '@/components/pages/opportunity/OpportunityListPage'
import { studioUrl } from '@/sanity/lib/api'
import { loadOpportunities } from '@/sanity/loader/loadQuery'

const OpportunityListPagePreview = dynamic(
  () => import('@/components/pages/opportunity/OpportunityListPagePreview'),
)
type Props = {
  params: { locale: 'en' | 'fr' | 'ar' }
}

export default async function IndexRoute({ params }: Props) {
  const lang = params.locale ?? 'en'
  const initial = await loadOpportunities(lang)

  if (draftMode().isEnabled) {
    return <OpportunityListPagePreview initial={initial} />
  }

  if (!initial.data) {
    return (
      <div className="text-center">
        You don&rsquo;t have an opportunity yet,{' '}
        <HandleLink
          href={`${studioUrl}/desk/opportunities`}
          className="underline"
        >
          create one now
        </HandleLink>
        !
      </div>
    )
  }

  return <OpportunityListPage data={initial.data} />
}
