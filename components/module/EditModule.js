import { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { addAssessment, addLecturer, addModule, modalState } from '../../atoms/modalAtom'
import { db, storage } from "../../firebase";
import {Multiselect} from 'multiselect-react-dropdown';
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
import { Router, useRouter } from 'next/router';
import { MultiSelect } from 'react-multi-select-component';

function EditModule({module}) {
    const [moduleName, setModuleName] = useState(module?.moduleName);
    const [moduleCode, setModuleCode] = useState(module?.moduleCode);
    const [semester, setSemester] = useState(module?.semester);
    const [duration, setDuration] = useState(module?.duration);
    const [lecturer, setLecturer] = useState(module?.lecturer);
    const [credits, setCredits] = useState(module?.credits);
    const [prerequisites, setPrerequisites] = useState(module?.prerequisites);
    const [compulsory, setCompulsory] = useState(false);
    const [description, setDescription] = useState(module?.description);
    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useRecoilState(modalState);
    const [isAddModule, setIsAddModule] = useRecoilState(addModule);
    const [modules, setModules] = useState([]);
    const [lecturers, setLecturers] = useState([]);
    const [error, setError] = useState(null);
    const router = useRouter();

      //Get modules from the database
      useEffect(
        () => 
          onSnapshot(
            query(collection(db, 'modules')),
            (snapshot) =>{
              setModules(snapshot.docs);
              
            },
          ),
          [db]
      );
  
    //get lecturers from database
      useEffect(
        () => 
          onSnapshot(
            query(collection(db, 'lecturers')),
            (snapshot) =>{
              setLecturers(snapshot.docs);
            }
          ),
          [db]
      )

        //Update module to database
    const postModule = async () => {
        if(loading) return;
        setLoading(true);
  
        //check if there is any pre requisites
        var pre = [];
        prerequisites.map(prerequisite => {
          pre.push(prerequisite.value);
        });
  
        if(!description || !moduleName || !moduleCode ){
          setError("Missing required fields!");
          setLoading(false);
          return;
        }
    
        const docRef = await setDoc(doc(db, 'modules', moduleCode), {
            moduleCode: moduleCode,
            moduleName: moduleName,
            semester: semester,
            duration: duration,
            lecturer: lecturer,
            credits: credits,
            prerequisites: pre,
            description: description,
            compulsory: compulsory,
        }); 
    
        setLoading(false);
        setIsOpen(false);
        setIsAddModule(false);
        setModuleCode("");
        setModuleName("");
        setSemester("Semester 1");
        setDuration(0);
        setLecturer("")
        setCredits(-1);
        setDescription("");
        setPrerequisites(null);
        router.reload(window.location.pathname)
    };

    const options = () => {
        var moduleData = []; 
        modules.forEach((module => moduleData.push(module.data())));
  
        var data = [];
        for (var i = 0; i < moduleData.length; i++) {
          data.push(
            {label: moduleData[i].moduleCode+" - "+moduleData[i].moduleName, value:moduleData[i].moduleCode}
          );
        }
  
        return data;
      }

  return (
    <div className="">
    <h1 className="text-xl font-bold flex items-center justify-center pb-8">Edit Module - {module?.moduleCode}</h1>
     <div className="lg:grid lg:grid-cols-1 lg:gap-3">
        {error && (
                <div className="col-span-2 text-red-500 text-center rounded">
                  <span>{error}</span>
                </div>
        )}

          <span className="before:content-['*'] before:mx-1 before:ml-0.5 before:text-red-500 block text-xs font-xs text-slate-700 before:mb-6 mb-6">
                required fields
          </span>
          <div></div>
         <div>
           <label className="block">
             <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-semibold text-slate-700">
               Module Name
             </span>
             <input defaultValue={module?.moduleName} onChange= {(e) => setModuleName(e.target.value)}   type="text" name="moduleName" className=" rounded-md w-full mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300" />
          </label>
         </div>

         <div>
           <label className="block">
             <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-semibold text-slate-700">
               Module Code
             </span>
             <input disabled defaultValue={module?.moduleCode} onChange= {(e) => setModuleCode(e.target.value)} type="text" name="moduleCode" className=" rounded-md mt-1 w-full px-3 py-2 bg-white border shadow-sm border-slate-300" />
          </label>
         </div>

         <div>
           <label className="block">
             <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-semibold text-slate-700">
               Semester
             </span>
             <select defaultValue={module?.semester} onChange= {(e) => setSemester(e.target.value)} name="semester" id="semester" className=" rounded-md mt-1 px-3 py-2 bg-white border w-full shadow-sm border-slate-300">
               <option value="Semester 1">Semester 1</option>
               <option value="Semester 2">Semester 2</option>
               <option value="Year">Year</option>
             </select>
          </label>
         </div>

         <div>
           <label className="block">
             <span className=" block text-sm font-semibold text-slate-700">
               Module duration weeks
             </span>
             <input defaultValue={module?.duration} onChange= {(e) => setDuration(e.target.value)} type="number" name="duration" className=" rounded-md mt-1 w-full px-3 py-2 bg-white border shadow-sm border-slate-300" />
          </label>
         </div>


         <div>
           <label className="block">
             <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-semibold text-slate-700">
               Lecturer
             </span>
             <select defaultValue={module?.lecturer} onChange= {(e) => setLecturer(e.target.value)} name="lecturer" id="lecturer" className=" rounded-md mt-1 px-3 py-2 bg-white border w-full shadow-sm border-slate-300">
               <option value="">{module?.lecturer}</option>
               {lecturers.map(lecturer => (
                 <option value={lecturer.data().title+ " "+ lecturer.data().firstName+ " "+lecturer.data().surname}>{lecturer.data().initials} {lecturer.data().surname}</option>
               ))}
               <option value="Supervised">Supervised</option>
             </select>
          </label>
         </div>

         <div>
           <label className="block">
             <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-semibold text-slate-700">
               Credit Value
             </span>
             <input defaultValue={module?.credits} onChange= {(e) => setCredits(e.target.value)} type="number" name="moduleCode" className=" rounded-md mt-1 w-full px-3 py-2 bg-white border shadow-sm border-slate-300" />
          </label>
         </div>
        
         <div>
           <label className="block">
             <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-semibold text-slate-700">
               Prerequisites
             </span>
             <MultiSelect
                options={options}
                defaultValue={module?.prerequisites}
                onChange={setPrerequisites}
                labelledBy="Select"
              />
          </label>
         </div>

         <div></div>
         
         <div>
           <label className="block">
            <input type="checkbox" id="compulsory" name="compulsory" value={compulsory} onChange= {(e) => setCompulsory(e.target.checked)}  className="rounded-md mt-2 px-3 py-2 bg-white border shadow-sm border-slate-300"/>
            <label for="compulsory"> Compulsory Module</label>
             
          </label>
         </div>
       
         <div className="col-span-2">
           <label className="block">
             <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-semibold text-slate-700">
               Module Description
             </span>
             <textarea value={description} onChange= {(e) => setDescription(e.target.value)} className="rounded-md mt-1 w-full px-3 py-2 bg-white border shadow-sm border-slate-300" rows="5">

             </textarea>
          </label>
         </div>

         <div className="m-1">
           <label className="block">
             <button className="bg-[#103A5C] w-full text-white font-semibold p-3 rounded-md hover:opacity-90
                 " onClick={postModule}>
                 Update Module
             </button>   
          </label>
         </div>

         <div className="m-1">
           <label className="block">
             <button className="bg-[#F9FAFB] border border-gray-500 w-full text-black font-semibold p-3 rounded-md hover:opacity-90
                 " onClick={(e) =>{
                   setIsOpen(false);
                   setIsAddModule(false);
                   router.reload(window.location.pathname)
                 }} >
                 Cancel
             </button>   
          </label>
         </div>
     </div>
  </div>
  )
}

export default EditModule
