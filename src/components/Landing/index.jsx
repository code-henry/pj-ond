import { Link } from 'react-router-dom';
import { chatRooms } from '../../data/chatRooms';
import './styles.css';
import { GetDocumentsData } from '../../services/firebase';
import { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

function Landing() {
    const { user } = useAuth();
    const navigation = useNavigate()

    //仮の状態routingで遷移させたいね
    useEffect(() => {
        if (user.displayName && user.photoURL) {

            navigation(`/room/${user.photoURL}`)

        }
    }, [navigation])

    const [pending, setPending] = useState(true);
    useEffect(() => {
        GetDocumentsData().then(() => {
            setPending(false)
        })
    }, [])

    if (pending) {
        return <>Loading...</>
    }

    return (
        <>
            <h2>Choose a Chat Room</h2>
            <ul className="chat-room-list">
                <li>
                    <Link to={`/create`}>＋</Link>
                </li>
                {chatRooms.map((room) => (
                    <li key={room.id}>
                        <Link to={`/room/${room.id}`}>{room.title}</Link>
                    </li>
                ))}
            </ul>
        </>
    );
}

export { Landing };
