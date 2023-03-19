import {useEffect, useState} from 'react';
import { getMessages } from '../services/firebase';
import { useAuth } from './useAuth';

function useMessages(roomId) {
    const [messages, setMessages] = useState([]);

    const { user } = useAuth()

    useEffect(() => {
        const unsubscribe = getMessages(roomId, setMessages, user);

        return unsubscribe;
    }, [roomId]);

    return messages;
}

export { useMessages }; 
