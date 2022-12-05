import React from 'react';
import '../../pages/Auth/auth.css';
import { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword  } from "firebase/auth";


function RegisterForm() {

    const auth = getAuth();

    const [inputs, setInputs] = useState({});
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

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

        //FIREBASE REGISTER FUNCTION
        createUserWithEmailAndPassword(auth, inputs.user_mail, inputs.user_pswd)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            // ...
        })
        .then((response) => {
            sessionStorage.setItem('Auth Token', response._tokenResponse.refreshToken)
        })
        .catch((err) => {
            // console.log(err.code)
            switch (err.code) {
                case "auth/email-already-in-use":
                    setEmailError("Email déjà utilisé");
                break;
                case "auth/invalid-email":
                    setEmailError("Email invalide");
                break;
                case "auth/weak-password":
                    setPasswordError("Votre mot de passe est trop court");
                break;
                default:
                }
            const errorCode = error.code;
            const errorMessage = error.message;
        });
    }
    

    return (
    <div className="registerform">
        <h1>Créer un nouveau compte Lifestrat</h1>
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

export default RegisterForm;