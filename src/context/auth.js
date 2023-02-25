
import { createContext, useState, useContext, useEffect } from 'react';
import { getAuth } from 'firebase/auth';

export const AuthContext = createContext();

export function useAuthContext() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [user, setUser] = useState('');
    const [pending, setPending] = useState(true);

    const value = {
        user,
    };

    useEffect(() => {
        const unsubscribed = getAuth().onAuthStateChanged((user) => {
            setUser(user);
            setPending(false)
        });

        return () => {
            unsubscribed(); 
        };
    }, []);

    //loading設定
    if (pending) {
        return <>Loading...</>
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// const AuthProvider = (props) => {
//     const [user, setUser] = useState("");

//     const login = async () => {
//         const user = await loginWithGoogle();
//         if (!user) {
//             // TODO: Handle failed login
//         }

//         setUser(user);
//     };

//     const value = { user, login };

//     return <AuthContext.Provider value={value} {...props} />;
// };

// export { AuthContext, AuthProvider };
