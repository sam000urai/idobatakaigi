import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import Button from '@mui/material/Button';
import Layout from '../components/Layout';
import RoomCard from '../components/RoomCard';
import '../styles/Room.css';
import { useNavigate } from 'react-router-dom';
import { createDataInFirebase, readData, readCollection, updateData, deleteData, signOutUser, myDataCreateInFirebase, newCreateInFirebase, getRooms } from '../plugins/firebase';

const Room = () => {
    const [roomsList, setRoomsList] = useState([]);
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

    useEffect(() => {
        const fetchRooms = async () => {
            const rooms = await getRooms();
            setRoomsList(rooms);
        };
        fetchRooms();
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
                    <h1>Rooms List</h1>
                    {roomsList.map((room) => (
                        <RoomCard rid={room.id} rname={room.name} />
                    ))}
                </main>
                <Button variant="outlined" onClick={handleClick}>
                    ログアウト
                </Button>
                <Button variant="outlined" onClick={navigateToCreateRoom}>
                    新規Room作成
                </Button>
            </Layout>
        </div >
    );
};

export default Room;
