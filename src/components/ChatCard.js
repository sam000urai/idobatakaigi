import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/ChatCard.css'; // ChatCard用のCSSファイルをインポート

export default function ChatCard({ cid, cname, isCurrentUser, timestamp }) {
    console.log(isCurrentUser);
    const cardClass = isCurrentUser ? 'chat-card-right' : 'chat-card-left'; // ログインユーザーかどうかによって適用するCSSクラスを変更

    const formatTimestamp = (timestamp) => {
        // タイムスタンプオブジェクトをミリ秒に変換する
        const milliseconds = timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000;

        // ミリ秒から Date オブジェクトを作成する
        const date = new Date(milliseconds);

        // 日付を読みやすい文字列にフォーマットする（必要に応じて書式を調整してください）
        const formattedDate = date.toLocaleString();

        return formattedDate;
    };

    return (
        <Card className={`chat-card ${cardClass}`} sx={{ width: 275, marginTop: 5 }}>
            <CardContent>
                <Typography variant="h8" component="div">
                    {cname}
                </Typography>
                <Typography variant="body2">
                    Nama: {cid}
                    <br />
                    Time: {timestamp ? formatTimestamp(timestamp) : ""}
                </Typography>
            </CardContent>
        </Card>
    );
}
