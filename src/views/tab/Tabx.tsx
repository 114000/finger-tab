import React, { FC, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { BarlineType, Formatter, TabNote, TabNoteStruct, TabStave, VoltaType } from 'vexflow'
import { TabRenderer } from '~/components'
import canonData from '~/data/canon.json'
import { useRenderer } from '~/hooks'
import { SourceNode, SourceNoteSizeType, LayoutStave, SourceNodeType, SourceNote, SourceStave, SourceStaveType } from '~/type'
import { noteSizeMap } from '~/util'
export const Tabx: FC<{}> = () => {

  const [rendererDom, { rendererContext }] = useRenderer([window.screen.availWidth, window.screen.availHeight])


  useEffect(() => {
    if (!rendererContext) return
    console.log(canonData)
    const nodes: SourceNode[] = canonData.notes
    // 分组
    const staves = nodes.reduce<LayoutStave[]>((staves, node, idx) => {
      if (node.t === SourceNodeType.stave) {
        const st = node as SourceStave
        const stave: LayoutStave = Object.assign({}, st, {
          notes: [],
          widthSize: 0,
        })

        if (idx === 0) {

        }
        staves.push(stave)
      }
      else if (node.t === SourceNodeType.note) {
        const n = node as SourceNote

        if (staves.length === 0) return staves
        const stave = staves[staves.length - 1]
        
        stave.notes.push(Object.assign({}, n, {
          widthSize: (1 / (n.s! + 1)) + 1
        }))
      }
      return staves
    }, [])

    // format size
    staves.forEach((st, idx) => {
      st.widthSize = st.notes.reduce((acc, nt) => acc + nt.widthSize, 0)
    })   


    const sizeWidth = 50 
    let row = 0
    let colSize = 0
    console.log(staves)

    // initialize
    staves.forEach((st, idx) => {
      if ((colSize + st.widthSize) * sizeWidth > window.screen.width) {
        colSize = 0
        row += 1
      }
      const height = row * 100
      const staveMeasure = new TabStave(
        colSize * sizeWidth, 
        row * 100, 
        st.widthSize * sizeWidth
      )
      
      colSize += st.widthSize

      if (idx === 0) staveMeasure.addClef('tab')
      console.log(st.split)
      if (st.split === SourceStaveType.repeatStart) {
        staveMeasure.setBegBarType(BarlineType.REPEAT_BEGIN)
      }
      else if (st.split === SourceStaveType.repeatFinal) {
        staveMeasure.setEndBarType(BarlineType.REPEAT_END)
      }
      else if (st.split === SourceStaveType.repeatBoth) {
        staveMeasure.setBegBarType(BarlineType.REPEAT_BOTH)
        staveMeasure.setEndBarType(BarlineType.REPEAT_BOTH)
      }
      else if (st.split === SourceStaveType.end) {
        staveMeasure.setEndBarType(BarlineType.END)
      }

      if (st.volta) {
        staveMeasure.setVoltaType(st.volta, st.voltaT || '', height - 30)
      }

      staveMeasure.setContext(rendererContext).draw()
      

      if (st.notes.length > 0) {
       
        const notes1 = st.notes.map(nt => {
          const struct: TabNoteStruct = {
            positions: nt.k.map((k: string) => {
              const [fret, str] = k.split('/').map(Number)
              return { str, fret }
            }),
            duration: noteSizeMap[nt.s as SourceNoteSizeType]
          }
          // console.log(nt, struct)
          return new TabNote(struct)
        })


        Formatter.FormatAndDraw(rendererContext, staveMeasure, notes1)
      }
    })

  }, [rendererContext])

  return (
    <div className="flex-1 flex flex-col">
      {rendererDom}
    </div>
  )
}