import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import CreateUser from './pages/CreateUser';
import Signin from './pages/Signin';
import Room from './pages/Room';
import Chat from './pages/Chat';
import CreateRoom from './pages/CreateRoom'; // インポート追加

console.log('API Key:', process.env.REACT_APP_API_KEY);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Signin />} />
        <Route path="/createUser" element={<CreateUser />} />
        <Route path="/room" element={<Room />} />
        <Route path="/createroom" element={<CreateRoom />} /> {/* ルート追加 */}
        <Route path="/chat/:id" element={<Chat />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;