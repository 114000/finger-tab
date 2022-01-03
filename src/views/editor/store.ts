import { createStore } from '~/hooks'
import { Composition, SourceNode } from '~/type'

export interface IEditorState extends Composition {
  editingStrave: SourceNode[]
  editingIndex: number,
  straves: SourceNode[]
}

export const useEditorStore = createStore<IEditorState>({
  // entity 
  title: 'Merry Christmas Mr. Lawrance',
  author: 'Kotaro Oshio',
  publishDate: '2006.09.29',
  album: 'Blue Sky',
  timeSignature: [4, 4],
  nodes: [],
  type: 'all',

  // editor
  editingStrave: [],
  editingIndex: -1,
  straves: [],
}, true)