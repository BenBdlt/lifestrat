import React from 'react';
import './App.css';
import NavBar from './components/Layout/navbar';
import NavBarNoLogin from './components/Layout/navbar-no-login';
import { onAuthStateChanged } from "firebase/auth";
import {useState} from 'react'
import { useEffect } from 'react';
import { Route,Routes } from 'react-router-dom';
import Home from './pages/Home/home';
import About from './pages/About/about';
import Profil from './pages/Profil/profil';
import Auth from './pages/Auth/auth';
import {auth} from './firebase';


function App() {

  //CURRENT USER
  const [currentUser, setCurrentUser] = useState(null)
  
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user)
    })
  }, [])
  
  return (
    <>
        {currentUser
        ? <NavBar/>
        : <NavBarNoLogin/>
        }

        <Routes>
          <Route >
            <Route path="/" element={<Home />} exact />
            <Route path="/profil" element={<Profil />} />
            <Route path="/about" element={<About />} />
          </Route>
            
          <Route path="/login" element={<Auth />} />
        </Routes>
    </>
  );
}

export default App;
