import React, { FC, useCallback, useState } from 'react'
import { InfoEditor } from './InfoEditor'
import './index.css'
import { InfoBlock } from './InfoBlock'
import { StaveEditor } from './StaveEditor'
import { StaveList } from './StaveList'

export interface IEditorProps { }
export const Editor: FC<IEditorProps> = (

) => {
  const [expandKeys, setExpandKeys] = useState<string[]>([])
  const isExpand = useCallback((key: string) => {
    return expandKeys.includes(key)
  }, [expandKeys])

  const toggleExpandKey = useCallback((key: string) => {
    const idx = expandKeys.indexOf(key)
    const keys = expandKeys.slice()
    if (idx < 0) keys.push(key)
    else keys.splice(idx, 1)
    setExpandKeys(keys)
  }, [expandKeys])

  return (
    <>
      <InfoBlock />


      <StaveList />

      <div className="editor-collaspe">
        <div>
          <div className="editor-collaspe-header" onClick={() => toggleExpandKey('info')}>
            <p><b>B</b>ase Infomation</p>
          </div>
          {isExpand('info') && <div className="editor-collaspe-content">
            <InfoEditor />
          </div>}
        </div>
        <div>
          <div className="editor-collaspe-header" onClick={() => toggleExpandKey('editor')}>
            <p><b>E</b>ditor</p>
          </div>
          {isExpand('editor') && <div className="editor-collaspe-content">
            <StaveEditor />
          </div>}
        </div>
      </div>
    </>
  )
}