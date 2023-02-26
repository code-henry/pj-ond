import { initializeApp } from 'firebase/app';
import { useState, useEffect } from 'react'
import { GoogleAuthProvider, signInWithPopup, getAuth,updateProfile } from 'firebase/auth';
import {
    getFirestore,
    collection,
    addDoc,
    serverTimestamp,
    onSnapshot,
    query,
    orderBy,
    doc,
    getDoc,
    getDocs,
    setDoc
} from 'firebase/firestore';

import { chatRooms } from '../data/chatRooms';

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

        //.thenをつけると何故かエラーになる
        const { user } = await signInWithPopup(auth, provider)
            .catch((error) => {
                console.log(error.message);
            });

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
        await addDoc(collection(db, 'chat-rooms', roomId, 'messages')
            , {
                uid: user.uid,
                displayName: user.displayName,
                text: text.trim(),
                timestamp: serverTimestamp(),
            }
        );
    } catch (error) {
        console.error(error);
    }
}

// 部屋の作成と同時にfounderの表示名とURLも変えている
async function setChatRooms(user, value) {
    try {
        const roomRef = collection(db, "chat-rooms");
        const uuid = createUuid()
        await setDoc(doc(roomRef, uuid), {
            founderUid: user.uid,
            founderDisplayName: value.founderDisplayName,
            roomName: value.roomName,
            roomId: uuid,
            description: value.description,
            rules: value.rules
        });

        updateProfile(user,{
            displayName:value.founderDisplayName,
            photoURL: uuid
        }).then(()=>{
    
        }).catch((err)=>{
            console.log(err);
        })

        return uuid
    } catch (error) {
        console.error(error);
    }

}

async function GetDocumentsData() {
    let array = []
    const querySnapshot = await getDocs(collection(db, "chat-rooms"));
    querySnapshot.forEach(function (doc) {
        array.push({
            id: doc.id,
            title: doc.data().roomName
        })
    });
    for (var i = 0; i < array.length; i++) {
        chatRooms[i] = array[i]
    }
    return chatRooms



    // const docRef = doc(db, "cities", "SF");
    // const docSnap = await getDoc(docRef);

    // if (docSnap.exists()) {
    //     console.log("Document data:", docSnap.data());
    // } else {
    //     // doc.data() will be undefined in this case
    //     console.log("No such document!");
    // }
}

//uuidの作成関数
function createUuid() {

    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (a) {
        let r = (new Date().getTime() + Math.random() * 16) % 16 | 0, v = a === 'x' ? r : ((r & 0x3) | 0x8);
        return v.toString(16);
    });

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

export { loginWithGoogle, sendMessage, getMessages, setChatRooms, GetDocumentsData };
