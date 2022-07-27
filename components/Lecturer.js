import React from 'react'
import img from '../public/reading.png';
import Image from "next/image";
import defaultImage from '../public/default.png' 

function Lecturer({lecturer}) {
  return (
    <div className="flex flex-col lg:flex-row gap-4 p-6 bg-[#F9FAFB] cursor-pointer rounded-md shadow mb-4">
        <img src={lecturer?.image} className=" rounded-md max-h-[200px]"/>
        <div>
            <h1 className="text-lg font-bold text-[#333]">
                {lecturer.title} {lecturer.initials} {lecturer.surname}
            </h1>
            <p className="text-base font-medium"> <strong>Email: </strong> {lecturer.email}</p>
            <p className="text-base font-medium"> <strong>Phone: </strong> {lecturer.telephone} </p>
            <p className="text-base font-medium"> <strong>Office: </strong> {lecturer.office} </p>
        </div>
        
    </div>
  )
}

export default Lecturer
