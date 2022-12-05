import React from 'react';
import './auth.css';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword  } from "firebase/auth";
import Login from '../../components/Auth/login';
import Register from '../../components/Auth/register';

function App() {

  return (
    <div className="auth">
      <div className="login">
        <Login/>
      </div>
      <div className="register">
        <Register/>
      </div>
    </div>
  );
}

export default App;
