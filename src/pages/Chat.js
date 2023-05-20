import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import ChatCard from '../components/ChatCard';
import { sendMessageForFirebase, db, getUsernameByUID } from '../plugins/firebase';
import { Link, useParams } from 'react-router-dom';
import { selectUser } from '../features/userSlice';
import { useAppSelector } from '../hooks/useRTK';
import { collection, onSnapshot, query, orderBy, limit } from 'firebase/firestore';


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
        sendMessageForFirebase(text, user.displayName, user.uid, roomId);
        setText('');
    };

    useEffect(() => {
        const messages = [];
        const q = query(
            collection(db, "messages", roomId, "message"),
            orderBy("createdAt", "asc"));

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const tempmessage = [];
            querySnapshot.forEach((doc) => {
                const username = getUsernameByUID(user.uid); // ユーザー名を取得
                console.log(username)
                tempmessage.push(doc.data());
            });
            setMessages(tempmessage)
        });
        return unsubscribe;
    }, []);

    console.log()

    return (
        <div>
            <Layout>
                <h1>Room名： {roomId}</h1>

                <ul> {/* メッセージを表示するためにul要素を追加 */}
                    {messages.map((message) => (
                        <li key={message.id}>
                            <ChatCard rid={message.displayName} cname={message.message} />
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