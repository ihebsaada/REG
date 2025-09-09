'use client'
import React from 'react'
import { Button } from '../ui/button'
import { Facebook, Twitter, Linkedin, Copy, Share2 } from 'lucide-react'

export function ShareButton() {
  const [isOpen, setIsOpen] = React.useState(false)
  const listShareButton = [
    {
      name: 'Facebook',
      icon: <Facebook className="w-[15px] " />,
      link: '#',
    },
    {
      name: 'Twitter',
      icon: <Twitter className="w-[15px] " />,
      link: '#',
    },
    {
      name: 'Linkedin',
      icon: <Linkedin className="w-[15px]  " />,
      link: '#',
    },
    {
      name: 'Copy Link',
      icon: <Copy className="w-[15px] " />,
      link: '#',
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
        >
          <Share2 className="bx h-4 w-4 bxs-share-alt text-xs text-black ²"></Share2>
          Share
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
                  className="block text-white font-bold hover:underline"
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
        {/* <div className={`absolute ${isOpen ? 'block' : 'hidden'}`}>
          <span className="absolute flex items-center justify-center h-8 w-8 rounded-full bg-blue-500 text-white -top-14 left-8 cursor-pointer">
            <i className="bx bxl-twitter"></i>
          </span>
          <span className="absolute flex items-center justify-center h-8 w-8 rounded-full bg-blue-500 text-white -top-4 left-12 cursor-pointer">
            <i className="bx bxl-facebook"></i>
          </span>
          <span className="absolute flex items-center justify-center h-8 w-8 rounded-full bg-blue-500 text-white top-6 left-8 cursor-pointer">
            <i className="bx bxl-linkedin"></i>
          </span>
        </div> */}
      </div>
    </div>
  )
}
