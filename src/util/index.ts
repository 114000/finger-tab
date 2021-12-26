import { ARange, SourceNoteSizeType, NoteV, NoteValue } from '~/type'

export const aRange: ARange = 12

export const noteVUpMap = {
  [NoteV.c]: 'c',
  [NoteV.d]: 'd',
  [NoteV.e]: 'e',
  [NoteV.f]: 'f',
  [NoteV.g]: 'g',
  [NoteV.a]: 'a',
  [NoteV.b]: 'b',
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

export const noteSizeMap = {
  [SourceNoteSizeType.w]: 'w',
  [SourceNoteSizeType.wd]: 'wd',
  [SourceNoteSizeType.h]: 'h',
  [SourceNoteSizeType.hd]: 'hd',
  [SourceNoteSizeType.q]: 'q',
  [SourceNoteSizeType.qd]: 'qd',
  [SourceNoteSizeType.n8]: '8',
  [SourceNoteSizeType.n8d]: '8d',
  [SourceNoteSizeType.n16]: '16',
  [SourceNoteSizeType.n16d]: '16d',
  [SourceNoteSizeType.n32]: '32',
  [SourceNoteSizeType.n32d]: '32d',
  [SourceNoteSizeType.n64]: '64',
  [SourceNoteSizeType.n64d]: '64d',
}



// c c#(db) d d#(eb) e f f#(gb) g g#(ab) a  a#(bb) b(cb)  
// 1 2      3 4      5 6 7      8 9      10 11     12
export function tabKeyToStaffKey (tuning: NoteValue[], key: string) {
  const [str, fret] = key.split('/').map(Number)
  const standard = tuning[str]
  let v: NoteV = (standard.v + fret) % aRange
  let a = standard.a + Math.floor((standard.v + fret) / aRange)
  return `${noteVUpMap[v]}/${a}`
}