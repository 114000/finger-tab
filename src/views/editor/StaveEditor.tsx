import { identity } from '@coloration/kit'
import React, { FC, useEffect } from 'react'
import { Button } from '~/components'
import { useRenderer } from '~/hooks'
import { useEditorStore } from './store'
import { BarlineType, Beam, Formatter, Note, ElementStyle, Stave, StaveNote, TabNote, TabNoteStruct, TabStave, VoltaType } from 'vexflow'

export interface IStaveEditorProps { }
export const StaveEditor: FC<IStaveEditorProps> = (

) => {

  const [store] = useEditorStore(identity)
  const [rendererDom, { rendererContext }] = useRenderer([400, 200])

  useEffect(() => {
    if (!rendererContext) return

    const tabStave = new TabStave(
      0, 0, 400
    )
    tabStave.addClef('tab')
    tabStave.setTimeSignature(store.timeSignature.join('/'))

    tabStave.setContext(rendererContext).draw()
  }, [rendererContext, store])

  return (
    <div className="flex gap-20">
      <div>
        { rendererDom }
      </div>
      <div>

        <div className="gap-2 flex">
          <Button>1</Button>
          <Button>2</Button>
          <Button>3</Button>
          <Button>4</Button>
          <Button>New</Button>
        </div>
        <div className="flex gap-5">
          <div>
            <h4><b>D</b>uration</h4>
            <div className="flex gap-2">
              {['w', 'h', 'q', '8', '16', '32'].map(p => {
                return (
                  <Button key={p}>{p}</Button>
                )
              })}
            </div>
          </div>
          <div>
            <h4><b>S</b>tr</h4>
            <div className="flex gap-2">
              {['1', '2', '3', '4', '5', '6'].map(p => {
                return (
                  <Button key={p}>{p}</Button>
                )
              })}
            </div>
          </div>
        </div>
        <div>
          <h4><b>F</b>ret</h4>
          <div>
            <span>1</span>
            <input type="range" name="" id="" min={1} max={20} step={1} />
            <span>20</span>
          </div>
        </div>
      </div>
    </div>
  )
}