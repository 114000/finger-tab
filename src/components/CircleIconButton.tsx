import React, { ButtonHTMLAttributes, FC } from 'react'
import { Icon, IconifyIcon } from '@iconify/react'
import { useClassName } from '~/hooks'


interface CircleIconButtonProps<T = any> extends ButtonHTMLAttributes<T> {
  icon: string | IconifyIcon,
  iconClassName?: string,
  className?: string
}

export const CircleIconButton: FC<CircleIconButtonProps> = ({
  icon,
  iconClassName,
  className,
  ...rest
}) => {

  const baseIconClass = 'w-4 h-4 text-gray-500'
  const [newIconClass] = useClassName(baseIconClass, [iconClassName || ''])

  const baseClass = `w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 transition duration-150 rounded-full ml-3`
  const [newClass] = useClassName(baseClass, [className || ''])
  
  return (
    <button
      className={newClass}
      {...rest}
    >
      <Icon className={newIconClass} icon={icon} />
    </button> 
  )
}