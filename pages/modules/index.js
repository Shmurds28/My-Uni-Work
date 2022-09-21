import Head from 'next/head'
import Image from 'next/image'
// import styles from '../../styles/Home.module.css'
import img from '../../../logosamples/1.JPG' 
import welcomeImg from "../../public/welcome.png";
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import MenuIcon, { ChatIcon, SearchIcon, PlusCircleIcon } from '@heroicons/react/solid'
import readingImg from '../../public/reading.png'
import { BookOpenIcon } from '@heroicons/react/solid';
import Module from '../../components/module/Module';
import Link from 'next/link';
import { modalState, addModule, isSnackBar, isError } from '../../atoms/modalAtom';
import {useRecoilState} from 'recoil';
import Modal from '../../components/Modal';
import { useEffect, useState } from 'react';
import { db, storage } from "../../firebase";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
  onSnapshot,
  query,
  where,
  orderBy,
  startAt,
  endAt,
} from "@firebase/firestore";
import { useUserAuth } from '../../context/UserAuthContext';
import algoliasearch from 'algoliasearch/lite';
import {InstantSearch, SearchBox, Hits} from 'react-instantsearch-dom';
import Hit from '../../components/module/Hit';

const searchClient = algoliasearch(
  'F1IS3BSDLF',
  '0d790405d16390b0a38d4657c7fb6b72'
);

export default function Modules() {
  const [isOpen, setIsOpen] = useRecoilState(modalState);
  const [isAddModule, setIsAddModule] = useRecoilState(addModule);
  const [modules, setModules] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const {user, userInfo, setUserInfo} = useUserAuth();
  const [isSnackBarOpen, setIsSnackBarOpen] = useRecoilState(isSnackBar);
  const [isAnError, setIsAnError] = useRecoilState(isError);

  useEffect(
    () => 
    {
        if(user){
            onSnapshot(
                query(doc(db, "users", user?.uid)),
                (userSnapshot) => {
                setUserInfo(userSnapshot.data());    
                }
            ),
            [db]
        }
    }
)
   // get modules form firebase
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

  const doSearch = async(e) => {
    // e.preventDefault();
    if(!searchInput) return;
    const ref = collection(db, "modules");

    const q = query(ref, orderBy('moduleCode'), startAt(searchInput), endAt(searchInput+'\uf8ff'));

    const querySnapshot = await getDocs(q);

    setModules(querySnapshot);


  }

  const handleClick = () => {
    setIsSnackBarOpen(true);
  };


  return (
      <InstantSearch searchClient={searchClient} indexName={"modules"}>
        <div className="h-screen">
      <Head>
        <title>My Uni Work | Modules</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />


      {/* Heading and filter options section */}
      <div className="mt-8 lg:px-24 px-2 flex flex-col lg:flex-row lg:items-center justify-between space-y-3">
          {/* Page heading */}
        <p className="text-lg lg:text-2xl font-semibold text-[#333]">
           Browse Honours Modules Offered.     
        </p>
        {/* Search modulese section */}
        
          <div className="max-w-sm ">

              <SearchBox className="search" translations={{placeholder: 'Search module'}}/>

                
          </div>
       
         
         {/* Buttons */}
         {!userInfo?.isAdmin &&(
           <div className="flex items-center">
           <button className="bg-[#103A5C] text-white font-semibold p-3 rounded-md hover:opacity-90">
             <Link href="/modules/schedule" className="navLink">
                     Workload Schedule
             </Link>
                
             </button>
             {/* <button variant="outlined" onClick={handleClick}>
             Open success snackbar
           </button> */}
          </div>
         )}
         
         


          {userInfo?.isAdmin && (
            <div className="flex items-center">
              <button className="bg-[#103A5C] text-white font-semibold p-3 rounded-md hover:opacity-90
              " onClick={(e) =>{
                // alert("Hello!");
                console.log("wtf is wrong here???!");
                setIsOpen(true);
                setIsAddModule(true);
                console.log("2: wtf is wrong here???!");
              }} >
              Add Module
              </button>  
            </div>
          )}

                      
      </div>
        
{/* 
      {modules.length <= 0 && (
        <div className="text-center flex items-center justify-center mt-8">
          <p className="text-base font-semibold">No modules found...</p>
        </div>
      )} */}
      
      {/* Modules list */}
      <div className="flex flex-col lg:px-24 px-2 mt-4 space-y-2 mb-6">
        <Hits hitComponent={Hit}/>   

      </div>
      
      <br />
     
      {isOpen && <Modal/>}
       <Footer />



       
     </div>
      </InstantSearch>
      
  )
}
