import React from 'react'
import { useRecoilState } from 'recoil';
import { addAssessment, modalState } from '../atoms/modalAtom';
import MyModal from './Modal';

function Module({dashboardPage, module}) {
    const [isOpen, setIsOpen] = useRecoilState(modalState);
    const [isAddAssessment, setIsAddAssessment] = useRecoilState(addAssessment);

  return (
    <div className="border p-3 bg-[#F9FAFB] cursor-pointer">
        <h1 className="text-[#333] font-semibold text-lg mb-3">
            {module.moduleCode} - {module.moduleName}
        </h1>
        <p className="mb-1">
            <span className="text-[#333] font-semibold text-base mr-2">
                Lecturer: 
            </span>
            {module.lecturer}
        </p>

        <p className="mb-1">
            <span className="text-[#333] font-semibold text-base mr-2">
                Offered In: 
            </span>
            {module.semester}
        </p>

        <p className="mb-1">
            <span className="text-[#333] font-semibold text-base mr-2">
                Prerequisites: 
            </span>
            {module.prerequisites}
        </p>

        <p className="mb-1">
            <span className="text-[#333] font-semibold text-base mr-2">
                Credit value: 
            </span>
            {module.credits}
        </p>

        <div className="mb-1">
            {(dashboardPage && !module.compulsory) &&(
                <button className="bg-red-400 mr-4 text-white font-semibold p-3 rounded-md hover:opacity-90">
                    Remove
                </button>
            )}

            {!dashboardPage &&(
                 <button className="bg-[#F9B42A] mr-4 text-white font-semibold p-3 rounded-md hover:opacity-90">
                    Add to schedule
                </button>
            )}

            {/* <button className="bg-[#103A5C] text-white font-semibold p-3 rounded-md hover:opacity-90
                    " onClick={(e) =>{
                    setIsOpen(true);
                    setIsAddAssessment(true);
                    }} >
                    Add assessment
            </button>  */}
           
            <button className="bg-[#F9B42A] hidden mr-4 text-white font-semibold p-3 rounded-md hover:opacity-90">
                Edit Module
            </button>
            <button className="bg-red-400 hidden mr-4 text-white font-semibold p-3 rounded-md hover:opacity-90">
                Delete
            </button>
        </div>

         {/* Modal */}
      {isOpen && <MyModal key={module.moduleCode} modCode={module.moduleCode}/>}
       
    </div>
  )
}

export default Module
