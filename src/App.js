import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/Layout/navbar';
import Home from './pages/Home/home';
import About from './pages/About/about';
import Profil from './pages/Profil/profil';

function App() {
  return (
    <>
      <NavBar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profil" element={<Profil />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </>
  );
}

export default App;
