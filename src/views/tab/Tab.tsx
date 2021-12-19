import React, { FC, useEffect, useState } from 'react'
import { useParams } from 'react-router'
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
      <h1>{ staff?.name }</h1>
      { staff && <TabRenderer url={staff.url} /> }
    </div>
  )
}