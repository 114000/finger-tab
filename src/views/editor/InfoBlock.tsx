import { identity } from '@coloration/kit'
import React, { FC } from 'react'
import { useEditorStore } from './store'

export interface IInfoBlockProps {}
export const InfoBlock: FC<IInfoBlockProps> = (

) => {
  const [{ 
    title,
    author,
    publishDate,
    album
  }] = useEditorStore(identity)
  return (
    <div>
      <h1>{ title }</h1>
      <p>{ author }</p>
      <p>{ publishDate }</p>
      <p>{ album }</p>
    </div>
  )
}