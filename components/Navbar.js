import React from 'react'
import Image from 'next/image';
import logo from '../../2.png';
import Link from 'next/link';
import {MenuIcon} from '@heroicons/react/solid';
import { modalState, signup, login } from '../atoms/modalAtom';
import { useRecoilState } from 'recoil';
import { useUserAuth } from '../context/UserAuthContext';
import MyModal from './Modal';
import { Router, useRouter } from 'next/router';

function Navbar() {
    const [isOpen, setIsOpen]= useRecoilState(modalState); 
    const [isSignup, setIsSignup] = useRecoilState(signup);
    const [isLogin, setIsLogin] = useRecoilState(login);
    const {user} = useUserAuth();
    const {SignOut} = useUserAuth();
    const router = useRouter();

    console.log(user);

    const doLogin = () => {
        setIsOpen(true);
        setIsLogin(true);
    }

    const doSignup = () => {
        setIsOpen(true);
        setIsSignup(true);
    }

    const doSignOut = () => {
        SignOut();
        router.push("/");
    }

  return (
    <div className="mt-2 px-4 flex items-center justify-between h-20 border-b border-gray-100">
        <div className="cursor-pointer">
            <Link href="/">
                <Image src={logo} height={70} width={200} className="object-fit"/>
            </Link>
            
        </div>

        <div className="menu-icon">
            <MenuIcon className="w-10 h-10 text-[#000] font-semibold text-lg hover:text-[#F9B42A]"/>
        </div>

        <div className=" flex space-x-5 middle-nav">
            <Link href="/modules" className="navLink">
                <a className="navLink">
                    Modules
                </a>
            </Link>
            <Link href="/about">
                <a className="navLink cursor-pointer">
                    About Us
                </a>

            </Link>
            <Link href="/help" className="navLink">
                <a className="navLink">
                    Help
                </a>
            </Link>

            
        </div>

            {user != null && (
                <div className="flex space-x-5 end-nav">
                     <Link href="/dashboard/schedule">
                        <a className="navLink">
                            Dashboard   
                        </a>
        
                    </Link>

                    {/* <Link href="/" className="navLink"> */}
                        <a className="navLink" onClick={doSignOut}>
                            SignOut
                        </a>
                    {/* </Link> */}
                </div>
            )} 

            {user == null && (
                <div className="flex space-x-5 end-nav">
                    {/* <Link href="/dashboard/schedule" className="navLink"> */}
                        <a className="navLink" onClick={doLogin}>
                            Login
                        </a>
                    {/* </Link> */}

                    {/* <Link href="/dashboard/schedule" className="navLink"> */}
                        <a className="navLink" onClick={doSignup}>
                            Signup
                        </a>
                    {/* </Link> */}

                   
                </div>
            )}  

             {/* Modal */}
             {isOpen && <MyModal/>}     
    </div>
  )
}

export default Navbar
