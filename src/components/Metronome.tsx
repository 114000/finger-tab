import { Icon } from '@iconify/react'
import React, { FC, useState } from 'react'
import { useMetronome } from '~/hooks'

export interface IMetronomeProps { }
export const Metronome: FC<IMetronomeProps> = ({

}) => {

  const [bpm, setBpm] = useState(60)
  const [beat, setBeat] = useState(4)
  const [{ beatCount, isBeat, count, isRunning }, toggle] = useMetronome({ bpm: 60, beat: 4 })

  return (
    <div>
      <div className="flex gap-2 items-center">
        <input
          value={bpm}
          className="rounded text-center w-12 px-2 border-1 border-solid border-gray-200"
          onChange={e => setBpm(Number(e.target.value.replace(/\D/g, '')))} />
        <span className="text-gray-500">bpm /</span>
        <input
          value={beat}
          className="rounded-sm rounded text-center w-8 border-1 border-solid border-gray-200"
          onChange={e => setBeat(Number(e.target.value.replace(/\D/g, '')))} />
        <div className="text-base w-4 h-4 leading-0 cursor-pointer" onClick={() => toggle({ bpm, beat })}>
          {isRunning ? <Icon icon="el:pause-alt" /> : <Icon icon="el:play-alt" />}
        </div>
        {Array.from({ length: beat }).map((_, i) => (
          <div className={
            `w-4 h-4 rounded-full 
            ${i === beatCount - 1 ? isBeat ? 'bg-red-500' : 'bg-gray-600' : 'bg-gray-400'}
           `
          } />
        ))}
      </div>

    </div>
  )
}
