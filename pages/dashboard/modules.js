import Head from 'next/head'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer';
import Link from 'next/link';
import Module from '../../components/module/Module';
import { addAssessment, addModule, modalState } from '../../atoms/modalAtom';
import { useRecoilState } from 'recoil';
import MyModal from '../../components/Modal';
import { collection, doc, getDoc, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '../../firebase';
import { useEffect, useState } from 'react';
import { useUserAuth } from '../../context/UserAuthContext';
import DashboardSidebar from '../../components/DashboardSidebar';


export default function modules() {
  const [isOpen, setIsOpen] = useRecoilState(modalState);
  const [isAddModule, setIsAddModule] = useRecoilState(addModule);
  const [isAddAssessment, setIsAddAssessment] = useRecoilState(addAssessment);
  const [modules, setModules] = useState([]);
  const {user, userInfo, setUser, setUserInfo} = useUserAuth();
  const [sortValue, setSortValue] = useState(null);
  const [sort, setSort] = useState(false);
  const [sortData, setSortData] = useState([]);

  // get modules form firebase  

  useEffect(
    () => 
    onSnapshot(
      query(doc(db, "users", user.uid)),
      (userSnapshot) => {
        const userModules = userSnapshot.data().modules;
        setUserInfo(userSnapshot.data());
        if(userSnapshot.data().isAdmin){
          onSnapshot(
            query(collection(db, 'modules')),
            (snapshot) => {
              setModules(snapshot.docs);
            }
          )
        }else{
          userModules.forEach(userModule => {
            getDoc(doc(db, 'modules', userModule)).then(moduleDoc => {
                setModules(modules => [...modules, moduleDoc]);
            });
  
          });
        }

      }
    ),
    [db]
  );

  const handleSort = (e) => {
    if(e.target.value == "") {setSort(false); return};
    setSort(true);
    setSortValue(e.target.value);  
    onSnapshot(
        query(collection(db, 'modules'), orderBy(e.target.value)),
        (snapshot) => {
          setSortData(snapshot.docs);
        }
      )
  };

  return (
    <div className="lg:h-full">
      <Head>
        <title>My Uni Work</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />
      <div className="lg:flex space-x-0 h-full">
          {/* sidebar area  */}
          <div>
          <DashboardSidebar modules />
          </div>
          

          {/* content area */}
          <div className="flex flex-col lg:px-10 mt-4 space-y-2 mb-6 w-full">
              <div className="lg:flex m-2 items-center justify-between">
                <p className="text-lg lg:text-2xl m-2 font-semibold text-[#333]">
                    {userInfo?.isAdmin ? "Modules Offered" : "Selected Modules  "}
                       
                </p>

                {userInfo?.isAdmin && (
                  <label className="">
                  <span className=" block text-sm font-semibold text-slate-700 m-0">
                    Sort by
                  </span>
                  <select value={sortValue} onChange= {(e) => handleSort(e)} name="semester" id="semester" className=" rounded-md mt-1 px-3 py-2 bg-white border w-full shadow-sm border-slate-300">
                    <option value="">Select</option>
                    <option value="moduleName">Module name</option>
                    <option value="moduleCode">Module code</option>
                    <option value="semester">Semester</option>
                    <option value="credits">Credit value</option>
                    {/* <option value="Year">Year</option> */}
                  </select>
                    </label>
                )}

                
                 {userInfo?.isAdmin && (
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
                 )}
              </div>
              
              {/* <h1>{modules.length}</h1> */}
              {(sort && userInfo?.isAdmin) && (
                  sortData.map(module =>(
                    <Module dashboardPage key={module.data().moduleCode} module={module.data()} />
                  ))

              )}

              {(!sort || !userInfo.isAdmin) && (
                 modules.map(module =>(
                  <Module dashboardPage key={module.data().moduleCode} module={module.data()} />
                ))
              )}

             
            </div>
            
        </div>
        
      {/* Modal */}
      {isOpen && <MyModal/>}

      <Footer />
    </div>
  )
}
