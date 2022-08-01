import React from 'react'
import img from '../public/reading.png';
import Image from "next/image";
import defaultImage from '../public/default.png' 
import { useUserAuth } from '../context/UserAuthContext';
import { useRouter } from 'next/router';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
import { addLecturer, editLecturer, modalState } from '../atoms/modalAtom';
import { useRecoilState } from 'recoil';
import MyModal from './Modal';

function Lecturer({id, lecturer, lecturerPage}) {
  const {user, userInfo, setUserInfo} = useUserAuth();
  const [isOpen, setIsOpen] = useRecoilState(modalState);
  const [isEditLecturer, setIsEditLecturer] = useRecoilState(editLecturer);
  const router = useRouter(); 

  const deleteLecturer = async () => {
  
    const docRef = doc(db, "lecturers", id);
    console.log(docRef);
    await deleteDoc(docRef);
    // router.reload(window.location.pathname);
  }

  return (
    <div className=" "
      onClick={()=> router.push(`/dashboard/lecturers/${id}`)}>

        {!lecturerPage && (
            <div className="flex flex-col gap-4 lg:p-6 p-2 bg-[#F9FAFB] cursor-pointer rounded-md shadow mb-4">
              <div className="flex flex-col lg:flex-row gap-4">
            <img src={lecturer?.image} className=" rounded-md object-fill max-h-[200px]"/>
            <div>
                <h1 className="text-lg font-bold text-[#333]">
                    {lecturer.title} {lecturer.initials} {lecturer.surname}
                </h1>
                <p className="text-base font-medium"> <strong>Email: </strong> {lecturer.email}</p>
                <p className="text-base font-medium"> <strong>Phone: </strong> {lecturer.telephone} </p>
                <p className="text-base font-medium"> <strong>Office: </strong> {lecturer.office} </p>
            </div>
          </div>
            </div>
        )} 

        {/* Lecturer Page */}
        {lecturerPage && (
          <div className="mx-4 md:mx-40 lg:mx-80 lg:my-8 gap-4 lg:p-6 p-2 bg-[#F9FAFB] cursor-pointer rounded-md shadow mb-4">
            <div className="flex flex-col gap-4">
              <img src={lecturer?.image} className=" rounded-md object-fill max-h-[450px]"/>
              <div>
                  <h1 className="text-lg font-bold text-[#333]">
                      {lecturer.title} {lecturer.initials} {lecturer.surname}
                  </h1>
                  <p className="text-base font-medium"> <strong>Email: </strong> {lecturer.email}</p>
                  <p className="text-base font-medium"> <strong>Phone: </strong> {lecturer.telephone} </p>
                  <p className="text-base font-medium"> <strong>Office: </strong> {lecturer.office} </p>
              </div>
            </div>
            
            <div>
                {userInfo?.isAdmin && (
                    <button className="bg-[#F9B42A] mr-4 text-white font-semibold p-3 rounded-md hover:opacity-90"
                    onClick={(e) => {
                      setIsOpen(true);
                      setIsEditLecturer(true);
                    }}>
                      Edit Lecturer
                    </button>
                )}

              {userInfo?.isAdmin &&(
                <button className="bg-[#F9FAFB] border border-gray-500 mr-4 text-black font-semibold p-3 rounded-md hover:opacity-90"
                    onClick={deleteLecturer}>
                    Delete Lecturer
                </button>
              )}
            </div>
          </div>
        )}
        
        
    </div>
  )
}

export default Lecturer
