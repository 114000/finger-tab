import { useCallback, useEffect, useRef, useState } from 'react'
import { PlainObject } from '@coloration/kit'

/**
 * 
 * @param initialStore default value of the store
 * @param strict if true, can't update value which the key is out of initialStore. default is `false`
 * @returns `useStore` is the hook function for managing store content
 */
 export function createStore<T extends PlainObject> (initialStore?: Partial<T>, strict: boolean = false) {

  const store: T = Object.create(null)
  Object.assign(store, initialStore)
  const listeners: Function[] = []

  function broadcast () {
    listeners.forEach(fn => fn())
  }

  /**
   * @param mapper: the return of `mapper(store)` is the condition used to 
   *                determine whether to trgger when the `store` is updated.
   *                if it's `undefined`. you can use `updateStore` function. 
   *                And your function does not need to listen the store.
   */
  return function useStore<K = undefined> (mapper?: (store: T) => K) {

    const merge = useCallback((s: T) : K => mapper ? Object.assign(Object.create(null), mapper(s)) : undefined, [])

    const mapped: K = merge(store)

    const cachedMappedStore = useRef(mapped)
    const [mappedStore, trigger] = useState<K>(mapped)

    const updateStore = useCallback((payload: Partial<T>) => {
      
      let changed = false
      for (let key in payload) {
        if (!strict || key in store) {
          if (store[key] !== payload[key]) {
            changed = true
            store[key] = payload[key] as T[Extract<keyof T, string>]
          }
        }
        else {
          throw new Error(`Can\'t find field [${key}] in store`)
        }
      }
    
      // 触发更新
      changed && broadcast()
    }, [])

    useEffect(() => {

      if (!mapper) return

      const listen = () => {
        const updatedMappedStore = merge(store) as K
        const cache: K = cachedMappedStore.current 

        for (let key in cache) {

          if (Object.is(cache[key], updatedMappedStore[key])) continue
          
          trigger(updatedMappedStore)
          cachedMappedStore.current = updatedMappedStore

          break
        }
      }
      
      listeners.push(listen)
      
      return () => {
        const listenOrder = listeners.indexOf(listen)
        listenOrder >= 0 && listeners.splice(listenOrder, 1)
      }
    }, [])

    return [mappedStore, updateStore] as [K, typeof updateStore]
  }
}