import React from 'react'
import styles from '../styles/Home.module.css'
import Image from 'next/image'
import Link from 'next/link';
import logo from '../../2.png';

function Footer() {
  return (
    <div className="mt-auto space-y-2 text-black bg-[#F9FAFB] flex flex-col items-center justify-center sticky z-50 bottom-0 border-t border-gray-200 py-2">
       {/* <div className="cursor-pointer">
            <Link href="/">
                <Image src={logo} height={70} width={200} className="object-fit"/>
            </Link>
            
        </div> */}
        <p className="font-semibold ">
            <Link href="mailto:myuniwork22@gmail.com">
                <a className="cursor-pointer">
                    myuniwork22@gmail.com
                </a>

            </Link>
            | 073 524 1223
        </p>
        <p className="text-[12px]">
           2022 MyUniWork. All rights reserved.  
        </p>
    </div>
  )
}

export default Footer
