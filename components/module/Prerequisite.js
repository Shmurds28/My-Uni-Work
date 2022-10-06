import { getDoc, doc, updateDoc, deleteDoc, onSnapshot, query, collection } from 'firebase/firestore';
import React from 'react'
import { useRecoilState } from 'recoil';
import { confirm, confirmed, editModule, isError, isSnackBar, login, modalState, addAssessment, notificationMessage, viewModule } from '../../atoms/modalAtom';
import { useUserAuth } from '../../context/UserAuthContext';
import { db } from '../../firebase';
import MyModal from '../Modal';
import { useRouter } from 'next/router';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'; 
import Confirmation from '../Confirmation';

function Prerequisite({dashboardPage, module, modulePage, hit}) {
    const [isOpen, setIsOpen] = useRecoilState(modalState);
    const [isLogin, setIsLogin] = useRecoilState(login);
    const [isAddAssessment, setIsAddAssessment] = useRecoilState(addAssessment);
    const [isViewModule, setIsViewModule] = useRecoilState(viewModule);
    const [isEditModule, setIsEditModule] = useRecoilState(editModule);
    const {user, userInfo, setUserInfo} = useUserAuth();
    const router = useRouter(); 
    const [isSnackBarOpen, setIsSnackBarOpen] = useRecoilState(isSnackBar);
    const [isAnError, setIsAnError] = useRecoilState(isError);
    const [notMessage, setNotMessage] = useRecoilState(notificationMessage);
    const [isConfirm, setIsConfirm] = useRecoilState(confirm);
    const [isConfirmed, setIsConfirmed] = useRecoilState(confirmed);


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
                    <p className="text-base m-8">This action cannot be undone. Are you sure you want to delete this prerequisite?</p>
                    <button className="bg-[#F9B42A] border px-10 mr-4 text-white font-semibold p-3 rounded-md hover:opacity-90"
                      onClick={async() => {
                        await deleteDoc(doc(db, "prerequisites", module.moduleCode));
                        router.reload();
                        onClose();
                        
                        setNotMessage("Prerequisite Deleted");
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

    // Delete module 
    const deleteModule = async() => {

        confirmation();

        return;    

       
    }

  return (
        <div className={`${modulePage && "mx-4 md:mx-40 lg:mx-80 lg:mt-8 mb-0"} border p-3 bg-[#F9FAFB] shadow`}>
                <h1 className={`text-[#333] font-semibold mb-3 ${modulePage? "text-3xl text-center mb-8": "text-lg"}`}>
                    {module?.moduleCode} - {module?.moduleName}
                </h1>
                
                {modulePage && (
                    <div className="m-2">
                        <p>{module?.description}</p>
                    </div>
                )}

                <p className="mb-1">
                    <span className="text-[#333] font-semibold text-base mr-2">
                        Lecturer: 
                    </span>
                    {module?.lecturer}
                </p>


                <p className="mb-1">
                    <span className="text-[#333] font-semibold text-base mr-2">
                        Credit value: 
                    </span>
                    {module?.credits}
                </p>

                <div className="mb-1 mt-4">
               
                {userInfo?.isAdmin &&(
                    <button className="bg-[#F9FAFB] border border-gray-500 mr-4 text-black font-semibold p-3 rounded-md hover:opacity-90"
                        onClick={(e) => {
                            e.stopPropagation();
                            deleteModule();
                        }}>
                        Delete Prerequisite
                    </button>
                )}
                 
                </div>

                    

                {/* Modal */}
            {isOpen && <MyModal key={module?.moduleCode} module={module}/>}
            
        </div>
  
  )
}

export default Prerequisite
