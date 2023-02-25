import { Link, useParams } from 'react-router-dom';
import { chatRooms } from '../../data/chatRooms';
import { MessageInput } from '../MessageInput';
import { MessageList } from '../MessageList';
import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import './styles.css';

function ChatRoom() {
    const [nameEntered, setNameEntered] = useState(false)
    const params = useParams();
    const room = chatRooms.find((x) => x.id === params.id);
    if (!room) {
        // TODO: 404
        return (<h2>404 err</h2>)
    }

    return (
        <>
            {nameEntered ? <UserNameEntered /> : <UserNameBeforeEntered setNameEntered={setNameEntered} />}





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

    const handleChange = (event) => {
        //ブラケット演算子を使っている
        setDisplayName(event.target.value);
    };

    const nameSubmit = (event) => {
        // setChatRooms(user,value)
        // setDisplayName({
        //     founderDisplayName: "",
        // });
        user.displayName = displayName;
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

export { ChatRoom };
