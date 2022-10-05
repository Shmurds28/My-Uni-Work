import { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { addAssessment, modalState, isSnackBar, notificationMessage, isError } from '../../atoms/modalAtom'
import { db, storage } from "../../firebase";
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
import { Router, useRouter } from 'next/router';

function AddAssessment({module}) {
    const [moduleCode, setModuleCode] = useState("");
    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useRecoilState(modalState);
    const [isAddAssessment, setIsAddAssessment] = useRecoilState(addAssessment);
    const [modules, setModules] = useState([]);
    const [submissionWeek, setSubmissionWeek] = useState(1);
    const [weighting, setWeighting] = useState(0);
    const [assessmentType, setAssessmentType] = useState("Quizz");
    const [repeat, setRepeat] = useState("Once");
    const [error, setError] = useState(null);
    const [isSnackBarOpen, setIsSnackBarOpen] = useRecoilState(isSnackBar);
    const [isAnError, setIsAnError] = useRecoilState(isError);
    const [notMessage, setNotMessage] = useRecoilState(notificationMessage);
    const router = useRouter();
  
    //get modules from the database
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
        // e.preventDefault();
        if(loading) return;
        setLoading(true);
        setError(null);
         if(module){moduleCode = module.moduleCode}
        if(!moduleCode || !assessmentType || !weighting){
          setError("Missing required Fields");
          setLoading(false);
          return;
        }

        var semester = "";      
        var moduleName = "";
        var duration = 0;
        var color = "";
        await getDoc(doc(db, 'modules', moduleCode)).then(moduleDoc => {
          semester = moduleDoc.data().semester;
          moduleName = moduleDoc.data().moduleName;
          duration = moduleDoc.data().duration;
          color = moduleDoc.data().color;
        }); 
         
         
        //Repeat assessment addition weekly or every 2 weeks else add it once
        if(repeat == "Weekly"){
          for(var i = submissionWeek; i <  parseInt(duration); i++){
            await addDoc(collection(db, "modules", moduleCode, "assessments"), {
              moduleName: moduleName,
              type: assessmentType,
              repeat: repeat,
              submissionWeek: parseInt(i),
              weighting: Math.round(weighting / (Math.floor( ((duration - submissionWeek) + 1)))),
              semester: semester,
              color: color,
            });
          }
        }else if(repeat == "Every two weeks"){
          for(var j = submissionWeek; j < parseInt(duration); j = j + 2){
            await addDoc(collection(db, "modules", moduleCode, "assessments"), {
              moduleName: moduleName,
              type: assessmentType,
              repeat: repeat,
              submissionWeek: parseInt(j),
              weighting: Math.round(weighting / (Math.floor( ((duration - submissionWeek) + 1) / 2 ))),
              semester: semester,
              color: color,
            });
          }

        }else{
          await addDoc(collection(db, "modules", moduleCode, "assessments"), {
            moduleName: moduleName,
            type: assessmentType,
            repeat: repeat,
            submissionWeek: parseInt(submissionWeek),
            weighting: weighting,
            semester: semester,
            color: color,
          });
        }

        router.reload(window.location.pathname);
        setNotMessage("Assessment successfully added!");
        setIsAnError(false);
        setIsSnackBarOpen(true);
        setLoading(false);
        setIsOpen(false);
        setIsAddAssessment(false);
        setModuleCode("");
        setWeighting(0);
        setAssessmentType("");
        setSubmissionWeek("");
        
      }

  return (
    <div className="">
    <h1 className="text-xl font-bold flex items-center justify-center pb-8">Add Module Assessment</h1>
     <div className="lg:grid lg:grid-cols-2 lg:gap-3">
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
               Module
             </span>
             
             {module && (
                  <select defaultValue={module.moduleCode} disabled name="moduleCode" id="moduleCode" className=" rounded-md mt-1 px-3 py-2 bg-white border w-full shadow-sm border-slate-300">
                    <option value={module.moduleCode}> {module.moduleCode} - {module.moduleName}</option>
                  </select>
              )}
             {!module && (
               <select value={moduleCode} onChange= {(e) => setModuleCode(e.target.value)} name="moduleCode" id="moduleCode" className=" rounded-md mt-1 px-3 py-2 bg-white border w-full shadow-sm border-slate-300">
                  <option value=""> </option>
                  {modules.map(mod => (
                  <option key={mod.id} value={mod.data().moduleCode}> {mod.data().moduleCode} - {mod.data().moduleName}</option>
               ))}
               </select>
             
             )}
             
             
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
               <option value="Quizz">Quiz</option>
               <option value="Tutorial">Tutorial</option>
               <option value="Class test">Class test</option>
               <option value="Tutorial">Semester test</option>
               <option value="Practical">Practical</option>
               <option value="Assignment">Assignment</option>
               <option value="Tutorial Test">Tutorial test</option>
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
             <button className="bg-[#F9FAFB] border border-gray-500 w-full text-black font-semibold p-3 rounded-md hover:opacity-90
                 " onClick={(e) =>{
                   setIsOpen(false);
                   setIsAddAssessment(false);
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

export default AddAssessment
