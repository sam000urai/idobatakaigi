import React from 'react'
import Layout from '../components/Layout';
import { useState } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import { firestore } from '../firebase';


const Chat = ({ roomId }) => {
    const [text, setText] = useState('');

    const sendMessage = () => {
        if (text.trim() === '') {
            return;
        }

        firestore.collection('messages').add({
            text,
            roomId,
            createdAt: firestore.FieldValue.serverTimestamp(),
        });

        setText('');
    };

    return (
        <div>
            <h1>Room {roomId}</h1>
            <textarea value={text} onChange={(e) => setText(e.target.value)} />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
};

export default Chat;
