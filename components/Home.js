import React from 'react'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import img from '../../logosamples/1.JPG' 
import welcomeImg from "../public/welcome.png";

function Home() {
  return (
    <div>
        <div className="h-screen py-0 px-0 mx-0 my-0">
            {/* <img src={welcomeImg} alt="" className="h-full w-full"/> */}
            <Image src={welcomeImg} layout="fill" objectFit='contain' className="my-0 mx-0 py-0 px-0"/>
        </div>

        {/* Middle section */}
        {/* <div className="">
            <img src={welcomeImg} alt=""/>
        </div> */}

        {/* Most chosen modules section */}
        {/* </main> */} 
    </div>
  )
}

export default Home
