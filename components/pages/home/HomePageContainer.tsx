import dynamic from 'next/dynamic'
import { draftMode } from 'next/headers'
import Link from 'next/link'

import HandleLink from '@/components/global/HandleLink'
import { HomePage } from '@/components/pages/home/HomePage'
import { studioUrl } from '@/sanity/lib/api'
import { loadHomePage } from '@/sanity/loader/loadQuery'

const HomePagePreview = dynamic(
  () => import('@/components/pages/home/HomePagePreview'),
)

export default async function IndexRoute({ lang, dict }) {
  const initial = await loadHomePage(lang)

  if (draftMode().isEnabled) {
    return <HomePagePreview initial={initial} />
  }

  if (!initial.data) {
    return (
      <div className="text-center">
        You don&rsquo;t have a homepage yet,{' '}
        <HandleLink href={`${studioUrl}/desk/home`} className="underline">
          create one now
        </HandleLink>
        !
      </div>
    )
  }

  return <HomePage data={initial.data} dict={dict} />
}
