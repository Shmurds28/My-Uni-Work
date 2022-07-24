import React, { useState } from 'react'
import { useRecoilState } from 'recoil';
import { modalState, login } from '../atoms/modalAtom';
import { useUserAuth } from '../context/UserAuthContext';


function Login() {
    const [isOpen, setIsOpen] = useRecoilState(modalState);
    const [isLogin, setIsLogin] = useRecoilState(login);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const {signIn} = useUserAuth();

    const doLogin = async (e) => {
        e.preventDefault();
        setError("");
        setIsOpen(false);
        setIsLogin(false);

        try{
          await signIn(email, password)
                  .then((userCredential) => {
                    // Signed in 
                    user = userCredential.user;
                    console.log("userrrrr:" + user.uid);
                    // ...
                });

         
          setEmail("");
          setPassword("");
        }catch(err){
          setError(err.message);
        } 
    }

  return (
    <div className="">
    <h1 className="text-xl font-bold flex items-center justify-center pb-8">Login</h1>
     <div className="lg:grid lg:grid-cols-1 lg:gap-3">
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
                 " onClick={doLogin} >
                 Login
             </button>   
          </label>
         </div>

         <div className="m-1">
           <label className="block">
             <button className="bg-red-400 w-full text-white font-semibold p-3 rounded-md hover:opacity-90
                 " onClick={(e) =>{
                   setIsOpen(false);
                   
                 }} >
                 Cancel
             </button>   
          </label>
         </div>
     </div>
    </div>
  )
}

export default Login
