import Link from 'next/link'
import React from 'react'

function DashboardSidebar({lecturers, schedule, recommendations, modules}) {
  return (
    <div className="bg-[#F9FAFB] lg:p-3 p-1 lg:w-72 flex lg:flex-col mr-0 lg:h-full">
            <Link href="/dashboard/schedule" >
                  <a className={`${schedule && "bg-white"} lg:text-lg text-md m-0 p-2 rounded-sm lg:font-semibold font-semibold`}>
                      Workload schedule
                  </a>
            </Link>

            <Link href="/dashboard/modules" >
                  <a className={`${modules && "bg-white"} lg:text-lg text-md m-0 p-2 rounded-sm lg:font-semibold font-semibold`}>
                      Selected Modules
                  </a>
            </Link>

            <Link href="/dashboard/lecturers" >
                  <a className={`${lecturers && "bg-white"} lg:text-lg text-md m-0 p-2 rounded-sm lg:font-semibold font-semibold`}>
                      Lecturers
                  </a>
            </Link>

            <Link href="/dashboard/recommendations" >
                  <a className={`${recommendations && "bg-white"} lg:text-lg text-md m-0 p-2 rounded-sm lg:font-semibold font-semibold`}>
                      Recommendations
                  </a>
            </Link>
        </div>
  )
}

export default DashboardSidebar
