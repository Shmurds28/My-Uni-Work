import React from 'react'

function Module({dashboardPage}) {
  return (
    <div className="border p-3 bg-[#F9FAFB] cursor-pointer">
        <h1 className="text-[#333] font-semibold text-lg mb-3">
            WEUV401 - Usability Engineering
        </h1>
        <p className="mb-1">
            <span className="text-[#333] font-semibold text-base mr-2">
                Lecturer: 
            </span>
            Prof JL Wesson
        </p>

        <p className="mb-1">
            <span className="text-[#333] font-semibold text-base mr-2">
                Offered In: 
            </span>
            Semester 1
        </p>

        <p className="mb-1">
            <span className="text-[#333] font-semibold text-base mr-2">
                Prerequisites: 
            </span>
            None
        </p>

        <p className="mb-1">
            <span className="text-[#333] font-semibold text-base mr-2">
                Credit value: 
            </span>
            11
        </p>

        <div className="mb-1">
            {dashboardPage &&(
                <button className="bg-red-400 mr-4 text-white font-semibold p-3 rounded-md hover:opacity-90">
                    Remove
                </button>
            )}

            {!dashboardPage &&(
                 <button className="bg-[#F9B42A] mr-4 text-white font-semibold p-3 rounded-md hover:opacity-90">
                    Add to schedule
                </button>
            )}
           
            <button className="bg-[#F9B42A] hidden mr-4 text-white font-semibold p-3 rounded-md hover:opacity-90">
                Edit Module
            </button>
            <button className="bg-red-400 hidden mr-4 text-white font-semibold p-3 rounded-md hover:opacity-90">
                Delete
            </button>
        </div>
       
    </div>
  )
}

export default Module
