import React from 'react'
import { UserButton } from '@clerk/nextjs'

const DashboardHeader = () => {
  return (
    <div className='p-5 flex items-center justify-between border-b shadow-sm'>
        <div></div>
        <div>
            <UserButton afterSignOutUrl='/'/>
        </div>
    </div>
  )
}

export default DashboardHeader