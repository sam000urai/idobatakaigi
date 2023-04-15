import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';

export default function RoomCard({ rid, rname }) {
  const navigate = useNavigate();
  const moveRoom = () => {
    navigate(`/chat/${rid}`);
  };
  return (
    <Card sx={{ width: 275, marginTop: 5 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {rname}
        </Typography>
        <Typography variant="body2">
          <br />
          Test Room id: {rid}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={moveRoom}>
          Enter
        </Button>
      </CardActions>
    </Card>
  );
}
