import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import ChatCard from '../components/ChatCard';
import { sendMessageForFirebase, db, getUsernameByUID } from '../plugins/firebase';
import { Link, useParams } from 'react-router-dom';
import { selectUser } from '../features/userSlice';
import { useAppSelector } from '../hooks/useRTK';
import { collection, onSnapshot, query, orderBy, limit, doc } from 'firebase/firestore';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

const Chat = () => {
    const [text, setText] = useState('');
    const [messages, setMessages] = useState([]);
    const [roomName, setRoomName] = useState('');
    let { roomId } = useParams();
    const user = useAppSelector(selectUser);

    const sendMessage = () => {
        if (text.trim() === '') {
            return;
        }
        sendMessageForFirebase(text, user.displayName, user.uid, roomId);
        setText('');
    };

    useEffect(() => {
        const unsubscribeMessages = onSnapshot(
            query(collection(db, 'messages', roomId, 'message'), orderBy('createdAt', 'asc')),
            (querySnapshot) => {
                const tempmessage = [];
                querySnapshot.forEach((doc) => {
                    const username = getUsernameByUID(user.uid);
                    console.log(username);
                    tempmessage.push(doc.data());
                });
                setMessages(tempmessage);
            }
        );

        const unsubscribeRoomName = onSnapshot(doc(db, 'rooms', roomId), (docSnapshot) => {
            setRoomName(docSnapshot.data().name);
        });

        return () => {
            unsubscribeMessages();
            unsubscribeRoomName();
        };
    }, [roomId, user.uid]);

    return (
        <div>
            <Layout>
                <h1>Room名： {roomName}</h1>

                <Grid container spacing={2}>
                    {messages.map((message) => (
                        <Grid item xs={12} key={message.id}>
                            <ChatCard
                                cid={message.displayName}
                                cname={message.message}
                                isCurrentUser={message.uid === user.uid}
                                timestamp={message.createdAt}
                            />
                        </Grid>
                    ))}
                </Grid>

                <Box mt={2} display="flex" justifyContent="center">
                    <textarea value={text} onChange={(e) => setText(e.target.value)} />
                    <button onClick={sendMessage}>Send</button>
                </Box>

                <Link to="/">ROOM一覧に戻る</Link>
            </Layout>
        </div>
    );
};

export default Chat;