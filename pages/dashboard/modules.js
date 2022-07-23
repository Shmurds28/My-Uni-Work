import Head from 'next/head'
import Image from 'next/image'
import styles from '../../styles/Home.module.css'
import img from '../../../logosamples/1.JPG' 
import welcomeImg from "../../public/welcome.png";
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import MenuIcon from '@heroicons/react/solid'
import readingImg from '../../public/reading.png'
import { BookOpenIcon } from '@heroicons/react/solid';
import Link from 'next/link';
import Module from '../../components/Module';
import { addAssessment, addModule, modalState } from '../../atoms/modalAtom';
import { useRecoilState } from 'recoil';
import MyModal from '../../components/Modal';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { db } from '../../firebase';
import { useEffect, useState } from 'react';


export default function modules() {
  const [isOpen, setIsOpen] = useRecoilState(modalState);
  const [isAddModule, setIsAddModule] = useRecoilState(addModule);
  const [isAddAssessment, setIsAddAssessment] = useRecoilState(addAssessment);
  const [modules, setModules] = useState([]);

  useEffect(
    () => 
    onSnapshot(
      query(collection(db, 'modules')),
      (snapshot) => {
        setModules(snapshot.docs);
      }
    ),
    [db]
  );

  return (
    <div className="h-screen">
      <Head>
        <title>My Uni Work</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />
      <div className="lg:flex space-x-0">
          {/* sidebar area  */}
          <div className="bg-[#F9FAFB] lg:p-3 p-1 lg:w-72 flex lg:flex-col mr-0">
            <Link href="/dashboard/schedule">
                  <a className="lg:text-lg text-md p-2 rounded-sm lg:font-semibold font-semibold">
                      Workload schedule
                  </a>
            </Link>

            <Link href="/dashboard/modules" >
                  <a className="text-lg p-2 rounded-sm bg-white font-semibold">
                      Selected Modules
                  </a>
            </Link>

            <Link href="/dashboard/lecturers" >
                  <a className="text-lg p-2 rounded-sm font-semibold">
                      Lecturers
                  </a>
            </Link>

            <Link href="/dashboard/recommendations" >
                  <a className="text-lg p-2 rounded-smfont-semibold">
                      Recommendations
                  </a>
            </Link>
          </div>

          {/* content area */}

          <div className="flex flex-col lg:px-10 mt-4 space-y-2 mb-6 w-full">
            <div className="lg:flex m-2 items-center justify-between">
              <p className="text-lg lg:text-2xl m-2 font-semibold text-[#333]">
                  Selected Modules     
              </p>
                <div className="flex flex-col lg:flex-row lg:items-center justify-end gap-1">
                  <button className="bg-[#103A5C] text-white font-semibold p-3 rounded-md hover:opacity-90
                      " onClick={(e) =>{
                        setIsOpen(true);
                        setIsAddModule(true);
                      }} >
                      Add Module
                  </button> 
                  <button className="bg-[#103A5C] text-white font-semibold p-3 rounded-md hover:opacity-90
                      " onClick={(e) =>{
                        setIsOpen(true);
                        setIsAddAssessment(true);
                      }} >
                      Add assessment
                  </button> 
                  
                 </div>
            </div>
            
            {modules.map(module =>(
              <Module dashboardPage key={module.id} module={module.data()} />
            ))}
          </div>
          
      </div>
        
      {/* Modal */}
      {isOpen && <MyModal/>}

      {/* <Footer /> */}
    </div>
  )
}
