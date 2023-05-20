import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/ChatCard.css'; // ChatCard用のCSSファイルをインポート

export default function ChatCard({ cid, cname, isCurrentUser }) {
    console.log(isCurrentUser);
    const cardClass = isCurrentUser ? 'chat-card-right' : 'chat-card-left'; // ログインユーザーかどうかによって適用するCSSクラスを変更

    return (
        <Card className={`chat-card ${cardClass}`} sx={{ width: 275, marginTop: 5 }}>
            <CardContent>
                <Typography variant="h8" component="div">
                    {cname}
                </Typography>
                <Typography variant="body2">
                    Nama: {cid}
                </Typography>
            </CardContent>
        </Card>
    );
}