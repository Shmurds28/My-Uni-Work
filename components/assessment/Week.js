import React from 'react'
import Assessment from './Assessment'
import { useUserAuth } from '../../context/UserAuthContext';

function Week({week, assessments, isDashboard, modulePage, viewModulePage, moduleId}) {
  const {user, userInfo, setUserInfo} = useUserAuth();

  return (
    <div className="flex border border-gray-700 p-0 bg-[#F9FAFB] rounded-md shadow w-full">
        <h1 className="w-40 p-4 text-center bg-[#103A5C] text-white text-2xl font-semibold ">
            Week {week}
        </h1>

        <div className={`grid ${userInfo?.isAdmin ? "grid-cols-1" : "grid-cols-3"}  p-1 m-1 gap-2 w-full`}>

            {/* <p className="ml-10 font-base text-md">No submissions...</p> */}
            {assessments.map(assessment => (
              <Assessment moduleId={moduleId} viewModulePage={viewModulePage} assessment={assessment} isDashboard={isDashboard} modulePage/>
            ))}

          
        </div>
        
    </div>
  )
}

export default Week
