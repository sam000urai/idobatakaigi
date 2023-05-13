import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { sendMessageForFirebase, db, collection, onSnapshot } from '../plugins/firebase';
import { Link, useParams } from 'react-router-dom';
import { selectUser } from '../features/userSlice';
import { useAppSelector } from '../hooks/useRTK';

const Chat = ({ }) => {
    const [text, setText] = useState('');
    const [messages, setMessages] = useState([]); // messagesをstateとして追加
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

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, "messages"), (querySnapshot) => {
            const messages = [];
            querySnapshot.forEach((doc) => {
                messages.push({ id: doc.id, ...doc.data() });
            });
            setMessages(messages);
            console.log(messages);
        });
        return unsubscribe;
    }, []);


    return (
        <div>
            <Layout>
                <h1>Room名： {roomId}</h1>

                {messages.map((message) => (
                    <li key={message.id}>
                        {message.user}: {message.message}
                    </li>
                ))}

                <textarea value={text} onChange={(e) => setText(e.target.value)} />
                <button onClick={sendMessage}>Send</button>
                <Link to='/' >ROOM一覧に戻る</Link>

            </Layout>
        </div>
    );
};

export default Chat;