import { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { addAssessment, modalState } from '../atoms/modalAtom'
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
  getDoc
} from "@firebase/firestore";
import { Router } from 'next/router';

function AddAssessment() {
    const [moduleCode, setModuleCode] = useState("");
    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useRecoilState(modalState);
    const [isAddAssessment, setIsAddAssessment] = useRecoilState(addAssessment);
    const [modules, setModules] = useState([]);
    const [submissionWeek, setSubmissionWeek] = useState(1);
    const [weighting, setWeighting] = useState(0);
    const [assessmentType, setAssessmentType] = useState("Quizz");
    const [repeat, setRepeat] = useState("");
  
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

    const postAssessment = async (e) =>{
        e.preventDefault();
    
        if(loading) return;
        setLoading(true);
        var semester = "";
        var moduleName = "";
        var duration = 0;
        await getDoc(doc(db, 'modules', moduleCode)).then(moduleDoc => {
          semester = moduleDoc.data().semester;
          moduleName = moduleDoc.data().moduleName;
          duration = moduleDoc.data().duration;
        });

        if(repeat == "Weekly"){
          for(var i = submissionWeek; i < duration; i++){
            await addDoc(collection(db, "modules", moduleCode, "assessments"), {
              moduleName: moduleName,
              type: assessmentType,
              repeat: repeat,
              submissionWeek: i,
              weighting: weighting,
              semester: semester,
            });
          }
        }else if(repeat == "Every two weeks"){
          for(var i = submissionWeek; i < duration; i += 2){
            await addDoc(collection(db, "modules", moduleCode, "assessments"), {
              moduleName: moduleName,
              type: assessmentType,
              repeat: repeat,
              submissionWeek: i,
              weighting: weighting,
              semester: semester,
            });
          }

        }else{
          await addDoc(collection(db, "modules", moduleCode, "assessments"), {
            moduleName: moduleName,
            type: assessmentType,
            repeat: repeat,
            submissionWeek: submissionWeek,
            weighting: weighting,
            semester: semester,
          });
        }

        setLoading(false);
        setIsOpen(false);
        setIsAddAssessment(false);
        setModuleCode("");
        setWeighting(0);
        setAssessmentType("");
        setSubmissionWeek("");
        Router.reload(window.location.pathname)
      }

  return (
    <div className="">
    <h1 className="text-xl font-bold flex items-center justify-center pb-8">Add Module Assessment</h1>
     <div className="lg:grid lg:grid-cols-2 lg:gap-3">
         <div>
           <label className="block">
             <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-semibold text-slate-700">
               Module Code
             </span>
             <select value={moduleCode} onChange= {(e) => setModuleCode(e.target.value)} name="moduleCode" id="moduleCode" className=" rounded-md mt-1 px-3 py-2 bg-white border w-full shadow-sm border-slate-300">
               <option value=""> </option>
               {modules.map(module => (
                 <option value={module.data().moduleCode}>{module.data().moduleCode}</option>
               ))}
             </select>
          </label>
         </div>

         <div>
           <label className="block">
             <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-semibold text-slate-700">
               Submission Week
             </span>
             <input value={submissionWeek} onChange= {(e) => setSubmissionWeek(e.target.value)} type="number" name="submissionWeek" className=" rounded-md mt-1 w-full px-3 py-2 bg-white border shadow-sm border-slate-300" />
          </label>
         </div>

         <div>
           <label className="block">
             <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-semibold text-slate-700">
               Weighting (%)
             </span>
             <input value={weighting} onChange= {(e) => setWeighting(e.target.value)} type="number" name="Weighting" className=" rounded-md mt-1 w-full px-3 py-2 bg-white border shadow-sm border-slate-300" />
          </label>
         </div>

         <div>
           <label className="block">
             <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-semibold text-slate-700">
               Assessment Type
             </span>
             <select value={assessmentType} onChange= {(e) => setAssessmentType(e.target.value)} name="type" id="type" className=" rounded-md mt-1 px-3 py-2 bg-white border w-full shadow-sm border-slate-300">
               <option value="Quizz">Quizz</option>
               <option value="Tutorial">Tutorial</option>
               <option value="Practical">Practical</option>
               <option value="Assignment">Assignment</option>
             </select>
          </label>
         </div>

         <div>
           <label className="block">
             <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-semibold text-slate-700">
               Repeat assessment
             </span>
             <select value={repeat} onChange= {(e) => setRepeat(e.target.value)} name="repeat" id="repeat" className=" rounded-md mt-1 px-3 py-2 bg-white border w-full shadow-sm border-slate-300">
               <option value="Once">Once</option>
               <option value="Weekly">Weekly</option>
               <option value="Every two weeks">Every two weeks</option>
             </select>
          </label>
         </div>

         <div></div>

         <div className="m-1">
           <label className="block">
             <button className="bg-[#103A5C] w-full text-white font-semibold p-3 rounded-md hover:opacity-90
                 " onClick={postAssessment} >
                 Add Module Assessment
             </button>   
          </label>
         </div>

         <div className="m-1">
           <label className="block">
             <button className="bg-red-400 w-full text-white font-semibold p-3 rounded-md hover:opacity-90
                 " onClick={(e) =>{
                   setIsOpen(false);
                   setIsAddModule(false);
                   Router.reload(window.location.pathname);
                 }} >
                 Cancel
             </button>   
          </label>
         </div>
     </div>
    </div>
  )
}

export default AddAssessment
