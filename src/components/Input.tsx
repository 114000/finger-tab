import React, { FC, InputHTMLAttributes } from 'react'
import { useClassName } from '~/hooks'

interface InputHTMLProps<T = any> extends InputHTMLAttributes<T> {
  label?: string,
  labelClassName?: string
}

export const Input: FC<InputHTMLProps> = ({
  label,
  labelClassName,
  id,
  className,
  ...rest
}) => {

  const baseLabelClass = 'block text-sm font-medium mb-1'
  const [newLabelClass] = useClassName(baseLabelClass, [labelClassName || ''])
  
  const baseInputClass = `
    text-sm text-gray-800 
    bg-white border w-full leading-5 py-2 px-3 border-gray-200 
    hover:border-gray-300 focus:border-indigo-300 shadow-sm placeholder-gray-400
    focus:rounded-0
    on-outline
  `
  const [newInputClass] = useClassName(baseInputClass, [className || ''])

  return (
    <>
      { label && <label className={newLabelClass} htmlFor={id}>{ label }</label> }
      <input  id={id} className={newInputClass} {...rest} />
    </>
  )
}