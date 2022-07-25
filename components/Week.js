import React from 'react'
import Assessment from './Assessment'

function Week({week, assessments}) {

  return (
    <div className="border border-gray-700 p-0 bg-[#F9FAFB] rounded-md shadow">
        <h1 className="w-full text-center bg-[#103A5C] text-white text-2xl font-semibold ">
            Week {week}
        </h1>

        <div className="bg-white p-1 m-1 flex flex-col gap-2">

            {/* <p className="ml-10 font-base text-md">No submissions...</p> */}
            {assessments.map(assessment => (
              <Assessment assessment={assessment}/>
            ))}

          
        </div>
        
    </div>
  )
}

export default Week
