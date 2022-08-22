import React from 'react'
import MenuIcon, { PlusCircleIcon } from '@heroicons/react/solid'

function Assessment({assessment, assessmentPage, isDashboard}) {
  return (
        <div className="flex flex-col gap-4 border p-1 bg-white cursor-pointer" >
            <div className="flex items-center justify-between">
                <h1 className="text-[#333] font-bold text-base mb-1">
                    {assessment.moduleName} - {assessment.type}
                </h1>
                {!isDashboard &&(
                    <div title="Add module to schedule.">
                        <PlusCircleIcon className="h-6 w-6 text-[#333]" />
                    </div>
                )}
                
            </div>

           
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
