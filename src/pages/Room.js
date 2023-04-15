import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc, getFirestore } from "firebase/firestore";
import { createDataInFirebase, readData, readCollection, updateData, deleteData, signOutUser, myDataCreateInFirebase, newCreateInFirebase } from '../plugins/firebase';

const Room = () => {
    const [user, setUser] = useState(null);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [birthYear, setBirthYear] = useState('');
    const navigate = useNavigate();

    const handleFirstNameChange = (event) => {
        setFirstName(event.target.value);
    };

    const handleLastNameChange = (event) => {
        setLastName(event.target.value);
    };

    const handleBirthYearChange = (event) => {
        setBirthYear(event.target.value);
    };

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
            <h1>Room作成</h1>
            <p>{user?.email}でログイン中</p>
            <label>
                First Name:
                <input type="text" value={firstName} onChange={handleFirstNameChange} />
            </label>
            <label>
                Last Name:
                <input type="text" value={lastName} onChange={handleLastNameChange} />
            </label>
            <label>
                Birth Year:
                <input type="text" value={birthYear} onChange={handleBirthYearChange} />
            </label>
            <Button variant="outlined" onClick={handleClick}>
                ログアウト
            </Button>
            <Button variant="outlined" onClick={navigateToCreateRoom}>
                新規Room作成
            </Button>
        </div>
    );
};

export default Room;
