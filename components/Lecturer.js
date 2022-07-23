import React from 'react'
import img from '../public/reading.png';
import Image from "next/image";

function Lecturer() {
  return (
    <div className="flex flex-col lg:flex-row gap-4 p-4 bg-[#F9FAFB] cursor-pointer">
        <Image src={img} width={90} height={90} className="lg:rounded-full rounded-md"/>
        <div>
            <h1 className="text-lg font-bold text-[#333]">
                Prof JL Wesson
            </h1>
            <p className="text-base font-medium"> <strong>Email: </strong> janet.wesson@mandela.ac.za </p>
            <p className="text-base font-medium"> <strong>Tel: </strong> 041-504-5599 </p>
            <p className="text-base font-medium"> <strong>Room: </strong> janet.wesson@mandela.ac.za </p>
        </div>
        
    </div>
  )
}

export default Lecturer
