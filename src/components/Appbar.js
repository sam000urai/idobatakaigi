import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { selectUser } from '../features/userSlice';
import { useAppSelector } from '../hooks/useRTK';


export default function Appbar() {
    const user = useAppSelector(selectUser);
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" color="secondary">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Idobatakaigi for sam
                    </Typography>
                    {user.displayName && <Typography variant="subtitle1" sx={{ mr: 2 }}>
                        {user.displayName}
                    </Typography>}
                    <Avatar alt="user icon" src={user.photoUrl} />
                </Toolbar>
            </AppBar>
        </Box>
    );
}