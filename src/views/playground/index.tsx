import React, { FC, memo, useEffect, useMemo, useRef, useState } from 'react'
import { ElementStyle, Accidental, TabTie, Beam, Bend, Formatter, RenderContext, Renderer, Stave, StaveNote, StaveTie, TabNote, TabStave, Vibrato, Voice, Annotation, Stroke, TabSlide, GraceNoteGroup, GraceTabNote, VoltaType, BarlineType } from 'vexflow'

function FS(fillStyle: string, strokeStyle?: string): ElementStyle {
  const ret: ElementStyle = { fillStyle };
  if (strokeStyle) {
    ret.strokeStyle = strokeStyle;
  }
  return ret;
}

const useContainer = function (type = 'default') {
  const domRef = useRef<any>()
  const rendererRef = useRef<Renderer>()
  const [context, setContext] = useState<{
    rendererContext: RenderContext,
    stave: Stave | TabStave
  }>()

  useEffect(() => {
    if (!domRef.current) return
    if (!rendererRef.current) {
      const renderer = new Renderer(domRef.current, Renderer.Backends.CANVAS)
      renderer.resize(500, 200)
      rendererRef.current = renderer
      const rendererContext = renderer.getContext()
      const stave = type === 'tab' ? new TabStave(10, 40, 400) : new Stave(10, 40, 400)
      stave.addClef(type === 'tab' ? 'tab' : 'treble').addTimeSignature('4/4')
      stave.setContext(rendererContext).draw()
      setContext({
        rendererContext,
        stave
      })
    }
  }, [domRef.current])

  const domMemo = useMemo(() => {
    return <canvas ref={domRef}></canvas>
  }, [])

  return [domMemo, context] as [typeof domMemo, typeof context]
}

/* Step 2-3 basic */
const Step2and3Renderer = memo(() => {
  const [container, context] = useContainer()
  useEffect(() => {
    if (!context) return
    const { rendererContext, stave } = context

    // Step 2: Add Some Notes
    const notes = [
      // A quarter-note C.
      new StaveNote({ clef: "treble", keys: ["c/5"], duration: "q" }),

      // A quarter-note D.
      new StaveNote({ clef: "treble", keys: ["d/4"], duration: "q" }),

      // A quarter-note rest. Note that the key (b/4) specifies the vertical
      // position of the rest.
      new StaveNote({ clef: "treble", keys: ["b/4"], duration: "qr" }),

      // A C-Major chord.
      new StaveNote({ clef: "treble", keys: ["c/4", "e/4", "g/4"], duration: "q" })
    ]

    const notes2 = [
      new StaveNote({ clef: "treble", keys: ["c/4"], duration: "w" })
    ]

    // Create a voice in 4/4 and add the notes from above
    // var voice = new Voice({num_beats: 4,  beat_value: 4});
    // voice.addTickables(notes)
    // var formatter = new Formatter().joinVoices([voice]).format([voice], 320);
    // voice.draw(context, stave)

    const voices = [
      new Voice({ num_beats: 4, beat_value: 4 }).addTickables(notes),
      new Voice({ num_beats: 4, beat_value: 4 }).addTickables(notes2)]

    const formatter = new Formatter().joinVoices(voices).format(voices, 320)
    voices.forEach(function (v) { v.draw(rendererContext, stave); })

  }, [context])
  return container
})

const Step4Renderer = () => {
  const [container, context] = useContainer()

  useEffect(() => {
    if (!context) return
    const { rendererContext, stave } = context
    const notes = [
      new StaveNote({ clef: 'treble', keys: ['e##/5'], duration: '8d' })
        .addAccidental(0, new Accidental('##'))
        .addDotToAll(),
      new StaveNote({ clef: 'treble', keys: ['b/4'], duration: '16' })
        .addAccidental(0, new Accidental('b'))
    ]

    const beams = [new Beam(notes)]
    const allNotes = notes

    Formatter.FormatAndDraw(rendererContext, stave, allNotes)
    beams.forEach(function (b) { b.setContext(rendererContext).draw() })

  }, [context])

  return container
}

/* step 4.5 自动生成横梁 beam */
const Step4hRenderer = memo(() => {
  const [container, context] = useContainer()

  useEffect(() => {
    if (!context) return
    const { rendererContext, stave } = context
    const autoNotes = [
      new StaveNote({ clef: "treble", keys: ["e##/5"], duration: "8d" }).
        addAccidental(0, new Accidental("##")).addDotToAll(),
      new StaveNote({ clef: "treble", keys: ["b/4"], duration: "16" }).
        addAccidental(0, new Accidental("b")),
      new StaveNote({ clef: "treble", keys: ["c/4"], duration: "8" }),
      new StaveNote({ clef: "treble", keys: ["d/4"], duration: "16" }),
      new StaveNote({ clef: "treble", keys: ["e/4"], duration: "16" }).
        addAccidental(0, new Accidental("b")),
      new StaveNote({ clef: "treble", keys: ["d/4"], duration: "16" }),
      new StaveNote({ clef: "treble", keys: ["e/4"], duration: "16" }).
        addAccidental(0, new Accidental("#")),
      new StaveNote({ clef: "treble", keys: ["g/4"], duration: "32" }),
      new StaveNote({ clef: "treble", keys: ["a/4"], duration: "32" }),
      new StaveNote({ clef: "treble", keys: ["g/4"], duration: "16" }),
      new StaveNote({ clef: "treble", keys: ["d/4"], duration: "q" })
    ]
    const autoBeams = Beam.generateBeams(autoNotes)
    Formatter.FormatAndDraw(rendererContext, stave, autoNotes)
    autoBeams.forEach(function (b) { b.setContext(rendererContext).draw() })
  }, [context])

  return container
})

/* step 5 连音记号 Tie */
const Step5Renderer = memo(() => {
  const [container, context] = useContainer()

  useEffect(() => {
    if (!context) return
    const { rendererContext, stave } = context
    const notes = [
      new StaveNote({ clef: "treble", keys: ["e##/5"], duration: "8d" }).
        addAccidental(0, new Accidental("##")).addDotToAll(),
      new StaveNote({ clef: "treble", keys: ["b/4"], duration: "16" }).
        addAccidental(0, new Accidental("b")),
      new StaveNote({ clef: "treble", keys: ["c/4"], duration: "8" }),
      new StaveNote({ clef: "treble", keys: ["d/4"], duration: "16" }),
      // keys 的顺序影响连音记号, 生成时需要排序
      new StaveNote({ clef: "treble", keys: ["d/4", 'f/4'], duration: "16" }),
      new StaveNote({ clef: "treble", keys: ["d/4"], duration: "q" }),
      new StaveNote({ clef: "treble", keys: ["d/4"], duration: "q" })
    ]
    var beams = Beam.generateBeams(notes);
    Formatter.FormatAndDraw(rendererContext, stave, notes);
    beams.forEach(function (b) { b.setContext(rendererContext).draw() })

    var ties = [
      new StaveTie({
        first_note: notes[4],
        last_note: notes[5],
        first_indices: [0],
        last_indices: [0]
      }),
      new StaveTie({
        first_note: notes[4],
        last_note: notes[5],
        first_indices: [1],
        last_indices: [0]
      }),
      new StaveTie({
        first_note: notes[5],
        last_note: notes[6],
        first_indices: [0],
        last_indices: [0]
      })
    ];
    ties.forEach(function (t) { t.setContext(rendererContext).draw() })
  }, [context])

  return container
})

/* step 6 吉他谱 */
const Step6Renderer = memo(() => {
  const [container, context] = useContainer('tab')

  useEffect(() => {
    if (!context) return
    const { rendererContext, stave } = context

    stave.getModifiers()[2].setStyle(FS('red'))
    stave.setMeasure(1)
    stave.setSection('A', 0);
    stave.setVoltaType(2, '1.', -5)
    stave.setVoltaType(3, '', -5)
    stave.setBegBarType(BarlineType.REPEAT_BEGIN)
    // stave.addKeySignature('A')
    stave.setContext(rendererContext).draw();
    var notes = [
      // A single note

      new TabNote({
        positions: [{ str: 3, fret: 7 }],
        duration: "8"
      }),
      new TabNote({
        positions: [{ str: 3, fret: 7 }, { str: 6, fret: 7 }],
        duration: "8"
      })
        // .addModifier(new Annotation('green text').setStyle(FS('green')), 0)
        ,
      new TabNote({
        positions: [{ str: 3, fret: 7 }],
        duration: "q"
      })
        .addStroke(0, new Stroke(1, { all_voices: false }).setStyle(FS('blue'))),
      // 下扫弦
      new TabNote({
        positions: [{ str: 3, fret: 7 }, { str: 2, fret: 7 }, { str: 1, fret: 7 },],
        duration: "q"
      })
        .addStroke(0, new Stroke(1, { all_voices: false }).setStyle(FS('blue'))),
      // 上扫弦
      new TabNote({
        positions: [{ str: 4, fret: 7 }, { str: 3, fret: 7 }, { str: 2, fret: 7 }, { str: 1, fret: 7 },],
        duration: "q"
      })
        .addStroke(1, new Stroke(2, { all_voices: false }).setStyle(FS('blue'))),
      // 下琶音
      new TabNote({
        positions: [{ str: 4, fret: 7 }, { str: 3, fret: 7 }, { str: 2, fret: 7 }, { str: 1, fret: 7 },],
        duration: "q"
      })
        .addStroke(0, new Stroke(3).setStyle(FS('blue'))),
      // 上琶音
      new TabNote({
        positions: [{ str: 4, fret: 7 }, { str: 3, fret: 7 }, { str: 2, fret: 7 }, { str: 1, fret: 7 },],
        duration: "q"
      })
        .addStroke(0, new Stroke(4).setStyle(FS('blue'))),

      // A chord with the note on the 3rd string bent
      new TabNote({
        // 2弦10品
        positions: [{ str: 2, fret: 10 },
        { str: 3, fret: 9 }],
        duration: "q"
      })
      .addModifier(new Bend("Full"), 1),

      // A single note with a harsh vibrato
      new TabNote({
        positions: [{ str: 2, fret: 5 }],
        duration: "h"
      })
      // .addModifier(new Vibrato().setHarsh(true).setVibratoWidth(70), 0)
      .addModifier(new GraceNoteGroup([
        new GraceTabNote({ positions: [{ str: 2, fret: 4 }], duration: '4' })
        // 加括号
        .setGhost(true)
      ]))
    ];

    const note1 = notes[1]
    note1.setStyle(FS('red'))
    notes.forEach(n => {
      n.render_options.draw_stem = true
      n.setStemDirection(-1)
    })

    var ties = [
      // 击弦
      TabTie.createHammeron({
        first_note: notes[0],
        last_note: notes[1],
        first_indices: [0],
        last_indices: [0]
      }),
      // 勾弦
      TabTie.createPulloff({
        first_note: notes[1],
        last_note: notes[2],
        first_indices: [0],
        last_indices: [0],
        
      }),
      new TabSlide({
        first_note: notes[2],
        last_note: notes[3],
        first_indices: [0],
        last_indices: [0]
      })
    ];




    Formatter.FormatAndDraw(rendererContext, stave, notes);

    var beams = Beam.generateBeams(notes);
    beams.forEach(function (b) { b.setContext(rendererContext).draw() })
    ties.forEach(function (t) { t.setContext(rendererContext).draw() })
  }, [context])

  return container
})


export interface IPlaygroundProps { }
export const Playground: FC<IPlaygroundProps> = ({

}) => {

  return (
    <div>
      playground
      <div className="flex flex-wrap">
        <Step2and3Renderer />
        <Step4Renderer />
        <Step4hRenderer />
        <Step5Renderer />
        <Step6Renderer />
      </div>
    </div>
  )
}
