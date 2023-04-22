import React, { useState, useEffect } from "react";
import { createRoom, getAllUsers } from "../plugins/firebase";
import { useLoginCheck } from "../hooks/useLoginCheck";
import Button from '@mui/material/Button';
import Layout from '../components/Layout';
import { signOutUser } from '../plugins/firebase';

const CreateRoom = () => {
    const [users, setUsers] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);
    console.log(selectedUsers)
    const isLoggedIn = useLoginCheck();

    useEffect(() => {
        const fetchUsers = async () => {
            const users = await getAllUsers();
            setUsers(users);
        };
        fetchUsers();
    }, []);


    const handleUserSelect = (user) => {
        if (selectedUsers.includes(user)) {
            setSelectedUsers(selectedUsers.filter((selectedUser) => selectedUser !== user));
        } else {
            setSelectedUsers([...selectedUsers, user]);
        }
    };

    const handleCreateRoom = async () => {
        console.log(selectedUsers)
        const roomId = await createRoom(selectedUsers);
        // チャットルーム作成後に、作成されたルームに遷移する処理を実装する
    };

    const handleClick = () => {
        signOutUser()
    };


    return (
        <div>
            <Layout>
                <h1>Create Room</h1>
                <main>
                    <h2>All Users</h2>
                    <ul>
                        {users.map((user) => (
                            <li key={user.id}>
                                <input
                                    type="checkbox"
                                    checked={selectedUsers.includes(user)}
                                    onChange={() => handleUserSelect(user)}
                                />
                                {user.displayName} ({user.email})
                            </li>
                        ))}
                    </ul>
                    {isLoggedIn ? (
                        <button onClick={handleCreateRoom}>Create Room</button>
                    ) : (
                        <p>ログアウト</p>
                    )}

                    <Button variant="outlined" onClick={handleClick}>
                        ログアウト
                    </Button>
                </main>
            </Layout>
        </div>
    );
};
export default CreateRoom;