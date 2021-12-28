import { SourceNote, SourceStave } from './source'



export interface LayoutStave extends SourceStave {
  wide: number,
  row: number,
  col: number,
  notes: LayoutNote[],
  width: number
  left: number
}

export interface LayoutNote extends SourceNote {
  wide: number,

}