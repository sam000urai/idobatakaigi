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

    const handleCreateData = async () => {
        console.log('start')
    };


    const createFunc = async () => {
        console.log('start')
        const res = await createDataInFirebase()
        console.log('fin', res)
    }

    const read = async () => {
        console.log("read")
        await readData()
    }

    const readcollection = async () => {
        console.log("users")
        await readCollection()
    }

    const handleUpdate = async () => {
        await updateData();
    };

    const handleCreate = async () => {
        await myDataCreateInFirebase(firstName, lastName, birthYear);
    };

    const handleNewCreate = async () => {
        await newCreateInFirebase(firstName, lastName, birthYear);
    };

    const handleDelete = async (id) => {
        await deleteData(id);
    }


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

        </div>
    );
};

export default Room;
