import dynamic from 'next/dynamic'
import { draftMode } from 'next/headers'
import Link from 'next/link'

import HandleLink from '@/components/global/HandleLink'
import PostListPage from '@/components/pages/post/PostListPage'
import { studioUrl } from '@/sanity/lib/api'
import { loadPosts } from '@/sanity/loader/loadQuery'

const PostListPagePreview = dynamic(
  () => import('@/components/pages/post/PostListPagePreview'),
)
type Props = {
  params: { locale: 'en' | 'fr' | 'ar' }
}
export default async function IndexRoute({ params }: Props) {
  const lang = params.locale ?? 'en'
  const initial = await loadPosts(lang)

  if (draftMode().isEnabled) {
    return <PostListPagePreview initial={initial} />
  }

  if (!initial.data) {
    return (
      <div className="text-center">
        You don&rsquo;t have posts yet,{' '}
        <HandleLink href={`${studioUrl}/desk/post`} className="underline">
          create one now
        </HandleLink>
        !
      </div>
    )
  }

  return <PostListPage data={initial.data} />
}
