import React, { FC } from 'react'
import { Icon } from '@iconify/react'
import { CircleIconButton, Metronome } from '~/components'
import { Link } from 'react-router-dom'
export const Header: FC<{
  sidebarToggle: (on?: any) => void
}> = (props) => {
  return (
    <header className="top-0 bg-white border-b border-gray-200 z-30">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 -mb-px">

          {/* Header: Left side */}
          <div className="flex">

            {/* Hamburger button */}
            <button
              className="text-gray-500 hover:text-gray-600 lg:hidden"
              aria-controls="sidebar"
              onClick={props.sidebarToggle}
            >
              <span className="sr-only">Open sidebar</span>
              <Icon icon="carbon:menu" className="text-2xl no-outline" />
            </button>

            <Metronome />
          </div>

          {/* Header: Right side */}
          <div className="flex flex-1 items-center justify-end">
            {/* <CircleIconButton icon="bx:bx-search" iconClassName="w-5 h-5" />
            <CircleIconButton icon="ion:language" iconClassName="w-4 h-4" /> */}
          </div>
          <hr className="w-px h-6 bg-gray-200 mx-3" />
          <div>
            <Link to="/">
              <CircleIconButton icon="bx:bx-search" iconClassName="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}