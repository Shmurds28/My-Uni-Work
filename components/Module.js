import { getDoc, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import React from 'react'
import { useRecoilState } from 'recoil';
import { addAssessment, login, modalState } from '../atoms/modalAtom';
import { useUserAuth } from '../context/UserAuthContext';
import { db } from '../firebase';
import MyModal from './Modal';
import { useRouter } from 'next/router';

function Module({dashboardPage, module}) {
    const [isOpen, setIsOpen] = useRecoilState(modalState);
    const [isLogin, setIsLogin] = useRecoilState(login);
    const {user, userInfo, setUserInfo} = useUserAuth();
    const router = useRouter() 

    const addToSchedule = async () => {
        if(user == null) {
            setIsOpen(true);
            setIsLogin(true);
            return;
        }
        getDoc(doc(db, "users", user.uid)).then( async(userDoc) => {
            var userModules = userDoc.data().modules;
            setUserInfo(userDoc.data());
            userModules.push(module.moduleCode);
            await updateDoc(doc(db, "users", user.uid),{
                modules: userModules,
            });
        });

    }

    const removeFromSchedule = async() =>{
        getDoc(doc(db, "users", user.uid)).then( async(userDoc) => {
            var userModules = userDoc.data().modules;
            const mods = (userModules.filter(mod => mod != module.moduleCode));
            console.log(mods);
            await updateDoc(doc(db, "users", user.uid),{
                modules: mods,
            });
            router.reload(window.location.pathname)
        }).catch(err => {
            console.log(err);
        });
    }

    const deleteModule = async() => {
        await deleteDoc(doc(db, "modules", module.moduleCode));
        router.reload(window.location.pathname);
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

        <div className="mb-1">
            {(dashboardPage && !module.compulsory && !userInfo?.isAdmin) &&(
                <button className="bg-red-400 mr-4 text-white font-semibold p-3 rounded-md hover:opacity-90"
                    onClick={removeFromSchedule}>
                    Remove
                </button>
            )}

            {(!dashboardPage && !module.compulsory) &&(
                 <button className="bg-[#F9B42A] mr-4 text-white font-semibold p-3 rounded-md hover:opacity-90"
                    onClick={addToSchedule}>
                    Add to schedule
                </button>
            )}

            {userInfo.isAdmin && (
                <button className="bg-[#F9B42A] mr-4 text-white font-semibold p-3 rounded-md hover:opacity-90">
                Edit Module
                </button>
            )}

           {userInfo.isAdmin &&(
            <button className="bg-red-400 mr-4 text-white font-semibold p-3 rounded-md hover:opacity-90"
                onClick={deleteModule}>
                Delete Module
            </button>
           )}
            

            
        </div>

         {/* Modal */}
      {isOpen && <MyModal key={module.moduleCode} modCode={module.moduleCode}/>}
       
    </div>
  )
}

export default Module
