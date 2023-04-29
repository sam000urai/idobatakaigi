import React from 'react';
import Layout from '../components/Layout';
import { useState } from 'react';
import { sendMessageForFirebase, auth } from '../plugins/firebase';
import { useParams } from 'react-router-dom';
import { selectUser } from '../features/userSlice';
import { useAppSelector } from '../hooks/useRTK';

const Chat = ({ }) => {
    const [text, setText] = useState('');
    let { roomId } = useParams();
    const user = useAppSelector(selectUser);
    console.log(user)
    const sendMessage = () => {
        if (text.trim() === '') {
            return;
        }

        sendMessageForFirebase(text, user.uid, roomId);
        setText('');
    };

    return (
        <div>
            <Layout>
                <h1>Room {roomId}</h1>
                <textarea value={text} onChange={(e) => setText(e.target.value)} />
                <button onClick={sendMessage}>Send</button>
            </Layout>
        </div>
    );
};

export default Chat;