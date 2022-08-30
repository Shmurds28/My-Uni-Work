import React from 'react'
import styles from '../styles/Home.module.css'
import Image from 'next/image'
import Link from 'next/link';
import logo from '../public/fav.png'

function Footer() {
  return (
    <div className=" py-10 bg-gray-100 text-center space-y-2 text-black flex flex-col items-center justify-center z-50 bottom-0 border-t border-gray-200">
       <div className="w-11/12 lg:w-10/12 xl:w-1024 m-auto">
            <div className="cursor-pointer w-18 m-auto">
                <Link href="/">
                    <Image src={logo} height={100} width={100} className="object-fit"/>
                </Link>
                <div className="text-3xl font-bold mt-2">MyUniWork</div>
            </div>
            <p className="mt-4 md:mt-8 text-gray-600 text-xs">
                2022 MyUniWork. All rights reserved.  
            </p>
       </div>

    </div>
  )
}

export default Footer
