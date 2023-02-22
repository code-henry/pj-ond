import { useState } from 'react'
import { useAuth } from '../../hooks/useAuth';
import { Link } from 'react-router-dom';
// import { chatRooms } from '../../data/chatRooms';
import { setChatRooms } from '../../services/firebase'
import './styles.css';

function Create() {
    const { user } = useAuth();
    const [value, setValue] = useState({
        founderDisplayName: "",
        roomName:"",
        description:"",
        rules:""
    });

    const handleChange = (event) => {
        //ブラケット演算子を使っている
        setValue({ ...value, [event.target.name]: event.target.value });
    };

    const handleSubmit = (event) => {
        setChatRooms(user,value)
        setValue({
            founderDisplayName: "",
            roomName:"",
            description:"",
            rules:""
        });
        event.preventDefault();
    };

    return (
        <>
            <h2>Create new room</h2>
            <div>
                <Link to="/">⬅️ Back to all rooms</Link>
            </div>
            <form onSubmit={handleSubmit} className="">
                <input
                    type="text"
                    name="founderDisplayName"
                    placeholder="あなた表示名"
                    value={value.founderDisplayName}
                    onChange={handleChange}
                    className="message-input"
                    required
                    minLength={1}
                />
                <input
                    type="text"
                    name="roomName"
                    placeholder="部屋の名前"
                    value={value.roomName}
                    onChange={handleChange}
                    className="message-input"
                    required
                    minLength={1}
                />
                <input
                    type="text"
                    name="description"
                    placeholder="説明"
                    value={value.description}
                    onChange={handleChange}
                    className="message-input"
                    required
                    minLength={1}
                />
                <input
                    type="text"
                    name="rules"
                    placeholder="ルール"
                    value={value.rules}
                    onChange={handleChange}
                    className="message-input"
                    required
                    minLength={1}
                />
                <button type="submit" disabled={value < 1} className="send-message">
                    部屋を作成する
                </button>
            </form>
        </>
    );
}

export { Create };
