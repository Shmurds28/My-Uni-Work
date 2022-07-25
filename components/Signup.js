import { addDoc, doc, setDoc } from 'firebase/firestore';
import { Router, useRouter } from 'next/router';
import React, { useState } from 'react'
import { useRecoilState } from 'recoil';
import { modalState, signup } from '../atoms/modalAtom';
import {useUserAuth } from '../context/UserAuthContext';
import { db } from '../firebase';

function Signup() {
    const [isOpen, setIsOpen] = useRecoilState(modalState);
    const [isSignup, setIsSignup] = useRecoilState(signup);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const {signUp} = useUserAuth();
    const {user, userInfo} = useUserAuth();
    const [modules, setModules] = useState(["WHPV400","WRHV411"]);
    const router = useRouter();

    const doSignup = async (e) => {
      e.preventDefault();
      setIsLoading(true);
      setError(null);

      try{
        await signUp(email, password)
              .then((userCredential) => {
                    // Signed in 
                    user = userCredential.user;                     
                      
                    userInfo = setDoc(doc(db, "users", user.uid),{
                        email: email,
                        firstname: firstName,
                        lastName: lastName,
                        modules: modules,
                        isAdmin: true,
                    });
                    router.push("/dashboard/schedule");
                    // ...
                });
                setIsOpen(false);
                setIsSignup(false);
                setEmail("");
                setPassword("");
                setFirstName("");
                setLastName("");

      }catch(err){
        setError(err.code);
      }

      // Router.reload(window.location.pathname)
    }

  return (
    <div className="">
    <h1 className="text-4xl font-bold flex items-center justify-center pb-8">Signup</h1>
     <form className="lg:grid lg:grid-cols-1 lg:gap-3" onSubmit={doSignup}>
            {error && (
              <div className=" text-red-500 text-center rounded">
                <span>{error}</span>
              </div>
            )}
         <div>
           <label className="block">
             <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-semibold text-slate-700">
               Firstname
             </span>
             <input value={firstName} onChange= {(e) => setFirstName(e.target.value)} type="text"className=" rounded-md mt-1 w-full px-3 py-2 bg-white border shadow-sm border-slate-300" />
          </label>
         </div>

         <div>
           <label className="block">
             <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-semibold text-slate-700">
               Last Name
             </span>
             <input value={lastName} onChange= {(e) => setLastName(e.target.value)} type="text"className=" rounded-md mt-1 w-full px-3 py-2 bg-white border shadow-sm border-slate-300" />
          </label>
         </div>

         <div>
           <label className="block">
             <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-semibold text-slate-700">
               Email
             </span>
             <input value={email} onChange= {(e) => setEmail(e.target.value)} type="email"className=" rounded-md mt-1 w-full px-3 py-2 bg-white border shadow-sm border-slate-300" />
          </label>
         </div>

         <div>
           <label className="block">
             <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-semibold text-slate-700">
               Password
             </span>
             <input value={password} onChange= {(e) => setPassword(e.target.value)} type="password" className=" rounded-md mt-1 w-full px-3 py-2 bg-white border shadow-sm border-slate-300" />
          </label>
         </div>

         <div className="m-1">
           <label className="block">
             <button className="bg-[#103A5C] w-full text-white font-semibold p-3 rounded-md hover:opacity-90
                 " onClick={doSignup} >
                 Signup
             </button>   
          </label>
         </div>

         <div className="m-1">
           <label className="block">
             <button className="bg-red-400 w-full text-white font-semibold p-3 rounded-md hover:opacity-90
                 " onClick={(e) =>{
                   setIsOpen(false);
                   Router.reload(window.location.pathname);
                 }} >
                 Cancel
             </button>   
          </label>
         </div>
     </form>
    </div>
  )
}

export default Signup
