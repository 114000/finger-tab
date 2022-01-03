import { SourceNode } from './source'

export interface Composition {
  title: string,
  author: string,
  publishDate: string,
  album: string,
  timeSignature: number[],
  nodes: SourceNode[],
  type: 'tab' | 'all'
}