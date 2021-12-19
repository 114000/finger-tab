import React, { ButtonHTMLAttributes, FC } from 'react'
import { useClassName } from '~/hooks'
export const Button : FC<ButtonHTMLAttributes<any>> = ({
  className = 'bg-indigo-500 text-white',
  ...rest
}) => {

  const baseClass = 'w-full px-4 py-2 no-outline'
  const [newClassName] = useClassName(baseClass, [className])
  

  return (
    <button className={newClassName} {...rest}>
    </button>
  )
}