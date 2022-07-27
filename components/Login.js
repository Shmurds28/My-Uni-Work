import React, { useState } from 'react'
import { useRecoilState } from 'recoil';
import { modalState, login } from '../atoms/modalAtom';
import { useUserAuth } from '../context/UserAuthContext';
import Router, { useRouter } from "next/router";
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';


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

  return (
    <div className="">
    <h1 className="text-4xl font-bold flex items-center justify-center pb-4">Login</h1>
     <form className="lg:grid lg:grid-cols-1 lg:gap-3" onSubmit={doLogin}>
          {error && (
            <div className=" text-red-500 col-span-2 text-center rounded">
              <span>{error}</span>
            </div>
            
          )}
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
                 "  >
                 Login
             </button>   
          </label>
         </div>

         <div className="m-1">
           <label className="block">
             <button className="bg-red-400 w-full text-white font-semibold p-3 rounded-md hover:opacity-90
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
