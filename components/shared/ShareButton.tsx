'use client'
import clsx from 'clsx'
import { Copy, Facebook, Linkedin, Share2, Twitter } from 'lucide-react'
import React from 'react'

import { useDictionary } from '@/lib/useDictionary'

import { Button } from '../ui/button'

interface ShareButtonProps {
  slug?: string | { current: string }
  title?: string
  description?: string
}
export function ShareButton({ slug, title, description }: ShareButtonProps) {
  const [isOpen, setIsOpen] = React.useState(false)
  const [origin, setOrigin] = React.useState<string>('')
  const { dict } = useDictionary()

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      setOrigin(window.location.origin)
    }
  }, [])

  // normalize slug string and make sure path matches your route
  const slugStr = typeof slug === 'string' ? slug : slug?.current ?? ''
  const shareUrl = origin ? `${origin}/posts/${slugStr}` : '' // empty until hydrated

  const titles = title
    ? title.length > 60
      ? `${title.slice(0, 60)}...`
      : title
    : ''
  const desc = description ?? ''
  // elBey
  const listShareButton = [
    {
      name: 'Facebook',
      icon: <Facebook className="w-[15px]" />,
      link: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        shareUrl,
      )}`,
    },
    {
      name: 'Twitter',
      icon: <Twitter className="w-[15px]" />,
      link: `https://x.com/intent/post?url=${encodeURIComponent(shareUrl)}`,
    },
    {
      name: 'Linkedin',
      icon: <Linkedin className="w-[15px]" />,
      link: shareUrl
        ? `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
            shareUrl,
          )}&title=${encodeURIComponent(titles)}&summary=${encodeURIComponent(
            desc,
          )}&source=${encodeURIComponent(origin)}`
        : '#',
    },
    {
      name: 'Copy Link',
      icon: <Copy className="w-[15px]" />,
      link: '#',
      onClick: () => {
        if (!shareUrl) return
        navigator.clipboard.writeText(shareUrl)
        alert(dict.messages.linkCopied)
      },
    },
  ]

  const toggleShareIcons = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div>
      <div className="relative container flex justify-center items-center pt-[5px]">
        <Button
          onClick={toggleShareIcons}
          className="text-white focus:text-green bg-green-500 hover:bg-white-800 font-medium rounded-lg text-sm h-8 px-5 py-2.5 text-center inline-flex items-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 gap-2"
          type="button"
          disabled={false} // avoids "#" links pre-hydration
        >
          <Share2 className="bx h-4 w-4 bxs-share-alt text-xs text-black ²"></Share2>
          {dict.buttons.share}
        </Button>
        <div
          className={`z-10 ${
            isOpen ? 'block' : 'hidden'
          } bg-green-400 divide-y p-2 divide-gray-100 rounded-lg shadow-sm dark:bg-gray-700 absolute top-[2.8rem] border`}
        >
          <ul
            className="text-xs dark:text-white"
            aria-labelledby="dropdownDefaultButton"
          >
            {listShareButton.map((item, index) => (
              <li className="flex items-center gap-2" key={index}>
                {item.icon}
                <a
                  href={item.link}
                  onClick={item?.onClick}
                  className="block text-white font-bold hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
