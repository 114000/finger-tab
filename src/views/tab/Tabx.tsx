import React, { FC, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { BarlineType, Beam, Formatter, Note, NoteStruct, Stave, StaveNote, TabNote, TabNoteStruct, TabStave, VoltaType } from 'vexflow'
import { TabRenderer } from '~/components'
import canonData from '~/data/canon.json'
import { useRenderer } from '~/hooks'
import { SourceNode, WideType, LayoutStave, SourceNodeType, SourceNote, SourceStave, SourceStaveType } from '~/type'
import { noteWideMap, sourceToLayout, standardTuning, tabKeyToStaffKey } from '~/util'
export const Tabx: FC<{}> = () => {

  const [rendererDom, { rendererContext }] = useRenderer([window.innerWidth - 20, 1000])
  const [hasStaff, setHasStaff] = useState(false)

  useEffect(() => {
    if (!rendererContext) return
    rendererContext.clear()


    const nodes: SourceNode[] = canonData.notes
    const timeSignature: string = canonData.timeSignature
    const containerWidth = window.innerWidth - 50
    const { staves, rows } = sourceToLayout(nodes, {
      rowMaxWide: containerWidth / 50,
      rowFirstAddWide: 1
    })


    // initialize
    staves.forEach((st, idx) => {

      const top = st.row * (hasStaff ? 200 : 100)
      console.log(top)
      const tabStave = new TabStave(
        st.left * containerWidth,
        top + (hasStaff ? 70 : 0),
        st.width * containerWidth
      )


      if (st.col === 0) {
        tabStave.addClef('tab')
      }

      if (idx === 0) {
        tabStave.addTimeSignature(timeSignature)
      }

      // console.log(st.split)
      if (st.split === SourceStaveType.repeatStart) {
        tabStave.setBegBarType(BarlineType.REPEAT_BEGIN)
      }
      else if (st.split === SourceStaveType.repeatFinal) {
        tabStave.setEndBarType(BarlineType.REPEAT_END)
      }
      else if (st.split === SourceStaveType.repeatBoth) {
        tabStave.setBegBarType(BarlineType.REPEAT_BOTH)
        tabStave.setEndBarType(BarlineType.REPEAT_BOTH)
      }
      else if (st.split === SourceStaveType.end) {
        tabStave.setEndBarType(BarlineType.END)
      }

      // 反复记号
      if (st.volta) {
        if (!hasStaff) tabStave.setVoltaType(st.volta, st.voltaT || '', top - 30)
      }

      tabStave.setContext(rendererContext).draw()

      if (st.notes.length > 0) {

        const tabNotes = st.notes.map(nt => {
          const struct: TabNoteStruct = {
            positions: nt.k.map((k: string) => {
              const [fret, str] = k.split('/').map(Number)
              return { str, fret }
            }),
            duration: noteWideMap[nt.w as WideType]
          }
          // console.log(nt, struct)
          return new TabNote(struct)
        })
        Formatter.FormatAndDraw(rendererContext, tabStave, tabNotes)
      }

      if (hasStaff) {
        const nmlStave = new Stave(
          st.left * containerWidth,
          top,
          st.width * containerWidth
        )

        // const autoTabBeams = Beam.generateBeams(tabNotes)
        if (st.col === 0) {
          nmlStave.addClef('treble')
        }

        if (idx === 0) {
          nmlStave.addTimeSignature(timeSignature)
        }

        // console.log(st.split)
        if (st.split === SourceStaveType.repeatStart) {
          nmlStave.setBegBarType(BarlineType.REPEAT_BEGIN)
        }
        else if (st.split === SourceStaveType.repeatFinal) {
          nmlStave.setEndBarType(BarlineType.REPEAT_END)
        }
        else if (st.split === SourceStaveType.repeatBoth) {
          nmlStave.setBegBarType(BarlineType.REPEAT_BOTH)
          nmlStave.setEndBarType(BarlineType.REPEAT_BOTH)
        }
        else if (st.split === SourceStaveType.end) {
          nmlStave.setEndBarType(BarlineType.END)
        }

        // 反复记号
        if (st.volta) {
          hasStaff && nmlStave.setVoltaType(st.volta, st.voltaT || '', top - 160)
        }

        nmlStave.setContext(rendererContext).draw()

        if (st.notes.length > 0) {
          const nmlNotes = st.notes.map(nt => {
            const struct: any = {
              keys: nt.k.map(k => tabKeyToStaffKey(standardTuning, k)),
              duration: noteWideMap[nt.w as WideType],
              clef: 'treble'
            }

            // console.log(struct.keys, nt.k)
            // console.log(nt, struct)
            return new StaveNote(struct)
          })

          // 必须在 format前面 否则音符会保留符尾
          const autoNmlBeams = Beam.generateBeams(nmlNotes)


          Formatter.FormatAndDraw(rendererContext, nmlStave, nmlNotes)

          autoNmlBeams.forEach(b => b.setContext(rendererContext).draw())
          // const autoTabBeams = Beam.generateBeams(tabNotes)

        }
      }
    })

  }, [rendererContext, hasStaff])

  return (
    <div className="flex-1 flex flex-col">
      <label htmlFor="">
        <input type="checkbox" checked={hasStaff} onChange={e => setHasStaff(!hasStaff)} />
        staff
      </label>

      {rendererDom}
    </div>
  )
}