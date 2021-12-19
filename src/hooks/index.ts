import { useState, useEffect } from 'react'
type stringReturnFunc = (...args: any[]) => string
export function useClassName (baseClass: string | stringReturnFunc, dep: string[]) {
  const [newClassName, setClassName] = useState(baseClass)

  useEffect(() => {
    setClassName(dep.reduce((acc, current) => acc + ' ' + current, newClassName))
  }, dep)

  return [newClassName, setClassName] as [string, React.Dispatch<React.SetStateAction<string>>]
}