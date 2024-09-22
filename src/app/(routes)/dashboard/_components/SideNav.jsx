"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
    LayoutGrid,
    PiggyBank,
    ReceiptText,
    ShieldCheck,
    CircleDollarSign,
    Menu,
    X,
} from 'lucide-react';
import { UserButton } from "@clerk/nextjs";

const SideNav = () => {
    const menu = [
        {
            id: 1,
            name: 'Dashboard',
            icon: LayoutGrid,
            path: '/dashboard',
        },
        {
            id: 2,
            name: 'Incomes',
            icon: CircleDollarSign,
            path: '/dashboard/incomes',
        },
        {
            id: 3,
            name: 'Budgets',
            icon: PiggyBank,
            path: '/dashboard/budgets',
        },
        {
            id: 4,
            name: 'Expenses',
            icon: ReceiptText,
            path: '/dashboard/expenses',
        },
        {
            id: 5,
            name: 'Upgrade',
            icon: ShieldCheck,
            path: '/dashboard/upgrades',
        },
    ];

    const path = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    const toggleNav = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <div className="p-4 md:hidden">
                {isOpen ? (
                    <></>
                ) : (
                    <Menu className="w-6 h-6 text-gray-900 cursor-pointer" onClick={toggleNav} />
                )}
            </div>
            <div className={`h-screen p-5 border shadow-md bg-white fixed top-0 left-0 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out md:translate-x-0 md:relative md:flex md:flex-col`}>
                <div className='flex justify-between items-center gap-2'>
                    <Link href='/' className='flex items-center'>
                        <Image src='/logo.svg' alt='logo' height={35} width={35} className='bg-gray-50 rounded-full p-1' />
                        <span className='font-bold text-xl text-primary ml-2'>Finance AI</span>
                    </Link>
                    <X className="w-6 h-6 text-gray-900 cursor-pointer md:hidden" onClick={toggleNav} />
                </div>
                <div className='mt-5'>
                    {menu.map((item) => (
                        <Link href={item.path} key={item.id} onClick={() => setIsOpen(false)}>
                            <h2 className={`flex gap-2 text-gray-500 font-medium items-center mb-2 p-4 rounded-full hover:text-primary hover:bg-secondary ${path === item.path && 'text-primary bg-secondary'}`}>
                                <item.icon />
                                {item.name}
                            </h2>
                        </Link>
                    ))}
                </div>
                <div className="fixed bottom-10 p-5 flex gap-2 items-center">
                    <UserButton />
                    <span className='text-gray-900 font-semibold'>Profile</span>
                </div>
            </div>
        </>
    );
};

export default SideNav;
