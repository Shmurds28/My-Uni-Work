import { getDoc, doc, updateDoc } from 'firebase/firestore';
import React from 'react'
import { useRecoilState } from 'recoil';
import { addAssessment, login, modalState } from '../atoms/modalAtom';
import { useUserAuth } from '../context/UserAuthContext';
import { db } from '../firebase';
import MyModal from './Modal';

function Module({dashboardPage, module}) {
    const [isOpen, setIsOpen] = useRecoilState(modalState);
    const [isLogin, setIsLogin] = useRecoilState(login);
    const {user} = useUserAuth(); 

    const addToSchedule = async () => {
        if(user == null) {
            setIsOpen(true);
            setIsLogin(true);
            return;
        }
        getDoc(doc(db, "users", user.uid)).then( async(userDoc) => {
            var userModules = userDoc.data().modules;
            userModules.push(module.moduleCode);
            await updateDoc(doc(db, "users", user.uid),{
                modules: userModules,
            });
        });
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
            {(dashboardPage && !module.compulsory) &&(
                <button className="bg-red-400 mr-4 text-white font-semibold p-3 rounded-md hover:opacity-90">
                    Remove
                </button>
            )}

            {(!dashboardPage && !module.compulsory) &&(
                 <button className="bg-[#F9B42A] mr-4 text-white font-semibold p-3 rounded-md hover:opacity-90"
                    onClick={addToSchedule}>
                    Add to schedule
                </button>
            )}

           
            <button className="bg-[#F9B42A] hidden mr-4 text-white font-semibold p-3 rounded-md hover:opacity-90">
                Edit Module
            </button>
            <button className="bg-red-400 hidden mr-4 text-white font-semibold p-3 rounded-md hover:opacity-90">
                Delete
            </button>
        </div>

         {/* Modal */}
      {isOpen && <MyModal key={module.moduleCode} modCode={module.moduleCode}/>}
       
    </div>
  )
}

export default Module
