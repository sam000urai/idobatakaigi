import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Chat from './pages/Chat';
import CreateUser from './pages/CreateUser';
import Login from './pages/Login';
import Room from './pages/Room';

console.log('API Key:', process.env.REACT_APP_API_KEY);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route path="/createUser" element={<CreateUser />} />
        <Route path="/room" element={<Room />} />
        <Route path="/chat/:rid" element={<Chat />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
