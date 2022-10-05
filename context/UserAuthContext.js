import {createContext, useContext, useEffect, useState} from 'react';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    getAuth,
} from 'firebase/auth';
import auth, { db } from '../firebase';
import { doc, onSnapshot, query } from 'firebase/firestore';
import { useRouter } from 'next/router';

const userAuthContext = createContext();


export function UserAuthContextProvider({children}){
    const [user, setUser] = useState(null);
    const [userInfo, setUserInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const auth = getAuth();
    const router = useRouter();

    function signUp(email, password, isAdmin){
        return createUserWithEmailAndPassword(auth, email, password);
    }

    function signIn(email, password){
            return signInWithEmailAndPassword(auth, email, password);
        
    }

    function SignOut(){
        signOut(auth).then(() => {
        // Sign-out successful.
        console.log("Sign-out successful");
        setUser(null);
        setUserInfo(null);
        

        }).catch((error) => {
        // An error happened.
           console.log(error);
        });
    }

    useEffect(
        () => {
          const unsubscribe = onAuthStateChanged(auth, async (currentUser) =>{
                setUser(currentUser);
                setLoading(false);
           });
           return unsubscribe();
        },
        []
    );

    return <userAuthContext.Provider value={{user, userInfo, signUp, signIn, SignOut, setUser, setUserInfo}}>{!loading && children}</userAuthContext.Provider>
}

export function useUserAuth() {
    return useContext(userAuthContext);
}
