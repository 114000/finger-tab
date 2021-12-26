import { SourceNote, SourceStave } from ".";



export interface LayoutStave extends SourceStave {
  widthSize: number,
  notes: LayoutNote[]
}

export interface LayoutNote extends SourceNote {
  widthSize: number,

}