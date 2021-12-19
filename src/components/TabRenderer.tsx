import React, { FC, useLayoutEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
// import Vex from 'vexflow'

export const TabRenderer: FC<{ url: string }> = ({
  url
}) => {

  const contentRef = useRef<HTMLDivElement>(null)
  const tabRef = useRef<any>()
  

  useLayoutEffect(() => {
    // if (contentRef.current) {
    //   const VF = Vex.Flow
    //   const renderer = new VF.Renderer(contentRef.current, VF.Renderer.Backends.SVG)
    //   renderer.resize(500, 500)
    //   const ctx = renderer.getContext()


    //   const { TabStave, Voice, TabNote, Bend, Vibrato } = Vex.Flow
    //   const vf = new Vex.Flow.Factory({
    //     renderer: {
    //       elementId: 'tab-renderer',
    //       width: 500,
    //       height: 500
    //     }
    //   })

    //   const MeasureWidth = 300

    //   const stave = new VF.TabStave(10, 40, MeasureWidth)
    //   stave.addClef("tab").setContext(ctx).draw()

    //   var notes = [
    //     // A single note
    //     new TabNote({
    //       positions: [{ str: 3, fret: 7 }],
    //       duration: "q"
    //     }),

    //     // A chord with the note on the 3rd string bent
    //     new TabNote({
    //       positions: [{ str: 2, fret: 10 },
    //       { str: 3, fret: 9 }],
    //       duration: "q"
    //     }).
    //       addModifier(new Bend("Full"), 1),

    //     // A single note with a harsh vibrato
    //     new TabNote({
    //       positions: [{ str: 2, fret: 5 }],
    //       duration: "h"
    //     }).
    //       addModifier(new Vibrato().setHarsh(true).setVibratoWidth(MeasureWidth * 0.2), 0)
    //   ]

    //   VF.Formatter.FormatAndDraw(ctx, stave, notes)

      // const voice = new Voice({ num_beats: 4, beat_value: 4 }) 
      // voice.addTickables(notes)
      
      
      // const score = vf.EasyScore();
      // const system = vf.System({
      //   spaceBetweenStaves: 10
      // });

      

      // system
      //   .addStave({
      //     voices: [
      //       score.voice(score.notes('C#5/q, B4, A4, G#4', { stem: 'up' })),
      //       score.voice(score.notes('C#4/h, C#4', { stem: 'down' })),
      //     ],
      //   })
      //   .addClef('treble')
      //   .addClef('bass')
      //   .addClef('tab')
      //   .addTimeSignature('3/4');

      // system
      //   .addStave(st)
      //   .addClef('tab')
      //   .addTimeSignature('3/4');

      // system.addConnector()

      // vf.draw();
    // }
  }, [contentRef.current])

  return <div ref={contentRef} id="tab-renderer" className="flex-1 w-full min-h-96">
    <iframe src={url} frameBorder="0" width="100%" height="100%"></iframe>
  </div>
}