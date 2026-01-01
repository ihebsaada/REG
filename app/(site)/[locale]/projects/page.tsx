import dynamic from 'next/dynamic'
import { draftMode } from 'next/headers'
import Link from 'next/link'

import HandleLink from '@/components/global/HandleLink'
import ProjectListPage from '@/components/pages/project/ProjectListPage'
import { studioUrl } from '@/sanity/lib/api'
import { loadProjects } from '@/sanity/loader/loadQuery'

const ProjectListPagePreview = dynamic(
  () => import('@/components/pages/project/ProjectListPagePreview'),
)
type Props = {
  params: { locale: 'en' | 'fr' | 'ar' }
}

export default async function IndexRoute({ params }: Props) {
  const lang = params.locale ?? 'en'
  const initial = await loadProjects(lang)

  if (draftMode().isEnabled) {
    return <ProjectListPagePreview initial={initial} />
  }

  if (!initial.data) {
    return (
      <div className="text-center">
        You don&rsquo;t have a project yet,{' '}
        <HandleLink href={`${studioUrl}/desk/project`} className="underline">
          create one now
        </HandleLink>
        !
      </div>
    )
  }

  return <ProjectListPage data={initial.data} />
}
