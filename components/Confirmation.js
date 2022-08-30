import React from 'react'
import { useRecoilState } from 'recoil';
import { confirm, confirmed, modalState } from '../atoms/modalAtom';
import {ExclamationTriangleIcon} from '@heroicons/react/solid';

function Confirmation({onClose}) {
    // const [isOpen, setIsOpen] = useRecoilState(modalState);
    // const [isConfirm, setIsConfirm] = useRecoilState(confirm);
    // const [isConfirmed, setIsConfirmed] = useRecoilState(confirmed);

    const handleClick = () => {
        setIsConfirmed(true);
        setIsOpen(false);
        setIsConfirm(false);
    }
    


  return (
    <div className='py-8 px-20 border bg-[#F9FAFB] rounded-md'>
    <h1 className='font-semibold text-2xl my-2 '>
        {/* <ExclamationTriangleIcon className="w-10 h-10 text-[#000]"/> */}
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="mx-2 w-8 h-8 inline">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 10.5v3.75m-9.303 3.376C1.83 19.126 2.914 21 4.645 21h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 4.88c-.866-1.501-3.032-1.501-3.898 0L2.697 17.626zM12 17.25h.007v.008H12v-.008z" />
        </svg>
        Warning!
    </h1>
    <p className="text-base m-8">This action cannot be undone. Are you sure you want to continue?</p>
    <button className="bg-[#F9B42A] border px-10 mr-4 text-white font-semibold p-3 rounded-md hover:opacity-90"
      onClick={() => {
        alert('Are you!');
      }}
    >
      Yes
    </button>
    <button className="bg-[#F9FAFB] px-10 border border-gray-500 mr-4 text-black font-semibold p-3 rounded-md hover:opacity-90"
     onClick={onClose}>
        No
    </button>
  
  </div>
  )
}

export default Confirmation
