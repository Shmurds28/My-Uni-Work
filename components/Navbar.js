import React from 'react'
import Image from 'next/image';
import logo from '../../2.png';
import Link from 'next/link';
import {MenuIcon} from '@heroicons/react/solid';

function Navbar() {
  return (
    <div className="mt-2 px-4 flex items-center justify-between h-20 border-b border-gray-100">
        <div className="cursor-pointer">
            <Link href="/">
                <Image src={logo} height={70} width={200} className="object-fit"/>
            </Link>
            
        </div>

        <div className="menu-icon">
            <MenuIcon className="w-10 h-10 text-[#000] font-semibold text-lg hover:text-[#F9B42A]"/>
        </div>

        <div className=" flex space-x-5 middle-nav">
            <Link href="/modules" className="navLink">
                <a className="navLink">
                    Modules
                </a>
            </Link>
            <Link href="/about">
                <a className="navLink cursor-pointer">
                    About Us
                </a>

            </Link>
            <Link href="/help" className="navLink">
                <a className="navLink">
                    Help
                </a>
            </Link>

            
        </div>
        <div className="flex space-x-5 end-nav">
            <Link href="/dashboard/schedule">
                <a className="navLink">
                    Dashboard
                </a>

            </Link>
            <Link href="/login" className="navLink">
                <a className="navLink">
                    Login
                </a>
            </Link>
        </div>
    </div>
  )
}

export default Navbar
