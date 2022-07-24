import {createContext, useContext, useEffect, useState} from 'react';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    getAuth
} from 'firebase/auth';
import auth from '../firebase';

const userAuthContext = createContext();


export function UserAuthContextProvider({children}){
    const [user, setUser] = useState(null);
    const auth = getAuth();

    function signUp(email, password, isAdmin){
        return createUserWithEmailAndPassword(auth, email, password);
        // .then((userCredential) => {
        //     // Signed in 
        //     const user = userCredential.user;
        //     console.log(user);
        //     // ...
        // })
        // .catch((error) => {
        //     console.log(error);
        //     const errorCode = error.code;
        //     const errorMessage = error.message;
        //     // ..
        // }); 
    }

    function signIn(email, password){
        return signInWithEmailAndPassword(auth, email, password);
        // .then((userCredential) => {
        //     // Signed in 
        //     const user = userCredential.user;
        //     console.log(user);
        //     console.log("Done")
        //     // ...
        // })
        // .catch((error) => {
        //     const errorCode = error.code;
        //     const errorMessage = error.message;
        // });
    }

    function SignOut(){
        signOut(auth).then(() => {
        // Sign-out successful.
        console.log("Sign-out successful");
        setUser(null);

        }).catch((error) => {
        // An error happened.
        });
    }

    useEffect(
        () => {
          const unsubscribe = onAuthStateChanged(auth, (currentUser) =>{
                setUser(currentUser);
           });
           return () =>{
            unsubscribe();
           }
        },
        []
    );

    return <userAuthContext.Provider value={{user, signUp, signIn, SignOut, setUser}}>{children}</userAuthContext.Provider>
}

export function useUserAuth() {
    return useContext(userAuthContext);
}
