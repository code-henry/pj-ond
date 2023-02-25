import { AuthenticatedApp } from './components/AuthenticatedApp';
import { UnauthenticatedApp } from './components/UnauthenticatedApp';
import { useState } from 'react'
import { useAuth } from './hooks/useAuth';
import './App.css';
import { getAuth, signInAnonymously } from "firebase/auth";

function App() {
    const [userAgreed, setUserAgreed] = useState("")
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
    return (
        <div className="container">
            <h1>💬チャット村💬</h1>
            {userAgreed ? <AuthenticatedApp /> : <UnauthenticatedApp setUserAgreed={setUserAgreed} />}
        </div>
    );
}


export default App; 
