import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';

export default function ChatCard({ cid, cname }) {

    return (
        <Card sx={{ width: 275, marginTop: 5 }}>
            <CardContent>
                <Typography variant="h8" component="div">
                    {cname}
                </Typography>
                <Typography variant="body2">
                    <br />
                    Name: {cid}
                </Typography>
            </CardContent>

        </Card>
    );
}