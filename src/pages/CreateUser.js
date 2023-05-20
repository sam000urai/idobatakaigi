import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUser, signInWithGoogle } from '../plugins/firebase';

const CreateUser = () => {
    const [email, setEmail] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const handleClick = async () => {
        console.log('Email:', email);
        console.log('Password:', password);
        const result = await createUser(displayName, email, password);
        console.log(
            '🚀 ~ file: CreateUser.js ~ line 13 ~ handleClick ~ result',
            result
        );
        if (result === 'success') {
            navigate('/room');
        } else {
            setError('User作成に失敗しました。');
        }
    };

    const handleGoogleSignIn = async () => {
        const result = await signInWithGoogle();
        if (result === "success") {
            navigate('/room');
        } else {
            setError("Googleログインに失敗しました。");
        }
    };

    return (
        <div>
            <h1>CreateUser</h1>
            <TextField
                id="displayName"
                label="displayName"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
            />
            <br />
            <TextField
                id="email"
                label="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <br />
            <TextField
                id="password"
                label="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <br />
            <Button variant="outlined" onClick={handleClick}>
                Create
            </Button>
            <br />

            <Button variant="outlined" onClick={handleGoogleSignIn}>Google Login</Button><br />

            <Link to="/">戻る</Link>
            {error && <p>{error}</p>}


        </div>
    );
};

export default CreateUser;
