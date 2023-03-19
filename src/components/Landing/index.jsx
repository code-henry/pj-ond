import { Link } from 'react-router-dom';
import { chatRooms } from '../../data/chatRooms';
import './styles.css';
import { GetDocumentsData } from '../../services/firebase';
import { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';

function Landing() {
    const { user } = useAuth();
    const [pending, setPending] = useState(true);
    useEffect(() => {
        GetDocumentsData(user).then(() => {
            setPending(false)
        })
    }, [])

    if (pending) {
        return <>Loading...</>
    }

    return (
        <>
            <h2>Choose</h2>
            <ul className="chat-room-list">
                <li>
                    <Link to={`/create`}>⚙️名前を変更する</Link>
                </li>
                {chatRooms.map((room) => (
                    <li key={room.id}>
                        <Link to={`/room/${room.id}`}>{room.name}</Link>
                    </li>
                ))}
            </ul>
        </>
    );
}

export { Landing };
