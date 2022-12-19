import React from 'react';
import '../../pages/Auth/auth.css';
import { useState } from 'react';
import { getAuth, signInWithEmailAndPassword  } from "firebase/auth";
import { useAuthValue } from "../../AuthContext"
import { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';


function LoginForm() {

    const auth = getAuth();

    const [inputs, setInputs] = useState({});
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [user, loading, errorAuth] = useAuthState(auth);
    const navigate = useNavigate();

    //RECUPERATION DES DONNEES USER
    const handleChange = (event) => {
      const name = event.target.name;
      const value = event.target.value;
      setInputs(values => ({...values, [name]: value}))
    }

    const error = '';

    //SUBMIT
    const handleSubmit = (event) => {
        event.preventDefault();
        setEmailError("");
        setPasswordError("");

        //FIREBASE SIGN IN FUNCTION
        signInWithEmailAndPassword(auth, inputs.user_mail, inputs.user_pswd)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            const jwtToken = user?.getIdToken();
            console.log("TOKEN " + jwtToken)
            // console.log(user)
            // ...
        })
        .then((response) => {
            sessionStorage.setItem('Auth Token', response._tokenResponse.refreshToken)
        })
        .catch((err) => {
            switch (err.code) {
                case "auth/Invalid-email":
                    setEmailError("Email non valide");
                case "auth/user-disabled":
                    setEmailError('Utilisateur Bannis !');
                case "auth/user-not-found":
                    setEmailError('Utilisateur inexistant');
                break;
                case "auth/wrong-password":
                    setPasswordError("Mot de passe incorrect");
                break;
                default:
                }
            const errorCode = error.code;
            const errorMessage = error.message;
        });
    }
    
    useEffect(() => {
        if (user) navigate("/");
    })

    return (
    <div className="loginform">
        <h1>Connexion à Lifestrat</h1>
        <form onSubmit={handleSubmit}>
            <label>Email
                <input 
                    type="email" 
                    name="user_mail" 
                    value={inputs.user_mail || ""} 
                    onChange={handleChange}
                />
            </label>
            <p className="errorMsg">{emailError}</p>

            <label>password
                <input 
                type="password" 
                name="user_pswd" 
                value={inputs.user_pswd || ""} 
                onChange={handleChange}
                />
            </label>
            <p className="errorMsg">{passwordError}</p>

            <input type="submit" />
        </form>
    </div>
    );
}

export default LoginForm;