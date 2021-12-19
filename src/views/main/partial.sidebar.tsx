import React, { FC, useRef } from 'react'
import { Link } from 'react-router-dom'

export const Sidebar: FC<{
  signoutPath: string,
  visible: boolean,
  sidebarToggle: (on?: any) => void
}> = (props) => {

  const { visible, sidebarToggle } = props
  const sidebar = useRef(null)

  return (
    <div className="lg:w-64">
      <div 
        onClick={sidebarToggle}
        className={`fixed inset-0 bg-gray-900 bg-opacity-30 z-40 lg:hidden lg:z-auto transition-opacity duration-200 ${visible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} aria-hidden="true"></div>

      <div
        id="sidebar"
        ref={sidebar}
        className={`
          absolute z-40 left-0 top-0 
          lg:static lg:left-auto lg:top-auto lg:translate-x-0 
          transform transition-transform duration-200 ease-in-out ${visible ? 'translate-x-0' : '-translate-x-64'}
          w-64 h-screen 
          overflow-y-scroll lg:overflow-y-auto no-scrollbar 
          flex-shrink-0 
          bg-gray-800 
          p-4 
        `}
      >
        sidebar
        <hr />
        {JSON.stringify(props.visible)}
        <hr />

      </div>

    </div>
  )
}