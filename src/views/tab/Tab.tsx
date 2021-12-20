import React, { FC, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { TabRenderer } from '~/components'
import { fetchStaff, Staff } from '~/data'
export const Tab: FC<{}> = () => {

  const params = useParams<{ id: string }>()
  const [staff, setStaff] = useState<Staff>()

  useEffect(() => {
    fetchStaff(params.id)
    .then(res => setStaff(res))
  }, [params.id])

  return (
    <div className="flex-1 flex flex-col">
      <div className="max-w-7xl w-full mx-auto">
        <h1 className="text-xl font-semibold">{ staff?.name }</h1>
        <p>{ staff?.author }</p>
      </div>
      { staff && <TabRenderer url={staff.url} /> }
    </div>
  )
}