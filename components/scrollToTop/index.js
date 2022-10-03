import React, {useState, useEffect} from 'react'
import {useWindowScroll} from 'react-use';
import {ChevronUpIcon} from '@heroicons/react/solid';

function ScrollToTop() {
 const {y: pageYOffset} = useWindowScroll();
 const [visible, setVisibility] = useState(false);

 useEffect(() => {
    if(pageYOffset > 200){
        setVisibility(true);
    }else{
        setVisibility(false);
    }
 },[pageYOffset]);

 if(!visible){
    return false;
 }

 const scrollToTop = () => {
    window.scrollTo({top: 0, behavior: "smooth"})
 }

  return (
    <div className='bg-[#103A5C] fixed bottom-8 rounded-full right-12 scroll-to-top cursor-pointer text-center' onClick={scrollToTop}>
       <ChevronUpIcon className="icon w-9 h-9 text-[#fff] font-semibold text-base"/>
    </div>
  )
}

export default ScrollToTop
