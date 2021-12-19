import React, { FC, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { fetchStaffs, Staff } from '../../data'

export interface IListProps {}
export const List: FC<IListProps> = ({
}) => {
  const [staffList, setStaffList] = useState<Staff[]>([])

  useEffect(() => {
    fetchStaffs().then(res => setStaffList(res))
  }, [])

  return (
    <div className="p-8">
      
      <h4 className="text-purple-500 mb-6 font-semibold text-2xl">Standard tuning</h4>
      <ul>
        { staffList.map(sf => (
          <li key={sf.id} className="hover:bg-purple-400 p-2 group">
            <Link 
              className="text-xl no-underline block text-gray-700 group-hover:text-white"
              to={`/tab/${sf.id}`}>
              {sf.name} - {sf.author}
            </Link>
          </li>
        ))}
        <li></li>
      </ul>
    </div>
  )
}