import React, { useEffect, useState } from 'react';
import { db, storage } from "../firebase";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
  onSnapshot,
  query,
  setDoc,
  getDoc,
} from "@firebase/firestore";
import { useRecoilState } from 'recoil';
import { addLecturer, modalState } from '../atoms/modalAtom';
import {defaultImage} from '../public/default.png' 
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import { Router, useRouter } from 'next/router';

export const EditLecturer = ({lecturer, lecturerId}) => {
    const [title, setTitle] = useState("");
    var [initials, setInitials] = useState("");
    var [firstName, setFirstName] = useState("");
    const [surname, setSurname] = useState("");
    const [email, setEmail] = useState("");
    const [telephone, setTelephone] = useState("");
    const [office, setOffice] = useState("");
    const [selectedFile, setSelectedFile] = useState("");
    const [staffNum, setStaffNum] = useState("");
    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useRecoilState(modalState);
    const [isAddLecturer, setIsAddLecturer] = useRecoilState(addLecturer);
    const [error, setError] = useState(null);
    const router = useRouter();
    const [defaultImage, setDefaultImage] = useState(null);

    useEffect(() => {
      if(!lecturer) return;
     
      setStaffNum(lecturerId);
      setInitials(lecturer.initials);
      setTitle(lecturer.title);
      setFirstName(lecturer.firstName);
      setSurname(lecturer.surname);
      setEmail(lecturer.email);
      setTelephone(lecturer.telephone);
      setOffice(lecturer.office);
      setDefaultImage(lecturer.image);

    });

    const addImage = (e) => {
      const reader = new FileReader();
      if(e.target.files[0]){
        reader.readAsDataURL(e.target.files[0]);
      }

      reader.onload = (readerEvent) =>{
        setSelectedFile(readerEvent.target.result);
      }
    }

    const postLecturer = async () => {

        if(loading) return;
        setLoading(true);
        setError(null);

        if(!title || !initials || !firstName || !surname || !email){
          setLoading(false);
          setError("Missing required fields");
          return;
        }
    
        const docRef = await setDoc(doc(db, 'lecturers', staffNum), {
          title: title,
          initials: initials,
          firstName: firstName,
          surname: surname,
          email: email,
          telephone: telephone,
          office: office,
        });

        const imageRef = ref(storage, `lecturers/${staffNum}/image`);

        if(selectedFile){
          await uploadString(imageRef, selectedFile, 'data_url').then(async () => {
            const downloadUrl = await getDownloadURL(imageRef);

            await updateDoc(doc(db, "lecturers", staffNum), {
              image: downloadUrl,
            });
          });
        }else{
          await updateDoc(doc(db, 'lecturers', staffNum), {
            image: defaultImage,
        });
        }
    
        router.reload(window.location.pathname);
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
    <h1 className="text-xl font-bold flex items-center justify-center pb-8">Edit Lecturer</h1>
     <div className="lg:grid lg:grid-cols-2 lg:gap-3">
     {error && (
                <div className="col-span-2 text-red-500 text-center rounded">
                  <span>{error}</span>
                </div>
        )}
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
             <input disabled value={staffNum} onChange={(e) => setStaffNum(e.target.value)} type="text" name="staffNum" className=" rounded-md mt-1 w-full px-3 py-2 bg-[#F9FAFB] border shadow-sm border-slate-300" />
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
             <input onChange={addImage} type="file" name="office" accept="image/*" className=" rounded-md mt-1 mb-1 w-full px-3 py-1 bg-white border shadow-sm border-slate-300" />
          </label>
         </div>
         
         <div></div>

         <div className="m-1 mt-4">
           <label className="block">
             <button className="bg-[#103A5C] w-full text-white font-semibold p-3 rounded-md hover:opacity-90
                 " onClick={postLecturer} >
                 Update
             </button>   
          </label>
         </div>

         <div className="m-1 mt-4">
           <label className="block">
             <button className="bg-[#F9FAFB] border border-gray-500 w-full text-black font-semibold p-3 rounded-md hover:opacity-90
                 " onClick={(e) =>{
                   setIsOpen(false);
                   setIsAddLecturer(false);
                   router.reload(window.location.pathname);
                 }} >
                 Cancel
             </button>   
          </label>
         </div>
     </div>
  </div>
  )
}
