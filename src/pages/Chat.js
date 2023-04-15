import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
const Chat = () => {
  const navigate = useNavigate();
  const backPage = () => {
    navigate('/room');
  };
  return (
    <Layout>
      Chat
      <button onClick={backPage}>戻る</button>
    </Layout>
  );
};

export default Chat;
