import React, { CSSProperties, FC, ReactNode } from 'react'
import { PlainOption } from '../type'

export interface IFieldLayoutProps {
  options: PlainOption<ReactNode, ReactNode>[]
  nameAlign?: CSSProperties['verticalAlign']
}
export const FieldLayout: FC<IFieldLayoutProps> = ({
  options,
  nameAlign = 'middle',
}) => {
  
  return (
    <table>
      <tbody>
        { options.map((opt, i) => (
          <tr key={i}>
            <td 
              style={{ verticalAlign: nameAlign }}
              className={`text-right`}
            >
              {opt.name}: 
            </td>
            <td>{opt.value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}