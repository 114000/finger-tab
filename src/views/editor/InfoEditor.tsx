import { identity } from '@coloration/kit'
import React, { FC } from 'react'
import { FieldLayout, Input } from '~/components'
import { useEditorStore } from './store'

export interface IInfoEditorProps { }
export const InfoEditor: FC<IInfoEditorProps> = (

) => {
  const [store, updateStore] = useEditorStore(identity)

  return (
    <div className="flex gap-10 items-start">
      <FieldLayout
        options={[
          {
            name: 'Title',
            value: (
              <Input
                value={store.title}
                onChange={e => updateStore({ title: e.target.value })} />
            )
          },
          {
            name: 'Author',
            value: (
              <Input
                value={store.author}
                onChange={e => updateStore({ author: e.target.value })} />
            )
          },
          {
            name: 'Publish Date',
            value: (
              <Input
                value={store.publishDate}
                onChange={e => updateStore({ publishDate: e.target.value })} />
            )
          },
          {
            name: 'Album',
            value: (
              <Input
                value={store.album}
                onChange={e => updateStore({ album: e.target.value })} />
            )
          },
        ]}
      />
      <FieldLayout 
      options={[
        { name: 'Staff', value: store.type },
        { name: 'Rhythm', value: store.timeSignature.join('/') },
      ]}
    />
    </div>
  )
}