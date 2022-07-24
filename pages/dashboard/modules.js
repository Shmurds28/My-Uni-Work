import Head from 'next/head'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer';
import Link from 'next/link';
import Module from '../../components/Module';
import { addAssessment, addModule, modalState } from '../../atoms/modalAtom';
import { useRecoilState } from 'recoil';
import MyModal from '../../components/Modal';
import { collection, doc, getDoc, onSnapshot, query } from 'firebase/firestore';
import { db } from '../../firebase';
import { useEffect, useState } from 'react';
import { useUserAuth } from '../../context/UserAuthContext';
import DashboardSidebar from '../../components/DashboardSidebar';


export default function modules() {
  const [isOpen, setIsOpen] = useRecoilState(modalState);
  const [isAddModule, setIsAddModule] = useRecoilState(addModule);
  const [isAddAssessment, setIsAddAssessment] = useRecoilState(addAssessment);
  const [modules, setModules] = useState([]);
  const {user} = useUserAuth();
  // var modules = [];

  // get modules form firebase
  useEffect(
    () => 
    onSnapshot(
      query(doc(db, "users", user.uid)),
      (userSnapshot) => {
        const userModules = userSnapshot.data().modules;
        const mods = [];
        userModules.forEach(userModule => {
          getDoc(doc(db, 'modules', userModule)).then(moduleDoc => {
              setModules(modules => [...modules, moduleDoc.data()]);
          });

        });

      }
    ),
    [db]
  )

  return (
    <div className="h-full">
      <Head>
        <title>My Uni Work</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />
        <div className="lg:flex space-x-0 h-full">
            {/* sidebar area  */}
            <DashboardSidebar  modules/>

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
              
              {/* <h1>{modules.length}</h1> */}

              {modules.map(module =>(
                <Module dashboardPage key={module.moduleCode} module={module} />
              ))}
            </div>
            
        </div>
        
      {/* Modal */}
      {isOpen && <MyModal/>}

      {/* <Footer /> */}
    </div>
  )
}