import { WideType } from "./basic"

export type NoteValue = {
  a: number
  v: NoteV,
  size: WideType
}

export type StaveValue = {
  widthSize: number,
  notes: any[]
}

export type ARange = 12



export enum NoteV {
  c = 1,
  d = 3,
  e = 5,
  f = 6,
  g = 8,
  a = 10,
  b = 12, // % 12 === 0

  cb = 12, // % 12 === 0
  db = 2,
  eb = 4,
  fb = 5,
  gb = 7,
  ab = 9,
  bb = 11,
  
  cu = 2,
  du = 4,
  eu = 6,
  fu = 7,
  gu = 9,
  au = 11,
  bu = 1
}

