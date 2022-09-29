import React, { useState } from 'react'
import { useRecoilState } from 'recoil';
import { modalState, login } from '../atoms/modalAtom';
import { useUserAuth } from '../context/UserAuthContext';
import Router, { useRouter } from "next/router";
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { LockClosedIcon } from '@heroicons/react/outline';
import {EyeIcon } from '@heroicons/react/solid';


function Login() {
    const [isOpen, setIsOpen] = useRecoilState(modalState);
    const [isLogin, setIsLogin] = useRecoilState(login);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const {signIn} = useUserAuth();
    const {user, setUserInfo, userInfo} = useUserAuth(); 
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);

    const doLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null)  
        
        if(!email && !password) {
          setError("Please enter your email and password");
          return;
        }else if(!password){
          setError("Please enter your password");
          return;
        }else if(!email){
          setError("Please enter your email");
          return;
        }

        try{
          await signIn(email, password)
                  .then((userCredential) => {
                    // Signed in 
                    user = userCredential.user;
                    // console.log("USER!!!!!!!!!!!!!!!!1");
                    // console.log(user);
                    getDoc(doc(db, "users", userCredential.user.uid)).then((userSnapshot) => {
                      userInfo = userSnapshot.data();
                    }).catch((error) => {
                      setError(error.code);
                    });

                    // ...
          });
          
          setEmail("");
          setPassword("");
          setIsOpen(false);
          setIsLogin(false);
          setIsLoading(false);
          router.push('/');
          router.reload(window.location.pathname);

        }catch(err){
          // console.log(err.name);
          setError(err.code);
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
    <h1 className="text-4xl font-bold flex items-center justify-center m-0 pb-4">Login</h1>
     <form className="lg:grid lg:grid-cols-1 lg:gap-3" onSubmit={doLogin}>
          {error && (
            <p className=" text-red-500 col-span-2 text-center rounded">
              <span>{error}</span>
            </p>
            
          )}

         <div>
           <label className="block">
             <span className="block text-sm font-semibold text-slate-700">
               Email
             </span>
             <input value={email} onChange= {(e) => setEmail(e.target.value)} type="email"className=" rounded-md mt-1 w-full px-3 py-2 bg-white border shadow-sm border-slate-300" />
          </label>
         </div>

         <div>
           <label className="block">
             <span className=" block text-sm font-semibold text-slate-700">
               Password
             </span>
             <div className="relative">
                <div className="absolute flex justify-end w-full right-1 items-center cursor-pointer m-3">
                  <EyeIcon className={`${!showPassword && "hidden"} w-6 h-6 text-[#000] font-semibold `}
                      onClick={doHidePassword}/>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`${showPassword && "hidden"} w-6 h-6 text-[#000] font-semibold `} onClick={doShowPassword}>
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

         <div className="m-1">
           <label className="block">
             <button className="bg-[#103A5C] w-full text-white font-semibold p-3 rounded-md hover:opacity-90
                 "  >
                 Login
             </button>   
          </label>
         </div>

         <div className="m-1">
           <label className="block">
             <button className="bg-[#F9FAFB] border border-gray-500 w-full text-black font-semibold p-3 rounded-md hover:opacity-90
                 " onClick={(e) =>{
                   setIsOpen(false);
                   setIsLogin(false);
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

export default Login
