import { getDoc, doc, updateDoc, deleteDoc, onSnapshot, query, collection } from 'firebase/firestore';
import React from 'react'
import { useRecoilState } from 'recoil';
import { login, modalState, viewModule } from '../atoms/modalAtom';
import { useUserAuth } from '../context/UserAuthContext';
import { db } from '../firebase';
import MyModal from './Modal';
import { useRouter } from 'next/router';

function Module({dashboardPage, module}) {
    const [isOpen, setIsOpen] = useRecoilState(modalState);
    const [isLogin, setIsLogin] = useRecoilState(login);
    const [isViewModule, setIsViewModule] = useRecoilState(viewModule);
    const {user, userInfo, setUserInfo} = useUserAuth();
    const router = useRouter(); 

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

    // Remove module from Schedule
    const removeFromSchedule = async() =>{
        //get user data
        getDoc(doc(db, "users", user.uid)).then( async(userDoc) => {
            var userModules = userDoc.data().modules;
            //remove the modue
            const mods = (userModules.filter(mod => mod != module.moduleCode));
            console.log(mods);
            //update user data with removed module
            await updateDoc(doc(db, "users", user.uid),{
                modules: mods,
            });
            router.reload(window.location.pathname);
        }).catch(err => {
            console.log(err);
        });
    }

    // Delete module 
    const deleteModule = async() => {
        await deleteDoc(doc(db, "modules", module.moduleCode));
        // router.reload(window.location.pathname);
    }

  return (
    <div className="border p-3 bg-[#F9FAFB] cursor-pointer shadow">
        <h1 className="text-[#333] font-semibold text-lg mb-3">
            {module.moduleCode} - {module.moduleName}
        </h1>
        <p className="mb-1">
            <span className="text-[#333] font-semibold text-base mr-2">
                Lecturer: 
            </span>
            {module.lecturer}
        </p>

        <p className="mb-1">
            <span className="text-[#333] font-semibold text-base mr-2">
                Offered In: 
            </span>
            {module.semester}
        </p>

        <p className="mb-1">
            <span className="text-[#333] font-semibold text-base mr-2">
                Prerequisites: 
            </span>
            {module.prerequisites}
        </p>

        <p className="mb-1">
            <span className="text-[#333] font-semibold text-base mr-2">
                Credit value: 
            </span>
            {module.credits}
        </p>

        <p className="mb-1">
            <span className="text-[#333] font-semibold text-base mr-2">
                Core Module: 
            </span>
            {module.compulsory ? "YES" : "NO"}
        </p>

        {/* <div className="mb-1">
            <button className="bg-[#F9B42A] mr-4 text-white font-semibold p-3 rounded-md hover:opacity-90"
                onClick={() =>{
                    setIsOpen(true);
                    setIsViewModule(true);
                } 
                }>
                View module
            </button>
        </div> */}

        {viewModule && (
            <div className="mb-1">
            {(dashboardPage && !module.compulsory && !userInfo?.isAdmin) &&(
                <button className="bg-[#F9FAFB] border border-gray-500 mr-4 text-black font-semibold p-3 rounded-md hover:opacity-90"
                    onClick={removeFromSchedule}>
                    Remove
                </button>
            )}

            {(!dashboardPage && !module.compulsory && !userInfo?.isAdmin) &&(
                 <button className="bg-[#F9B42A] mr-4 text-white font-semibold p-3 rounded-md hover:opacity-90"
                    onClick={addToSchedule}>
                    Add to schedule
                </button>
            )}

            {userInfo?.isAdmin && (
                <button className="bg-[#F9B42A] mr-4 text-white font-semibold p-3 rounded-md hover:opacity-90">
                Edit Module
                </button>
            )}

           {userInfo?.isAdmin &&(
            <button className="bg-[#F9FAFB] border border-gray-500 mr-4 text-black font-semibold p-3 rounded-md hover:opacity-90"
                onClick={deleteModule}>
                Delete Module
            </button>
           )}
   
          </div>
        )}

            

         {/* Modal */}
      {isOpen && <MyModal key={module.moduleCode} module={module}/>}
       
    </div>
  )
}

export default Module
