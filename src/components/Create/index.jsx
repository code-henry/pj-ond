import { useState } from 'react'
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
// import { chatRooms } from '../../data/chatRooms';
import { updateProfile } from 'firebase/auth';
import { setChatRooms } from '../../services/firebase'
import './styles.css';

function Create() {
    const { user } = useAuth();
    const [value, setValue] = useState({
        displayName: ""
    });

    const handleChange = (event) => {
        //ブラケット演算子を使っている
        setValue({ ...value, [event.target.name]: event.target.value });
    };
 
    const navigation = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        updateProfile(user, {
            displayName: value.displayName,
        }).then(() => {
            navigation('/')
        }).catch((err) => {
            console.log(err);
        })


    };

    return (
        <>
            <h2>Change name</h2>
            <div>
                <Link to="/">⬅️ Back to all rooms</Link>
            </div>
            <form onSubmit={handleSubmit} className="">
                <input
                    type="text"
                    name="displayName"
                    placeholder="あなたの表示名"
                    value={value.displayName}
                    onChange={handleChange}
                    className="message-input"
                    required
                    minLength={1}
                />

                <button type="submit" disabled={value < 1} className="send-message">
                    名前を保存する
                </button>
            </form>
        </>
    );
}

export { Create };
