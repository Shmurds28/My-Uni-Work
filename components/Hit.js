import React from 'react';
import { getDoc, doc, updateDoc, deleteDoc, onSnapshot, query, collection } from 'firebase/firestore';
import { useRecoilState } from 'recoil';
import { editModule, login, modalState, viewModule } from '../atoms/modalAtom';
import { useUserAuth } from '../context/UserAuthContext';
import { db } from '../firebase';
import MyModal from './Modal';
import { useRouter } from 'next/router';

function Hit({hit, onClick, modulePage, dashboardPage}) {
  const [isOpen, setIsOpen] = useRecoilState(modalState);
  const [isLogin, setIsLogin] = useRecoilState(login);
  const [isViewModule, setIsViewModule] = useRecoilState(viewModule);
  const [isEditModule, setIsEditModule] = useRecoilState(editModule);
  const {user, userInfo, setUserInfo} = useUserAuth();
  const router = useRouter(); 
  const module = hit;

   //Add module to user schedule
   const addToSchedule = async () => {
    //check if logged in
    if(user == null) {
        setIsOpen(true);
        setIsLogin(true);
        return;
    }

    //get the user data
    getDoc(doc(db, "users", user.uid)).then( async(userDoc) => {
        var userModules = userDoc.data().modules;

        //check if module not added already
        if(userModules.indexOf(module.moduleCode) != -1) {
            alert("Module already added");
            return;
        }

        //check if schedule has is not full and add the module
        if(userModules.length < 8) {
            setUserInfo(userDoc.data());
            userModules.push(module.moduleCode);
            await updateDoc(doc(db, "users", user.uid),{
                modules: userModules,
            });
            
            router.reload(window.location.pathname);
        }
       
    });
    

}

  return (
    <div className={`${modulePage && "mx-4 md:mx-40 lg:mx-80 lg:my-8"} m-4 border p-3 bg-[#F9FAFB] cursor-pointer shadow`} onClick={() => router.push(`/modules/${hit.moduleCode}`)}>
                <h1 className={`text-[#333] font-semibold mb-3 ${modulePage? "text-3xl text-center mb-8": "text-lg"}`}>
                    {hit.moduleCode} - {hit.moduleName}
                </h1>
                
                {modulePage && (
                    <div className="m-2">
                        <p>{hit.description}</p>
                    </div>
                )}

                <p className="mb-1">
                    <span className="text-[#333] font-semibold text-base mr-2">
                        Lecturer: 
                    </span>
                    {hit.lecturer}
                </p>

                <p className="mb-1">
                    <span className="text-[#333] font-semibold text-base mr-2">
                        Offered In: 
                    </span>
                    {hit.semester}
                </p>

                <p className="mb-1">
                    <span className="text-[#333] font-semibold text-base mr-2">
                        Prerequisites: 
                    </span>
                    {hit.prerequisites}
                </p>

                <p className="mb-1">
                    <span className="text-[#333] font-semibold text-base mr-2">
                        Credit value: 
                    </span>
                    {hit.credits}
                </p>

                <p className="mb-1">
                    <span className="text-[#333] font-semibold text-base mr-2">
                        Core Module: 
                    </span>
                    {hit.compulsory ? "YES" : "NO"}
                </p>
            
                    {/* <div className="mb-1">
                    {(dashboardPage && !hit.compulsory && !userInfo?.isAdmin) &&(
                        <button className="bg-[#F9FAFB] border border-gray-500 mr-4 text-black font-semibold p-3 rounded-md hover:opacity-90"
                            onClick={removeFromSchedule}>
                            Remove
                        </button>
                    )} */}

                    {(!dashboardPage && !hit.compulsory && !userInfo?.isAdmin) &&(
                        <button className="bg-[#F9B42A] mr-4 text-white font-semibold p-3 rounded-md hover:opacity-90"
                            onClick={(e) => {
                                e.stopPropagation();
                                addToSchedule();
                            }}>
                            Add to schedule
                        </button>
                    )}

                    {/* {userInfo?.isAdmin && modulePage && (
                        <button className="bg-[#F9B42A] mr-4 text-white font-semibold p-3 rounded-md hover:opacity-90"
                            onClick={() => {
                                setIsOpen(true);
                                setIsEditModule(true);
                            }}>
                        Edit Module
                        </button>
                    )}

                {userInfo?.isAdmin && modulePage &&(
                    <button className="bg-[#F9FAFB] border border-gray-500 mr-4 text-black font-semibold p-3 rounded-md hover:opacity-90"
                        onClick={deleteModule}>
                        Delete Module
                    </button>
                )} */}
        
                {/* </div> */}

                    

                {/* Modal */}
            {isOpen && <MyModal key={hit.moduleCode} module={hit}/>}
            
        </div>

  )
}

export default Hit
