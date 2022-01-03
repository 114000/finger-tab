import React, { FC, useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { BarlineType, Beam, Formatter, Note, ElementStyle, Stave, StaveNote, TabNote, TabNoteStruct, TabStave, VoltaType } from 'vexflow'
import { TabRenderer } from '~/components'
import canonData from '~/data/canon.json'
import { useRenderer } from '~/hooks'
import { SourceNode, WideType, LayoutStave, SourceNodeType, SourceNote, SourceStave, SourceStaveType } from '~/type'
import { noteWideMap, sourceToLayout, standardTuning, tabKeyToStaffKey } from '~/util'
export const Tabx: FC<{}> = () => {
  const containerWidth = window.innerWidth - 50
  const [rendererDom, { rendererContext }] = useRenderer([containerWidth + 1, 1000])
  const [hasStaff, setHasStaff] = useState(true)
  const [playBounding, setPlayBounding] = useState({
    left: 0,
    top: 0,
    width: 0,
    height: 0,
  })
  const intevalInterface = useRef(0)
  useEffect(() => {
    if (!rendererContext) return
    rendererContext.clear()


    const nodes: SourceNode[] = canonData.nodes
    const timeSignature: string = canonData.timeSignature.join('/')
    const containerWidth = window.innerWidth - 50
    const { staves, rows } = sourceToLayout(nodes, {
      rowMaxWide: containerWidth / 50,
      rowFirstAddWide: 1
    })

    

    clearInterval(intevalInterface.current)
    let index = 0
    let repeat = -1
    intevalInterface.current = setInterval(() => {
      const currentStave = staves[index]
      if (repeat === index) {
        repeat = -1
      }
      else if (currentStave.split === SourceStaveType.repeatStart) {
        repeat = index
      }

      setPlayBounding({
        left: currentStave.left * containerWidth,
        top: currentStave.row * (hasStaff ? 200 : 100) + (hasStaff ? 30 : 40),
        width: currentStave.width * containerWidth,
        height: (hasStaff ? 160 : 80),
      })

      if (currentStave.split === SourceStaveType.repeatFinal && repeat !== -1) {
        index = repeat
      }
      else {
        index++
        if (index > staves.length) {
          clearInterval(intevalInterface.current)
        }
      }
      
      
    }, 2000)


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
        console.log('getAttributes', tabStave.getStyle())
      }

      if (idx === 0) {
        tabStave.addTimeSignature(timeSignature)
      }
      // tabStave.setMeasure(idx)
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

      <div className="relative">
        {rendererDom}
        <div className="bg-red-500 absolute opacity-20 transition-all" style={playBounding}></div>
      </div>

      
    </div>
  )
}