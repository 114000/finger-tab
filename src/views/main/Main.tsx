import React, { FC } from 'react'
import { Sidebar } from './partial.sidebar'
import { Header } from './partial.header'
import { useToggle } from 'react-use'


export const Main: FC<{}> = (props) => {

  const [on, toggle] = useToggle(false)

  return (
    <div className="absolute w-full h-full flex items-stretch">
      {/* <Sidebar signoutPath="/signin" visible={on} sidebarToggle={toggle} /> */}
      <section className="flex flex-col flex-1">
        <Header sidebarToggle={toggle} />
        <div className="flex-1 overflow-y-auto flex flex-col">
        { props.children }
        </div>
      </section>
    </div>
  )
}