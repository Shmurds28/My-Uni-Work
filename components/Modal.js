import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { addAssessment, addLecturer, addModule, confirm, addPrerequisite, editLecturer, editModule, editAssessment, login, modalState, signup, viewModule } from '../atoms/modalAtom'
import AddLecturer from './lecturer/AddLecturer';
import AddAssessment from './assessment/AddAssessment';
import EditAssessment from './assessment/EditAssessment';
import AddModule from './module/AddModule';
import AddPrerequisite from './module/AddPrerequisite';
import Signup from './Signup';
import Login from './Login';
import {useRouter} from 'next/router'
import { XIcon } from '@heroicons/react/solid';
import { EditLecturer } from './lecturer/EditLecturer';
import EditModule from './module/EditModule';
import Confirmation from './Confirmation';

export default function MyModal({module, lecturer, lecturerId, assessment, assessmentId}) {
  const [isOpen, setIsOpen] = useRecoilState(modalState);
  const [isAddModule, setIsAddModule] = useRecoilState(addModule);
  const [isAddPrerequisite, setIsAddPrerequisite] = useRecoilState(addPrerequisite);
  const [isAddAssessment, setIsAddAssessment] = useRecoilState(addAssessment);
  const [isAddLecturer, setIsAddLecturer] = useRecoilState(addLecturer);
  const [isEditLecturer, setIsEditLecturer] = useRecoilState(editLecturer);
  const [isEditModule, setIsEditModule] = useRecoilState(editModule);
  const [isEditAssessment, setIsEditAssessment] = useRecoilState(editAssessment);
  const [isSignup, setIsSignup] = useRecoilState(signup);
  const [isLogin, setIsLogin] = useRecoilState(login);
  const [isViewModule, setIsViewModule] = useRecoilState(viewModule);
  const [isConfirm, setIsConfirm] = useRecoilState(confirm);
  const router = useRouter();

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center">
        <button
          type="button"
          onClick={setIsOpen}
          className="rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        >
          Open dialog
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={ () => {
          setIsOpen(false);
          setIsAddModule(false);
          setIsAddAssessment(false);
          setIsAddLecturer(false);
          setIsSignup(false);
          setIsLogin(false);
          setIsViewModule(false);
          setIsEditLecturer(false);
          setIsEditModule(false);
          setIsEditAssessment(false);
          setIsConfirm(false);

          router.reload(window.location.pathname);
        }} >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-2xl bg-white pt-1 p-6 text-left align-middle shadow-xl transition-all">
 

                  <div className="flex items-center justify-end h-9 p-0 m-0">
                  <div
                    className="w-9 h-9 flex items-center justify-end xl:px-0"
                    onClick={() => {
                      setIsOpen(false);
                      setIsAddModule(false);      
                      setIsAddAssessment(false);
                      setIsAddLecturer(false);
                      setIsSignup(false);
                      setIsLogin(false);
                      setIsViewModule(false);
                      setIsEditLecturer(false);
                      setIsEditModule(false); 
                      setIsEditAssessment(false);                        
                      setIsConfirm(false);
                      router.reload(window.location.pathname)
                    }}
                  >
                    <XIcon className="h-[28px] text-[#333] cursor-pointer" />
                  </div>
                  </div>
                 {/* Add module modal content */}
                 {isAddModule && (
                  <AddModule />
                 )}

                  {/* Add module modal content */}
                  {isAddPrerequisite && (
                  <AddPrerequisite />
                 )}

                 {/* Edit module modal content */}
                 {isEditModule && (
                  <EditModule module={module} />
                 )}

                 {/* Add Assessment modal content */}
                 {isAddAssessment && (
                  <AddAssessment module={module}/>
                 )}
                 
                 {/* Edit Assessment modal content */}
                 {isEditAssessment && (
                    <EditAssessment assessment={assessment} assessmentId={assessmentId}/>
                 )}

                 {/* Add Lecturer Modal Content  */}
                 {isAddLecturer && (
                    <AddLecturer />
                 )}

                 {/* Edit Lecturer Modal Content  */}
                 {isEditLecturer && (
                    <EditLecturer lecturerId={lecturerId} lecturer={lecturer}/>
                 )}

                  {/* Signup Modal content */}
                 {isSignup && (
                    <Signup />  
                 )}

                  {/* Login Modal Content */}
                 {isLogin && (
                  <Login />
                 )}

                 {/* Confirm modal content */}
                 {isConfirm && (
                  <Confirmation />
                 )}

              
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
