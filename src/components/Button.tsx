import React, { ButtonHTMLAttributes, FC } from 'react'
import { useClassName } from '~/hooks'

export interface IButtonProps extends ButtonHTMLAttributes<any> {
  block?: boolean
}

export const Button : FC<IButtonProps> = ({
  className = 'bg-indigo-500 text-white',
  block = false,
  ...rest
}) => {

  const baseClass = 'px-4 py-2 no-outline'
  const [newClassName] = useClassName(baseClass, [
    className, 
    block ? 'w-full block' : 'w-auto'
  ])
  

  return (
    <button className={newClassName} {...rest}>
    </button>
  )
}