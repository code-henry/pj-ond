import { initializeApp } from 'firebase/app';
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import {
    getFirestore,
    collection,
    addDoc,
    serverTimestamp,
    onSnapshot,
    query,
    orderBy,
} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyC7wxBdduf-8dfBtue9kx9Ri5R0mHPZpMw",
    authDomain: "react-todo-d6012.firebaseapp.com",
    projectId: "react-todo-d6012",
    storageBucket: "react-todo-d6012.appspot.com",
    messagingSenderId: "71121929887",
    appId: "1:71121929887:web:4e3e875c72d2c3e4ed44aa",
    measurementId: "G-3TGN6JL8M9"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function loginWithGoogle() {
    try {
        const provider = new GoogleAuthProvider();
        const auth = getAuth();

        const { user } = await signInWithPopup(auth, provider);

        return { uid: user.uid, displayName: user.displayName };
    } catch (error) {
        if (error.code !== 'auth/cancelled-popup-request') {
            console.error(error);
        }
        return null;
    }
}

async function sendMessage(roomId, user, text) {
    try {
        await addDoc(collection(db, 'chat-rooms', roomId, 'messages'), {
            uid: user.uid,
            displayName: user.displayName,
            text: text.trim(),
            timestamp: serverTimestamp(),
        });
    } catch (error) {
        console.error(error);
    }
}

function getMessages(roomId, callback) {
    return onSnapshot(
        query(
            collection(db, 'chat-rooms', roomId, 'messages'),
            orderBy('timestamp', 'asc')
        ),
        (querySnapshot) => {
            const messages = querySnapshot.docs.map((x) => ({
                id: x.id,
                ...x.data(),
            }));

            callback(messages);
        }
    );
}

export { loginWithGoogle, sendMessage, getMessages };
