import React, { useState, useEffect } from "react";
import { createRoom, getOnlineUsersRealtime } from "../plugins/firebase";
import { useLoginCheck } from "../hooks/useLoginCheck";

const CreateRoom = () => {
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const isLoggedIn = useLoginCheck();

    useEffect(() => {
        const unsubscribe = getOnlineUsersRealtime(setOnlineUsers);
        return () => {
            unsubscribe();
        };
    }, []);

    const handleUserSelect = (user) => {
        if (selectedUsers.includes(user)) {
            setSelectedUsers(selectedUsers.filter((selectedUser) => selectedUser !== user));
        } else {
            setSelectedUsers([...selectedUsers, user]);
        }
    };

    const handleCreateRoom = () => {
        createRoom(selectedUsers);
    };

    return (
        <div>
            <h1>Create Room</h1>
            <h2>Online Users</h2>
            <ul>
                {onlineUsers.map((user) => (
                    <li key={user.id}>
                        <input type="checkbox" checked={selectedUsers.includes(user)} onChange={() => handleUserSelect(user)} />
                        {user.displayName} ({user.email})
                    </li>
                ))}
            </ul>
            {isLoggedIn ? (
                <button onClick={handleCreateRoom}>Create Room</button>
            ) : (
                <p>ログアウト</p>
            )}
        </div>
    );
};

export default CreateRoom;
