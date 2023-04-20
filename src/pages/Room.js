import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import Button from '@mui/material/Button';
import Layout from '../components/Layout';
import RoomCard from '../components/RoomCard';
import '../styles/Room.css';
import { useNavigate } from 'react-router-dom';
import { createDataInFirebase, readData, readCollection, updateData, deleteData, signOutUser, myDataCreateInFirebase, newCreateInFirebase } from '../plugins/firebase';

const Room = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (user) {
                console.log("ログイン中");
                setUser(user);
            } else {
                console.log("ログアウト");
                navigate('/');
            }
        });
    }, []);

    const handleClick = () => {
        signOutUser()
    };

    const navigateToCreateRoom = () => {
        navigate('/createroom');
    };

    return (
        <div>
            <Layout>
                <h1>Room作成</h1>
                <p>{user?.email}でログイン中</p>
                <main className="cardArea">
                    <RoomCard rid="1" rname="test1" />
                    <RoomCard rid="2" rname="test2" />
                    <RoomCard rid="3" rname="test3" />
                    <RoomCard rid="4" rname="test4" />
                    <RoomCard rid="5" rname="test5" />
                    <RoomCard rid="6" rname="test6" />
                </main>
                <Button variant="outlined" onClick={handleClick}>
                    ログアウト
                </Button>
                <Button variant="outlined" onClick={navigateToCreateRoom}>
                    新規Room作成
                </Button>
            </Layout>
        </div>
    );
};

export default Room;
