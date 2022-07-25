import React from 'react'

function Assessment({assessment}) {
  return (
        <div className=" border p-1 bg-white cursor-pointer">
            <h1 className="text-[#333] font-semibold text-base mb-1">
                {assessment.moduleName} - {assessment.type}
            </h1>
            <p className="mb-1">
                <span className="text-[#333] font-semibold text-sm mr-2">
                    Weighting: 
                </span>
                  {assessment.weighting}%
            </p>    

        </div>
  )
}

export default Assessment
