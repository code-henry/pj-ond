import { initializeApp } from 'firebase/app';
import { useState, useEffect } from 'react'
import { GoogleAuthProvider, signInWithPopup, getAuth, updateProfile } from 'firebase/auth';
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

async function sendMessage(roomId, user, text, isAi) { 
    try {
        await addDoc(collection(db, 'ond', user.uid, 'member', roomId, "messages")
            , {
                uid: isAi? "ai":user.uid,
                text: text.trim(),
                timestamp: serverTimestamp(),
            }
        );
    } catch (error) {
        console.error(error);
    }
}

// 部屋の作成と同時にfounderの表示名とURLも変えている
async function setChatRooms(user) {
    try {
        const roomRef = collection(db, "ond")


        await setDoc(doc(roomRef, user.uid), {
            userId: user.uid,
        }).then(() => {

            const member = [
                { id: 'mayuko', name: 'まゆ子' },
                { id: 'kiriko', name: 'きり子' },
                { id: 'momoko', name: 'もも子' }, 
            ];

            for (let i = 0; i < member.length; i++) {

                const memberRef = doc(collection(doc(db, "ond", user.uid), "member"), member[i].id);

                setDoc(memberRef, {
                    name: member[i].name,
                    id: member[i].id
                })

            }
        })


    } catch (error) {
        console.error(error);
    }
}

async function GetDocumentsData(user) {

    let array = []
    const querySnapshot = await getDocs(collection(db, "ond", user.uid, "member"));
    querySnapshot.forEach(function (doc) {
        array.push({
            id: doc.data().id,
            name: doc.data().name,
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


function getMessages(roomId, callback, user) {
    return onSnapshot(
        query(
            collection(db, 'ond', user.uid, 'member', roomId, "messages"),
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
