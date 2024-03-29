import React from 'react'
// import img from '../public/reading.png';
import Image from "next/image";
// import defaultImage from '../public/default.png' 
import { useUserAuth } from '../../context/UserAuthContext';
import { useRouter } from 'next/router';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase';
import { addLecturer, editLecturer, isError, isSnackBar, modalState, notificationMessage } from '../../atoms/modalAtom';
import { useRecoilState } from 'recoil';
import MyModal from '../Modal';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'; 

function Lecturer({id, lecturer, lecturerPage}) {
  const {user, userInfo, setUserInfo} = useUserAuth();
  const [isOpen, setIsOpen] = useRecoilState(modalState);
  const [isEditLecturer, setIsEditLecturer] = useRecoilState(editLecturer);
  const [isSnackBarOpen, setIsSnackBarOpen] = useRecoilState(isSnackBar);
  const [isAnError, setIsAnError] = useRecoilState(isError);
  const [notMessage, setNotMessage] = useRecoilState(notificationMessage);
  const router = useRouter(); 

  const confirmation = () => {
    confirmAlert({
        customUI:({onClose}) =>  {
            return (
                <div className='py-8 px-20 border bg-[#F9FAFB] rounded-md'>
                <h1 className='font-semibold text-2xl my-2 '>
                    {/* <ExclamationTriangleIcon className="w-10 h-10 text-[#000]"/> */}
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="mx-2 w-8 h-8 inline">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 10.5v3.75m-9.303 3.376C1.83 19.126 2.914 21 4.645 21h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 4.88c-.866-1.501-3.032-1.501-3.898 0L2.697 17.626zM12 17.25h.007v.008H12v-.008z" />
                    </svg>
                    Warning!
                </h1>
                <p className="text-base m-8">This action cannot be undone. Are you sure you want to delete this lecturer?</p>
                <button className="bg-[#F9B42A] border px-10 mr-4 text-white font-semibold p-3 rounded-md hover:opacity-90"
                  onClick={async() => {
                    const docRef = doc(db, "lecturers", id);
                    console.log(docRef);
                    await deleteDoc(docRef);
                    onClose();
                    router.back();
                    setNotMessage("Lecturer successfully deleted!");
                    setIsAnError(false);
                    setIsSnackBarOpen(true);
                    
                  }}
                  
                >
                  Yes
                </button>
                <button className="bg-[#F9FAFB] px-10 border border-gray-500 mr-4 text-black font-semibold p-3 rounded-md hover:opacity-90"
                 onClick={onClose}>
                    No
                </button>
              
              </div>
              )
        }
    });
}

  const deleteLecturer = async () => {
  
    confirmation();
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
                    {lecturer?.title} {lecturer?.initials} {lecturer?.surname}
                </h1>
                <p className="text-base font-medium"> <strong>Email: </strong> {lecturer?.email}</p>
                <p className="text-base font-medium"> <strong>Phone: </strong> {lecturer?.telephone} </p>
                <p className="text-base font-medium"> <strong>Office: </strong> {lecturer?.office} </p>
            </div>
          </div>
            </div>
        )} 

        {/* Lecturer Page */}
        {lecturerPage && (
          <div className="mx-4 md:mx-40 lg:mx-80 lg:my-8 gap-4 lg:p-6 p-2 bg-[#F9FAFB] cursor-pointer rounded-md shadow mb-4">
            <div className="flex flex-col gap-4">
              <img src={lecturer?.image} className=" rounded-md object-cover max-h-[450px]"/>
              <div>
                  <h1 className="text-lg font-bold text-[#333]">
                      {lecturer?.title} {lecturer?.initials} {lecturer?.surname}
                  </h1>
                  <p className="text-base font-medium"> <strong>Email: </strong> {lecturer?.email}</p>
                  <p className="text-base font-medium"> <strong>Phone: </strong> {lecturer?.telephone} </p>
                  <p className="text-base font-medium"> <strong>Office: </strong> {lecturer?.office} </p>
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
