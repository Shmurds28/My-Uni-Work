import { doc, onSnapshot, query } from 'firebase/firestore';
import Link from 'next/link'
import React, { useEffect } from 'react'
import { useUserAuth } from '../context/UserAuthContext';
import { db } from '../firebase';

function DashboardSidebar({lecturers, schedule, recommendations, modules}) {
    const {user, userInfo, setUserInfo} = useUserAuth();

useEffect(
    () => 
    onSnapshot(
        query(doc(db, "users", user.uid)),
        (userSnapshot) => {
        const userModules = userSnapshot.data().modules;
        setUserInfo(userSnapshot.data());    
        }
    ),
    [db]
)


  return (
    <div className="bg-[#F9FAFB] lg:p-3 p-1 lg:w-72 flex lg:flex-col mr-0 lg:h-full">

            {!userInfo?.isAdmin && (
                 <Link href="/dashboard/schedule" >
                    <a className={`${schedule && "bg-white"} lg:text-lg text-md m-0 p-2 rounded-sm lg:font-semibold font-semibold`}>
                        Workload schedule
                    </a>
                </Link>
            )}  
            {!userInfo?.isAdmin && (
                <Link href="/dashboard/modules" >
                    <a className={`${modules && "bg-white"} lg:text-lg text-md m-0 p-2 rounded-sm lg:font-semibold font-semibold`}>
                        Selected Modules
                    </a>
                </Link>
            )}

            {userInfo?.isAdmin && (
                 <Link href="/dashboard/modules" >
                 <a className={`${modules && "bg-white"} lg:text-lg text-md m-0 p-2 rounded-sm lg:font-semibold font-semibold`}>
                     Offered Modules
                 </a>
             </Link>
            )}

            {!userInfo?.isAdmin && (
                <Link href="/dashboard/recommendations" >
                    <a className={`${recommendations && "bg-white"} lg:text-lg text-md m-0 p-2 rounded-sm lg:font-semibold font-semibold`}>
                        Recommendations
                    </a>
                </Link>
            )}

            <Link href="/dashboard/lecturers" >
                  <a className={`${lecturers && "bg-white"} lg:text-lg text-md m-0 p-2 rounded-sm lg:font-semibold font-semibold`}>
                      Lecturers
                  </a>
            </Link>

            
        </div>
  )
}

export default DashboardSidebar
