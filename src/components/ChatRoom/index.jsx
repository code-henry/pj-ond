import { Link, useParams } from 'react-router-dom';
import { chatRooms } from '../../data/chatRooms';
import { MessageInput } from '../MessageInput';
import { MessageList } from '../MessageList';
import { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { GetDocumentsData } from '../../services/firebase';
import './styles.css';
import { updateProfile } from 'firebase/auth';

function ChatRoom() {
    
    const { user } = useAuth();
    const [nameEntered, setNameEntered] = useState(false);

    const [pending, setPending] = useState(true);

    const params = useParams();

    useEffect(() => {
        GetDocumentsData().then(() => {
            setPending(false)
        })
    }, [])

    if (pending) {
        return <>Loading...</>
    }
    const room = chatRooms.find((x) => x.id === params.id);

    if (!room) {
        // TODO: 404
        return (<h2>404 err</h2>)
    }

    

    return (
        <>
            {nameEntered||user.displayName ? <UserNameEntered /> : <UserNameBeforeEntered setNameEntered={setNameEntered} />}
        </>
    );
}

function UserNameEntered() {
    const params = useParams();
    const room = chatRooms.find((x) => x.id === params.id);
    return (
        <>
            <h2>{room.title}</h2>
            <div>
                <Link to="/">⬅️ Back to all rooms</Link>
            </div>
            <div className="messages-container">
                <MessageList roomId={room.id} />
                <MessageInput roomId={room.id} />
            </div>
        </>
    );
}


function UserNameBeforeEntered(props) {
    const { user } = useAuth();
    const [displayName, setDisplayName] = useState("");

    if (user.displayName) {
        props.setNameEntered(true);
    } else {

        const handleChange = (event) => {
            //ブラケット演算子を使っている
            setDisplayName(event.target.value);
        };

        const nameSubmit = (event) => {
            // setChatRooms(user,value)
            // setDisplayName({
            //     founderDisplayName: "",
            // });
            updateProfile(user,{
                displayName: displayName
            }).then(()=>{

            }).catch((err)=>{
                console.log(err);
            })
            props.setNameEntered(true);
            event.preventDefault();
        };

        return (
            <>
                <h2>Log in to join a chat room!</h2>
                {/* <div>
                <button onClick={permissionClear} className="login">
                    村に入る
                </button>
            </div> */}
                <form onSubmit={nameSubmit} className="">
                    <input
                        type="text"
                        name="founderDisplayName"
                        placeholder="あなたの表示名"
                        value={displayName}
                        onChange={handleChange}
                        className="message-input"
                        required
                        minLength={1}
                    />
                    <button type="submit" disabled={displayName < 1} className="send-message">
                        入る
                    </button>
                </form>
            </>
        );
    }
}

export { ChatRoom };
