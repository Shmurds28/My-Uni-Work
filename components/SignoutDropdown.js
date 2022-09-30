import React from 'react';
import { Menu, Transition } from '@headlessui/react';
import { Fragment, useEffect, useRef, useState } from 'react'
import { ChevronDownIcon } from '@heroicons/react/solid';
import { modalState, signup, login } from '../atoms/modalAtom';
import { useRecoilState } from 'recoil';
import { useUserAuth } from '../context/UserAuthContext';
import { Router, useRouter } from 'next/router';

function SignoutDropdown() {
  const [isOpen, setIsOpen]= useRecoilState(modalState); 
  const [isSignup, setIsSignup] = useRecoilState(signup);
  const [isLogin, setIsLogin] = useRecoilState(login);
  const {user, userInfo, setUserInfo} = useUserAuth();
  const {SignOut} = useUserAuth();
  const router = useRouter();
  


  const doSignOut = () => {
    SignOut();
    router.push("/");
  }


  return (

       <Menu as="div" className="relative inline-block navLink"> 
          <Menu.Button className=" inline-flex w-full justify-center">
               {userInfo?.firstname}
              <ChevronDownIcon
              className="ml-0  h-5 w-5 font-semibold text-[000] hover:text-[#F9B42A]"
              aria-hidden="true"
            />
          </Menu.Button>
          <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="z-50 absolute right-0 mt-2 w-56 origin-top-right divide-y bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-2 py-2">
            <Menu.Item>
                <button
                  className="navLink flex w-full items-center px-2 py-2"
                  onClick={doSignOut}
                >

                  Signout
                </button>
            </Menu.Item>
            </div>

          </Menu.Items>
        </Transition>
       </Menu>
       
       

  )
}

export default SignoutDropdown
