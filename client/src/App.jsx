import React from 'react';
import Games from './components/games';
import { BrowserRouter , Routes , Route } from "react-router-dom";
import './App.css';
import AddGame from './components/addGame.jsx';
import UpdateGame from './components/updateGame';
import Navbar from'./components/navbar'

function App() {
  return (
    <BrowserRouter>
    <Navbar />
      <Routes>
        <Route path="/" element={<Games />} />
        <Route path="/add" element={<AddGame />} />
        <Route path="/update/:title" element={<UpdateGame/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
