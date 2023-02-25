import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Landing } from '../Landing';
import { ChatRoom } from '../ChatRoom';
import {Create} from '../Create'
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function AuthenticatedApp() {
    
    const { user } = useAuth();
    const navigation = useNavigate()

    useEffect(() => {
        if (user.displayName && user.photoURL) {

            navigation(`/room/${user.photoURL}`)

        }
    }, [navigation])

    return (
        // <BrowserRouter>
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/*" element={<h2>root以下のそれないです404</h2>} />
                <Route path="/create" element={<Create />} />
                <Route path="/room/:id" element={<ChatRoom />} />
            </Routes>
        // </BrowserRouter>
    );
}

export { AuthenticatedApp };
