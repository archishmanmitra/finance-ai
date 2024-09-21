'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useUser, UserButton } from '@clerk/nextjs'

export default function Header() {
    const { user , isSignedIn } = useUser();
  return (
    <div className='p-5 flex items-center justify-between border-b shadow-md'>
      <div >
        <Link href='/' className='flex items-center gap-3'>
            <Image src='/logo.svg' alt='logo' height={35} width={35} className='bg-gray-50 rounded-full p-1'/>
            <span className='font-bold text-xl text-primary'>Finance AI</span>
        </Link>
      </div>
      
        {isSignedIn? (<div className='flex gap-4 items-center'>
                <Link href='/dashboard'>
                    <Button variant='outline' className='rounded-full'>
                        Dashboard
                    </Button>
                </Link>
                <UserButton/>
            </div>
          )
          :
            (<div className='flex gap-4 items-center'>
                <Link href='/sign-in'>
                    <Button variant='outline' className='rounded-full'>
                        Dashboard
                    </Button>
                </Link>
                <Link href='/sign-in'>
                    <Button className='rounded-full flex gap-1'>
                        Get Started
                    </Button>     
                </Link>
            </div>)}

    </div>
    
  )
}
