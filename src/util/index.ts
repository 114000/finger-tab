import { ARange, WideType, NoteV, NoteValue, SourceNote, SourceNode, LayoutStave, SourceNodeType, SourceStave } from '~/type'

export const aRange: ARange = 12

export const noteVUpMap = {
  [NoteV.c]: 'c',
  [NoteV.d]: 'd',
  [NoteV.e]: 'e',
  [NoteV.f]: 'f',
  [NoteV.g]: 'g',
  [NoteV.a]: 'a',
  [NoteV.b]: 'b',
  [0]: 'b', // %12 === 0
  [NoteV.cu]: 'c#',
  [NoteV.du]: 'd#',
  [NoteV.fu]: 'f#',
  [NoteV.gu]: 'g#',
  [NoteV.au]: 'a#',
}

export const noteVDownMap = {
  [NoteV.c]: 'c',
  [NoteV.d]: 'd',
  [NoteV.e]: 'e',
  [NoteV.f]: 'f',
  [NoteV.g]: 'g',
  [NoteV.a]: 'a',
  [NoteV.b]: 'b',
  [NoteV.db]: 'db',
  [NoteV.eb]: 'eb',
  [NoteV.gb]: 'gb',
  [NoteV.ab]: 'ab',
  [NoteV.bb]: 'bb',
}

export const noteWideMap = {
  [WideType.w]: 'w',
  [WideType.wd]: 'wd',
  [WideType.h]: 'h',
  [WideType.hd]: 'hd',
  [WideType.q]: 'q',
  [WideType.qd]: 'qd',
  [WideType.n8]: '8',
  [WideType.n8d]: '8d',
  [WideType.n16]: '16',
  [WideType.n16d]: '16d',
  [WideType.n32]: '32',
  [WideType.n32d]: '32d',
  [WideType.n64]: '64',
  [WideType.n64d]: '64d',
}

export const standardTuning: Omit<NoteValue, 'size'>[] = [
  { a: 5, v: NoteV.e },
  { a: 4, v: NoteV.b },
  { a: 4, v: NoteV.g },
  { a: 4, v: NoteV.d },
  { a: 3, v: NoteV.a },
  { a: 3, v: NoteV.e },
]



// c c#(db) d d#(eb) e f f#(gb) g g#(ab) a  a#(bb) b(cb)  
// 1 2      3 4      5 6 7      8 9      10 11     12
export function tabKeyToStaffKey (tuning: Omit<NoteValue, 'size'>[], key: string) {
  // [品, 弦] // ['1/2', '0/3', '3/5'] ['c/4', 'g/4', 'c/4']
  const [fret, str] = key.split('/').map(Number)
  const strBase = tuning[str - 1]
  let v: NoteV = (strBase.v + fret) % aRange
  let a = strBase.a + Math.floor((strBase.v + fret) / aRange)
  if (str === 2 && fret === 0) {
    console.log(strBase.v, fret, v)
  }
  return `${noteVUpMap[v]}/${a}`
}


export function sourceToLayout (
  nodes: SourceNode[], 
  { rowMaxWide, rowFirstAddWide = 0 }: {
    rowMaxWide: number,
    rowFirstAddWide?: number
  }
) : {
  rows: number
  staves: LayoutStave[]
} {

  console.log('options.rowMaxWide', rowMaxWide)

  const staves = nodes.reduce<LayoutStave[]>((staves, node, idx) => {
    if (node.t === SourceNodeType.stave) {
      const st = node as SourceStave
      const stave: LayoutStave = Object.assign({}, st, {
        notes: [],
        wide: 0,
        row: 0, 
        col: 0,
        width: 0,
        left: 0
      })

      if (idx === 0) {

      }
      staves.push(stave)
    }
    else if (
      staves.length !== 0 && 
      node.t === SourceNodeType.note
    ) {
      
      const n = node as SourceNote
      const stave = staves[staves.length - 1]
      // 最小一个 Note 提供 2 wide
      const wide = n.w < 2 ? 2 : n.w
      stave.wide += wide
      stave.notes.push(Object.assign({}, n, {
        wide: wide
      }))
    }

 


    return staves
  }, [])

  // console.log(staves.map(st => Math.log2(st.wide)))

  let row = 0
  let col = 0
  
  const rowTotalWidth: Map<number, number> = new Map([
    [0, 0]
  ])
  staves.forEach(st => {
    // 空的 stave 最少 2 wide
    st.wide = st.wide < 2 ? 2 : st.wide
    const stWidth = Math.ceil(Math.log2(st.wide))
    if (stWidth + col > rowMaxWide) {
      row += 1
      col = 0
      rowTotalWidth.set(row, 0)
    }
    rowTotalWidth.set(row, rowTotalWidth.get(row)! + stWidth)
    st.row = row
    st.col = col

    col += stWidth
  })

  // console.log(rowTotalWidth)
  // console.log(staves.map(st => ({ row: st.row, col: st.col, })))

  staves.forEach(st => {
    const rowWidth = rowTotalWidth.get(st.row)!
    let stWidth = Math.ceil(Math.log2(st.wide))
    if (st.col === 0) stWidth += rowFirstAddWide
    st.width = stWidth / (rowWidth + rowFirstAddWide)
    st.left = (st.col === 0 ? 0 : (st.col + rowFirstAddWide)) / (rowWidth + rowFirstAddWide)
  })


  return {
    rows: rowTotalWidth.size,
    staves,

  }

}