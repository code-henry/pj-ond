import { AuthenticatedApp } from './components/AuthenticatedApp';
import { UnauthenticatedApp } from './components/UnauthenticatedApp';
import { useState, useEffect, useRef } from 'react'
import { useAuth } from './hooks/useAuth';
import './App.css';
import { getAuth, signInAnonymously } from "firebase/auth";

function App() {
    const [userAgreed, setUserAgreed] = useState("");
    const userLogged = useRef(false)
    const auth = getAuth();
    signInAnonymously(auth)
        .then(() => {

        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage)
        });
    const { user } = useAuth();
    console.log(user)
    

    if (user.displayName && user.photoURL) {
        userLogged.current = true;
    }
    // }else{
    //     user.displayName=""
    //     user.photoURL=""
    // }

    return (
        <div className="container">
            <h1>💬チャット村💬</h1>
            {userAgreed || userLogged.current ? <AuthenticatedApp /> : <UnauthenticatedApp setUserAgreed={setUserAgreed} />}
        </div>
    );
}


export default App; 
