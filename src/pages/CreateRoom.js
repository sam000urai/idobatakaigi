import React, { useState, useEffect } from "react";
import { getOnlineUsersRealtime } from "../plugins/firebase";
import { useLoginCheck } from "../hooks/useLoginCheck";

const CreateRoom = () => {
    const [onlineUsers, setOnlineUsers] = useState([]);
    const isLoggedIn = useLoginCheck();

    useEffect(() => {
        const unsubscribe = getOnlineUsersRealtime(setOnlineUsers);
        return () => {
            unsubscribe();
        };
    }, []);

    return (
        <div>
            <h1>Create Room</h1>
            <h2>Online Users</h2>
            <ul>
                {onlineUsers.map((user) => (
                    <li key={user.id}>
                        {user.displayName} ({user.email})
                    </li>
                ))}
            </ul>
            {isLoggedIn ? <p>ログイン中</p> : <p>ログアウト</p>}
        </div>
    );
};

export default CreateRoom;