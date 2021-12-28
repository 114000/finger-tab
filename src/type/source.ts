import { VoltaType } from 'vexflow'
import { WideType } from './basic'

export enum SourceNodeType {
  stave = 0,
  note = 1

}

export enum SourceVoltaType {

}

export enum SourceStaveType {
  normal = 1,
  end = 2,
  repeatStart = 11,
  repeatFinal = 12,
  repeatBoth = 13
}

export interface Source {
  t: SourceNodeType
}

export type SourceNode = SourceStave | SourceNote

// export type SourceNode<T = SourceNodeType.note | SourceNodeType.stave> = 
//   T extends SourceNodeType.note 
//   ? SourceNote
//   : T extends SourceNodeType.stave 
//     ? SourceStave
//     : SourceNote | SourceStave

export interface SourceStave extends Source {
  split: SourceStaveType,
  volta?: VoltaType,
  voltaT?: string
}

export interface SourceNote extends Source {
  k: string[],
  w: WideType
}