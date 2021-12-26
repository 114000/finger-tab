import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react'
import { useBoolean, useInterval } from 'react-use'
import { RenderContext, Renderer } from 'vexflow'
type stringReturnFunc = (...args: any[]) => string
export function useClassName (baseClass: string | stringReturnFunc, dep: string[]) {
  const [newClassName, setClassName] = useState(baseClass)

  useEffect(() => {
    setClassName(dep.reduce((acc, current) => acc + ' ' + current, newClassName))
  }, dep)

  return [newClassName, setClassName] as [string, React.Dispatch<React.SetStateAction<string>>]
}

export const useRenderer = function (size: [number, number]) {
  const domRef = useRef<any>()
  const rendererRef = useRef<Renderer>()
  const [context, setContext] = useState<{
    rendererContext: RenderContext | null,
  }>({
    rendererContext: null
  })

  useEffect(() => {
    if (!domRef.current) return
    if (!rendererRef.current) {
      const renderer = new Renderer(domRef.current, Renderer.Backends.CANVAS)
      renderer.resize(size[0], size[1])
      rendererRef.current = renderer
      const rendererContext = renderer.getContext()
      setContext({
        rendererContext,
      })
    }
  }, [domRef.current])

  const domMemo = useMemo(() => {
    return <canvas ref={domRef}></canvas>
  }, [])

  return [domMemo, context] as [typeof domMemo, typeof context]
}


export function useMetronome (
  initialize: { bpm: number, beat: number },
  fn?: (beat: number, isBeat: boolean, count: number,) => void, 
) {

  const [count, setCount] = useState(0)
  const [opt, setOpt] = useState(initialize)
  const [isBeat, setIsBeat] = useState(false)
  const [isRunning, toggleIsRunning] = useBoolean(false)
  
  const calcBeat = useCallback((count, beat, isRunning) => {
    return isRunning
      ? count % beat === 0
        ? beat
        : count % beat
      : 0
  }, [])

  const tick = useCallback(() => {
    const newCount = count + 1
    setCount(newCount)
    const beatStatus = newCount % opt.beat === 1
    setIsBeat(beatStatus)
    fn && fn(
      calcBeat(newCount, opt.beat, isRunning),
      beatStatus, 
      count
    )
    
  }, [count, opt])


  useInterval(tick, isRunning ? 60 / opt.bpm * 1000 : null)

  const toggle = useCallback((options?: { bpm: number, beat: number }) => {
    setCount(0)
    setIsBeat(false)

    if (!isRunning) {
      if (options) {
        setOpt(options)
      }
      tick()
    }
    toggleIsRunning()
  }, [isRunning, tick])

  const result = {
    beatCount: calcBeat(count, opt.beat, isRunning), 
    isBeat, 
    count, 
    isRunning,
  }
  return [result, toggle] as [typeof result, typeof toggle]
} 