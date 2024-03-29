import React from 'react';
import { Fragment, useEffect, useState, useRef } from 'react'
import { useUserAuth } from '../../context/UserAuthContext';
import { useRouter } from 'next/router';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase';
import { editAssessment, assessmentInfo, assessmentId, isError, isSnackBar, modalState, notificationMessage, assCode } from '../../atoms/modalAtom';
import { useRecoilState } from 'recoil';
import MyModal from '../Modal';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'; 

function Assessment({assessment, Id, assessmentPage, isDashboard, modulePage, moduleId, viewModulePage}) {
    const {user, userInfo, setUserInfo} = useUserAuth();
    const [isOpen, setIsOpen] = useRecoilState(modalState);
    const [isEditAssessment, setIsEditAssessment] = useRecoilState(editAssessment);
    const [assInfo, setAssInfo] = useRecoilState(assessmentInfo);
    const [assId, setAssId] = useRecoilState(assessmentId);
    const [assModuleCode, setAssModuleCode] = useRecoilState(assCode);
    const [isSnackBarOpen, setIsSnackBarOpen] = useRecoilState(isSnackBar);
    const [isAnError, setIsAnError] = useRecoilState(isError);
    const [notMessage, setNotMessage] = useRecoilState(notificationMessage);
    const router = useRouter();
    const ref = useRef();
    
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
                    <p className="text-base m-8">This action cannot be undone. Are you sure you want to delete this assessment?</p>
                    <button className="bg-[#F9B42A] border px-10 mr-4 text-white font-semibold p-3 rounded-md hover:opacity-90"
                      onClick={async() => {
                        console.log(assessment);
                        const docRef = doc(db, "modules", moduleId, "assessments", assessment.id);
                        console.log(docRef);
                        await deleteDoc(docRef);
                        onClose();
                      
                        setNotMessage("Assessment successfully deleted!");
                        setIsAnError(false);
                        setIsSnackBarOpen(true);
                        router.reload();
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
    
    const deleteAssessment = async () => {
  
        confirmation();
        // router.reload(window.location.pathname);
    }

    useEffect(() => {
      const element = ref.current;

       if(element && !viewModulePage){
         element.style.backgroundColor = assessment?.data().color;
       }else if(element && viewModulePage){
         element.style.backgroundColor = "#ffff";
         element.style.color = "#000";
       }


    },[]);


    
  return (
        <div ref={ref} className={` text-white flex flex-col gap-4 border p-1 m-0 cursor-pointer rounded-md`} >
            <div className="flex items-center justify-between">
                <h1 className="font-bold text-base ">
                    {viewModulePage ? assessment.data().type : assessment.data().moduleName + " - "+ assessment.data().type}

                </h1>
                
                
            </div>
        
            <p className= {` ${viewModulePage ? "text-[#333]" : "text-white"} `}>
                <span className="font-semibold text-sm mr-2">
                    Weighting: 
                </span>
                  {assessment.data().weighting}%
            </p>
            
            
            <div className="flex">
                {userInfo?.isAdmin && (
                    <button className="bg-[#F9B42A] mr-4 text-white font-semibold p-3 rounded-md hover:opacity-90"
                    onClick={(e) => {
                        setIsOpen(true);
                        setAssInfo(assessment.data());
                        setAssId(assessment.id);
                        setAssModuleCode(moduleId);
                        setIsEditAssessment(true);
                   
                    }}>
                      Edit Assessment
                    </button>
                )}

              {userInfo?.isAdmin &&(
                <button className="bg-[#F9FAFB] border border-gray-500 mr-4 text-black font-semibold p-3 rounded-md hover:opacity-90"
                    onClick={deleteAssessment}>
                    Delete Assessment
                </button>
              )}
            </div>
            
             {/* Modal */}
                {/* {isOpen && <MyModal assessment={assessment} assessmentId={assessmentId}/>} */}

        </div>
  )
}

export default Assessment
