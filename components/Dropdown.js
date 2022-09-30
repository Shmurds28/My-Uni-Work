import { Menu, Transition } from '@headlessui/react'
import { Fragment, useEffect, useRef, useState } from 'react'
import { ChevronDownIcon } from '@heroicons/react/solid';
import Image from 'next/image';
import logo from '../../2.png';
import Link from 'next/link';
import {MenuIcon,} from '@heroicons/react/solid';
import { modalState, signup, login } from '../atoms/modalAtom';
import { useRecoilState } from 'recoil';
import { useUserAuth } from '../context/UserAuthContext';
import MyModal from './Modal';
import { Router, useRouter } from 'next/router';
import { doc, onSnapshot, query } from 'firebase/firestore';
import { db } from '../firebase';

const Dropdown = () => {
  const [isOpen, setIsOpen]= useRecoilState(modalState); 
  const [isSignup, setIsSignup] = useRecoilState(signup);
  const [isLogin, setIsLogin] = useRecoilState(login);
  const {user, userInfo, setUserInfo} = useUserAuth();
  const {SignOut} = useUserAuth();
  const router = useRouter();

  useEffect(
    () => 
    {
        if(user){
            onSnapshot(
                query(doc(db, "users", user?.uid)),
                (userSnapshot) => {
                setUserInfo(userSnapshot.data());    
                }
            ),
            [db]
        }
    }
)

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

const dashboardLink = () => {
    if(userInfo?.isAdmin){
        router.push("/dashboard/modules")
    }else{
        router.push("/dashboard/schedule")
    }
}



  return (
    <div className="">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="">
            <MenuIcon className="w-10 h-10 text-[#000] font-semibold text-lg"/>
            
          </Menu.Button>
          
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="z-50 absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-2 py-2">
              <Menu.Item>
                  <button
                    className="navLink flex w-full items-center px-2 py-2"
                    onClick={() => router.push(`/modules`)}
                  >

                    Modules
                  </button>
              </Menu.Item>
              <Menu.Item>
                  <button
                    className="navLink flex w-full items-center px-2 py-2"
                    onClick={() => router.push(`/about`)}
                  > 
                    About Us
                  
                  </button>
              </Menu.Item>

              <Menu.Item>
                  <button
                    className="navLink flex w-full items-center px-2 py-2"
                    onClick={() => router.push(`/help`)}
                  >
                    
                    Help
                  </button>
              </Menu.Item>
            </div>

            {user == null && (
              <div className="px-2 py-2">
                  <Menu.Item>
                    <button
                      className="navLink flex w-full items-center px-2 py-2"
                      onClick={doLogin}
                    >

                      Login
                    </button>
                </Menu.Item>
                <Menu.Item>
                    <button
                      className="navLink flex w-full items-center px-2 py-2"
                      onClick={doSignup}
                    > 
                      Register
                    
                    </button>
                </Menu.Item>
              </div>
            )} 

            {user != null && (
              <div className="px-2 py-2">
                  <Menu.Item>
                    <button
                      className="navLink flex w-full items-center px-2 py-2"
                      onClick={dashboardLink}
                    >

                      Dashboard
                    </button>
                </Menu.Item>
                <Menu.Item>
                    <button
                      className="navLink flex w-full items-center px-2 py-2"
                      onClick={doSignOut}
                    > 
                      Signout
                    
                    </button>
                </Menu.Item>
              </div>
            )} 
            
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  )
}

export default Dropdown
