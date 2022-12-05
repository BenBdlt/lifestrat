import React from 'react';
import './App.css';
import NavBar from './components/Layout/navbar';
import NavBarNoLogin from './components/Layout/navbar-no-login';
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {useState} from 'react'
import {AuthProvider} from './AuthContext' 
import { useEffect } from 'react';
import { Route,Routes } from 'react-router-dom';
import Home from './pages/Home/home';
import About from './pages/About/about';
import Profil from './pages/Profil/profil';
import Auth from './pages/Auth/auth';
import {PrivateRoutes} from './utils/PrivateRoutes';


function App() {

  const firebaseConfig = {
    apiKey:process.env.REACT_APP_APIKEY,
    authDomain:process.env.REACT_APP_AUTHDOMAIN,
    projectId:process.env.REACT_APP_PROJECTID,
    storageBucket:process.env.REACT_APP_STORAGEBUCKET,
    messagingSenderId:process.env.REACT_APP_MESSAGINGSENDERID,
    appId:process.env.REACT_APP_APPID
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  //AUTH
  const [currentUser, setCurrentUser] = useState(null)

  const auth = getAuth();
  
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user)
    })
  }, [])
  // console.log(currentUser)
  
  return (
    <>
        {currentUser
        ? <NavBar/>
        : <NavBarNoLogin/>
        }

        <Routes>
          <Route element={<PrivateRoutes userLogged={{currentUser}} />}>
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
