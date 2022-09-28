import { LockClosedIcon } from '@heroicons/react/outline';
import { addDoc, doc, setDoc } from 'firebase/firestore';
import { Router, useRouter } from 'next/router';
import React, { useState } from 'react'
import { useRecoilState } from 'recoil';
import { modalState, signup } from '../atoms/modalAtom';
import {useUserAuth } from '../context/UserAuthContext';
import { db } from '../firebase';
import {EyeIcon } from '@heroicons/react/solid';

function Signup() {
    const [isOpen, setIsOpen] = useRecoilState(modalState);
    const [isSignup, setIsSignup] = useRecoilState(signup);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const {signUp} = useUserAuth();
    const {user, userInfo} = useUserAuth();
    const [modules, setModules] = useState(["WHPV400","WRHV411"]);
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);

    const doSignup = async (e) => {
      e.preventDefault();
      setIsLoading(true);
      setError(null);

      if(password !== confirmPassword){
        setError("Passwords must match.");
        setIsLoading(false);
        return;
      }

      if(!firstName || !lastName || !email || !password ){ 
        setError("Missing required fields!!");
        setIsLoading(false);
        return;

      }
      var mailformat = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        if(!email.match(mailformat))
        {
          setError("Invalid email address.");
          setIsLoading(false); 
          return;
        }

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
                        isAdmin: false,
                    });
                    setIsOpen(false);
                    setIsSignup(false);
                    setEmail("");
                    setPassword("");
                    setFirstName("");
                    setLastName("");
                    router.push("/");
                });
                

      }catch(err){
        setError(err.message);
      }

      // Router.reload(window.location.pathname)
    }

    const doShowPassword = () => {
      setShowPassword(true);
    }

    const doHidePassword = () => {
      setShowPassword(false);
    }

  return (
    <div className="">
      <div className=" flex items-center align-center w-14 h-14 mx-auto justify-center p-2 bg-[#103A5C] m-0 rounded-full ">
      <LockClosedIcon className="w-10 h-10 text-white font-semibold text-lg hover:text-[#F9B42A]"/>
      </div>
    <h1 className="text-4xl font-bold flex items-center justify-center pb-8">Signup</h1>
     <form className="lg:grid lg:grid-cols-1 lg:gap-3" onSubmit={doSignup}>
            {error && (
              <div className=" text-red-500 text-center rounded">
                <span>{error}</span>
              </div>
            )}
            <span className="before:content-['*'] before:mx-1 before:ml-0.5 before:text-red-500 block text-xs font-xs text-slate-700 ">
              required fields
            </span>
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
             <div className="relative">
                <div className="absolute flex justify-end w-full right-1 items-center cursor-pointer m-3">
                  <EyeIcon className={`${!showPassword && "hidden"} w-5 h-5 text-[#000] font-semibold `}
                      onClick={doHidePassword}/>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`${showPassword && "hidden"} w-5 h-5 text-[#000] font-semibold `} onClick={doShowPassword}>
                        <path d="M3.53 2.47a.75.75 0 00-1.06 1.06l18 18a.75.75 0 101.06-1.06l-18-18zM22.676 12.553a11.249 11.249 0 01-2.631 4.31l-3.099-3.099a5.25 5.25 0 00-6.71-6.71L7.759 4.577a11.217 11.217 0 014.242-.827c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113z" />
                        <path d="M15.75 12c0 .18-.013.357-.037.53l-4.244-4.243A3.75 3.75 0 0115.75 12zM12.53 15.713l-4.243-4.244a3.75 3.75 0 004.243 4.243z" />
                        <path d="M6.75 12c0-.619.107-1.213.304-1.764l-3.1-3.1a11.25 11.25 0 00-2.63 4.31c-.12.362-.12.752 0 1.114 1.489 4.467 5.704 7.69 10.675 7.69 1.5 0 2.933-.294 4.242-.827l-2.477-2.477A5.25 5.25 0 016.75 12z" />
                      </svg>

                 </div>
                <input
                 value={password} 
                 onChange= {(e) => setPassword(e.target.value)} 
                 type={`${showPassword ? "text" : "password"}`} 
                 className=" rounded-md mt-1 w-full px-3 py-2 bg-white border shadow-sm border-slate-300"
                />
                 
             </div>
          </label>
         </div>

         <div>
           <label className="block">
             <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-semibold text-slate-700">
               Confirm Password
             </span>
             <div className="relative">
                <div className="absolute flex justify-end w-full right-1 items-center cursor-pointer m-3">
                  <EyeIcon className={`${!showPassword && "hidden"} w-5 h-5 text-[#000] font-semibold `}
                      onClick={doHidePassword}/>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`${showPassword && "hidden"} w-5 h-5 text-[#000] font-semibold `} onClick={doShowPassword}>
                        <path d="M3.53 2.47a.75.75 0 00-1.06 1.06l18 18a.75.75 0 101.06-1.06l-18-18zM22.676 12.553a11.249 11.249 0 01-2.631 4.31l-3.099-3.099a5.25 5.25 0 00-6.71-6.71L7.759 4.577a11.217 11.217 0 014.242-.827c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113z" />
                        <path d="M15.75 12c0 .18-.013.357-.037.53l-4.244-4.243A3.75 3.75 0 0115.75 12zM12.53 15.713l-4.243-4.244a3.75 3.75 0 004.243 4.243z" />
                        <path d="M6.75 12c0-.619.107-1.213.304-1.764l-3.1-3.1a11.25 11.25 0 00-2.63 4.31c-.12.362-.12.752 0 1.114 1.489 4.467 5.704 7.69 10.675 7.69 1.5 0 2.933-.294 4.242-.827l-2.477-2.477A5.25 5.25 0 016.75 12z" />
                      </svg>

                 </div>
                <input
                 value={confirmPassword} 
                 onChange= {(e) => setConfirmPassword(e.target.value)} 
                 type={`${showPassword ? "text" : "password"}`} 
                 className=" rounded-md mt-1 w-full px-3 py-2 bg-white border shadow-sm border-slate-300"
                />
                 
             </div>
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
             <button className="bg-[#F9FAFB] border border-gray-500 w-full text-black font-semibold p-3 rounded-md hover:opacity-90
                 " onClick={(e) =>{
                   setIsOpen(false);
                   router.reload(window.location.pathname);
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
