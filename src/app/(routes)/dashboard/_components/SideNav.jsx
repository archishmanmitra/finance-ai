"use client";
import React from 'react'
import { useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
    LayoutGrid,
    PiggyBank,
    ReceiptText,
    ShieldCheck,
    CircleDollarSign,
    TrendingUp,
    TrendingDownIcon
} from 'lucide-react' 
import { UserButton } from "@clerk/nextjs";

const SideNav = () => {
    const menu = [
        {
            id:1,
            name: 'Dashboard',
            icon: LayoutGrid,
            path: '/dashboard'
        },
        {
            id:2,
            name: 'Incomes',
            icon: CircleDollarSign,
            path: '/dashboard/incomes'
        },
        {
            id:3,
            name: 'Budgets',
            icon: PiggyBank,
            path: '/dashboard/budgets'
        },
        {
            id:4,
            name: 'Expenses',
            icon: ReceiptText,
            path: '/dashboard/expenses'
        },
        {
            id:5,
            name: 'Upgrade',
            icon: ShieldCheck,
            path: '/dashboard/upgrade'
        }
    ];
    const path = usePathname();

    useEffect(() => {
        console.log(path);
      }, [path]);

  return (
    <div className='h-screen p-5 border shadow-md'>
        <div >
            <Link href='/' className='flex items-center'>
                <Image src='/logo.svg' alt='logo' height={35} width={35} className='bg-gray-50 rounded-full p-1'/>
                <span className='font-bold text-xl text-primary'>Finance AI</span>
            </Link>
        </div>
        <div className='mt-5'>
            {menu.map((menu)=>(
                <Link href={menu.path} key={menu.id}>
                    <h2 className={`flex gap-2 text-gray-500 font-medium items-center mb-2 p-4 rounded-full hover:text-primary hover:bg-secondary ${path == menu.path && 'text-primary bg-secondary'} `}>
                        <menu.icon/>
                        {menu.name}
                    </h2>
                </Link>
            ))}
        </div>
        <div className="fixed bottom-10 p-5 flex gap-2 items-center">
            <UserButton />
            <span className='text-gray-900 font-semibold'>Profile</span>
        </div>
    </div>
  )
}

export default SideNav