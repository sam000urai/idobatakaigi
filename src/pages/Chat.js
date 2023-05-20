import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import ChatCard from '../components/ChatCard';
import { sendMessageForFirebase, db, getUsernameByUID } from '../plugins/firebase';
import { Link, useParams } from 'react-router-dom';
import { selectUser } from '../features/userSlice';
import { useAppSelector } from '../hooks/useRTK';
import { collection, onSnapshot, query, orderBy, limit, doc } from 'firebase/firestore';


const Chat = ({ }) => {
    const [text, setText] = useState('');
    const [messages, setMessages] = useState([]); // messagesをstateとして追加
    const [roomName, setRoomName] = useState(''); // Roomの名前をstateとして追加
    let { roomId } = useParams();
    const user = useAppSelector(selectUser);

    console.log(user)

    const sendMessage = () => {
        if (text.trim() === '') {
            return;
        }
        sendMessageForFirebase(text, user.displayName, user.uid, roomId);
        setText(''); // メッセージ送信後にテキストをクリアする
    };

    useEffect(() => {
        const unsubscribeMessages = onSnapshot(
            query(
                collection(db, "messages", roomId, "message"),
                orderBy("createdAt", "asc")
            ),
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

        const unsubscribeRoomName = onSnapshot(
            doc(db, "rooms", roomId),
            (docSnapshot) => {
                setRoomName(docSnapshot.data().name);
            }
        );

        return () => {
            unsubscribeMessages();
            unsubscribeRoomName();
        };
    }, [roomId, user.uid]);

    console.log()

    return (
        <div>
            <Layout>
                <h1>Room名： {roomName}</h1>

                <ul>
                    {messages.map((message) => (
                        <li key={message.id}>
                            <ChatCard
                                cid={message.displayName}
                                cname={message.message}
                                isCurrentUser={message.uid === user.uid} // ログインユーザーかどうかを判定
                                timestamp={message.createdAt} // 投稿時間を渡す
                            />
                        </li>
                    ))}
                </ul>

                <textarea value={text} onChange={(e) => setText(e.target.value)} />
                <button onClick={sendMessage}>Send</button>
                <Link to='/' >ROOM一覧に戻る</Link>

            </Layout>
        </div>
    );
};

export default Chat;