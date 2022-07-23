import React from 'react'
import Assessment from './Assessment'

function Week() {
  return (
    <div className="border border-gray-700 p-0 bg-[#F9FAFB] rounded-md">
        <h1 className="w-full text-center bg-[#103A5C] text-white text-2xl font-semibold ">
            Week 1
        </h1>

        <div className="bg-white p-1 m-1 flex flex-col gap-2">
            <Assessment />
            <Assessment />
            <Assessment />
        </div>
        
    </div>
  )
}

export default Week
