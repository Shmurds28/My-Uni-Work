import React, { useState } from 'react';
import { db, storage } from "../firebase";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
  onSnapshot,
  query,
  setDoc
} from "@firebase/firestore";
import { useRecoilState } from 'recoil';
import { addLecturer, modalState } from '../atoms/modalAtom';

function AddLecturer() {
    const [title, setTitle] = useState("Mr");
    const [initials, setInitials] = useState("");
    const [firstName, setFirstName] = useState("");
    const [surname, setSurname] = useState("");
    const [email, setEmail] = useState("");
    const [telephone, setTelephone] = useState("");
    const [office, setOffice] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    const [staffNum, setStaffNum] = useState("");
    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useRecoilState(modalState);
    const [isAddLecturer, setIsAddLecturer] = useRecoilState(addLecturer);

    const postLecturer = async () => {
        if(loading) return;
        setLoading(true);
    
        await setDoc(doc(db, 'lecturers', staffNum), {
          title: title,
          initials: initials,
          firstName: firstName,
          surname: surname,
          email: email,
          telephone: telephone,
          office: office,
        });
    
        setLoading(false);
        setIsOpen(false);
        setIsAddLecturer(false);
        setTitle("Mr");
        setInitials("");
        setFirstName("");
        setSurname("");
        setEmail("");
        setTelephone("");
        setOffice("");
        setSelectedFile(null);
        
    }

  return (
    <div className="">
    <h1 className="text-xl font-bold flex items-center justify-center pb-8">Add Lecturer</h1>
     <div className="lg:grid lg:grid-cols-2 lg:gap-3">
         <div>
           <label className="block">
             <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-semibold text-slate-700">
               Title
             </span>
             <select value={title} onChange={(e) => setTitle(e.target.value)} name="title" id="title" className=" rounded-md mt-1 px-3 py-2 bg-white border w-full shadow-sm border-slate-300">
               <option value="Mr">Mr</option>
               <option value="Mrs">Mrs</option>
               <option value="Miss">Miss</option>
               <option value="Dr">Dr</option>
               <option value="Prof">Prof</option>
               {/* <option value="">other</option> */}
             </select>
          </label>
         </div>
         <div>
           <label className="block">
             <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-semibold text-slate-700">
               Initials
             </span>
             <input value={initials} onChange={(e) => setInitials(e.target.value)} type="text" name="initials" className=" rounded-md mt-1 w-full px-3 py-2 bg-white border shadow-sm border-slate-300" />
          </label>
         </div>

         <div>
          <label className="block">
             <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-semibold text-slate-700">
               First Name
             </span>
             <input value={firstName} onChange={(e) => setFirstName(e.target.value)} type="text" name="firstname" className=" rounded-md w-full mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300" />
          </label>
         </div>

         <div>
           <label className="block">
             <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-semibold text-slate-700">
               Surname
             </span>
             <input value={surname} onChange= {(e) => setSurname(e.target.value)}type="text" name="surname" className=" rounded-md mt-1 w-full px-3 py-2 bg-white border shadow-sm border-slate-300" />
          </label>
         </div>

         <div>
           <label className="block">
             <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-semibold text-slate-700">
               Staff Number
             </span>
             <input value={staffNum} onChange={(e) => setStaffNum(e.target.value)} type="text" name="staffNum" className=" rounded-md mt-1 w-full px-3 py-2 bg-white border shadow-sm border-slate-300" />
          </label>
         </div>

         <div>
           <label className="block">
             <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-semibold text-slate-700">
               Email
             </span>
             <input value={email} onChange= {(e) => setEmail(e.target.value)} type="email" name="email" className=" rounded-md mt-1 w-full px-3 py-2 bg-white border shadow-sm border-slate-300" />
          </label>
         </div>

         <div>
           <label className="block">
             <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-semibold text-slate-700">
               Telephone Number
             </span>
             <input value={telephone} onChange={(e) => setTelephone(e.target.value)} type="text" name="tel" className=" rounded-md mt-1 w-full px-3 py-2 bg-white border shadow-sm border-slate-300" />
          </label>
         </div>

         <div>
           <label className="block">
             <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-semibold text-slate-700">
               Office Number
             </span>
             <input value={office} onChange= {(e) => setOffice(e.target.value)} type="text" name="office" className=" rounded-md mt-1 w-full px-3 py-2 bg-white border shadow-sm border-slate-300" />
          </label>
         </div>
         
         <div>
           <label className="block">
             <span className=" block text-sm font-semibold text-slate-700">
               Staff photo
             </span>
             <input type="file" name="office" accept="image/*" className=" rounded-md mt-1 mb-1 w-full px-3 py-1 bg-white border shadow-sm border-slate-300" />
          </label>
         </div>
         
         <div></div>

         <div className="m-1 mt-4">
           <label className="block">
             <button className="bg-[#103A5C] w-full text-white font-semibold p-3 rounded-md hover:opacity-90
                 " onClick={postLecturer} >
                 Add Lecturer
             </button>   
          </label>
         </div>

         <div className="m-1 mt-4">
           <label className="block">
             <button className="bg-red-400 w-full text-white font-semibold p-3 rounded-md hover:opacity-90
                 " onClick={(e) =>{
                   setIsOpen(false);
                   setIsAddLecturer(false);
                 }} >
                 Cancel
             </button>   
          </label>
         </div>
     </div>
  </div>
  )
}

export default AddLecturer
