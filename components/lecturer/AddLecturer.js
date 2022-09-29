const defaultImageUrl = "https://firebasestorage.googleapis.com/v0/b/myuniwork-b6880.appspot.com/o/lecturers%2Fdefault.png?alt=media&token=0964f992-c91c-4b10-9122-62240a88abef";
import React, { useState } from 'react';
import { db, storage } from "../../firebase";
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
import { addLecturer, isError, isSnackBar, modalState, notificationMessage } from '../../atoms/modalAtom';
import {defaultImage} from '../../public/default.png' 
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import { Router, useRouter } from 'next/router';

function AddLecturer() {
    const [title, setTitle] = useState("Mr");
    const [initials, setInitials] = useState(null);
    const [firstName, setFirstName] = useState(null);
    const [surname, setSurname] = useState(null);
    const [email, setEmail] = useState(null);
    const [telephone, setTelephone] = useState(null);
    const [office, setOffice] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [staffNum, setStaffNum] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useRecoilState(modalState);
    const [isAddLecturer, setIsAddLecturer] = useRecoilState(addLecturer);
    const [isSnackBarOpen, setIsSnackBarOpen] = useRecoilState(isSnackBar);
    const [isAnError, setIsAnError] = useRecoilState(isError);
    const [notMessage, setNotMessage] = useRecoilState(notificationMessage);
    const [error, setError] = useState(null);
    const router = useRouter();

    //add image to selected once the image has been selected
    const addImage = (e) => {
      const reader = new FileReader();
      if(e.target.files[0]){
        reader.readAsDataURL(e.target.files[0]);
      }

      reader.onload = (readerEvent) =>{
        setSelectedFile(readerEvent.target.result);
      }
    }

    //Add lecturer to the database
    const postLecturer = async () => {
        if(loading) return;
        setLoading(true);
        setError(null);

        //check if the required fields are present
        if(!title || !initials || !firstName || !surname || !email){
          setLoading(false);
          setError("Missing required fields");
          return;
        }    
        var mailformat = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        if(!email.match(mailformat))
        {
          setError("Invalid email address.");
          setLoading(false); 
          return;
        }
        
        var regEx = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
        if(!telephone.match(regEx))
        {
          setError("Invalid telephone number.");
          setLoading(false);
          return;
        }
        //add the lecturer to the database - staff number as the identifier
        const docRef = await setDoc(doc(db, 'lecturers', staffNum), {
          title: title,
          initials: initials,
          firstName: firstName,
          surname: surname,
          email: email,
          telephone: telephone,
          office: office,
        });

        //storage image reference
        const imageRef = ref(storage, `lecturers/${staffNum}/image`);

        if(selectedFile){
          //upload image to storage if selected
          await uploadString(imageRef, selectedFile, 'data_url').then(async () => {
            const downloadUrl = await getDownloadURL(imageRef);

            //update lecturer document to have image field
            await updateDoc(doc(db, "lecturers", staffNum), {
              image: downloadUrl,
            });
          });
        }else{
          //if no file selected update lecturer document to have default image field
          await updateDoc(doc(db, 'lecturers', staffNum), {
            image: defaultImageUrl,
        });
        }
        setIsOpen(false);
        router.reload(window.location.pathname);
        setNotMessage("Lecturer successfully added!");
        setIsAnError(false);
        setIsSnackBarOpen(true);
        setLoading(false);
        
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
    {error && (
                <div className="col-span-2 text-red-500 text-center rounded">
                  <span>{error}</span>
                </div>
        )}
        <span className="before:content-['*'] before:mx-1 before:ml-0.5 before:text-red-500 block text-xs font-xs text-slate-700 before:mb-6 mb-6">
          required fields
        </span>
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
             <input onChange={addImage} type="file" name="office" accept="image/*" className=" rounded-md mt-1 mb-1 w-full px-3 py-1 bg-white border shadow-sm border-slate-300" />
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

export default AddLecturer
