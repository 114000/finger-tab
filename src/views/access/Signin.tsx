import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import { Button, Input } from '~/components'

export const Signin: FC<{}> = () => {
  return (
    <div className="absolute w-full h-full flex items-center justify-center">
      <div className=" max-w-80 w-full pb-30">
        <h2 className="text-center text-2xl font-semibold py-4">Welcome Admin</h2>

        <Input id="username" label="Username" className="mb-4" />
        <Input id="password" label="Password" className="mb-8" />
        
        <Link to="/" className="w-full">
          <Button>Sign In</Button>
        </Link>
      </div>
    </div>
  )
}