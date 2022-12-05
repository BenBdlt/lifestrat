import { Link } from 'react-router-dom';
import './layout.css'
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { getAuth, signOut } from "firebase/auth";


const NavBar = () => {
   const [param, setParam] = useState(false);

   const openParameter = event => {
      setParam(current => !current);
   };

   const auth = getAuth();
   
   const disconnect = event => {
      setParam(current => !current);
      signOut(auth).then(() => {
         // Sign-out successful.
         console.log("déco")
         }).catch((error) => {
         // An error happened.
         });
   }
   
   
   return (
      <nav className="navbar">
         <ul>
            <li>
               <Link to="/">Accueil</Link>
            </li>
            <li>
               <Link to="/about">A propos</Link>
            </li>
         </ul>

         <div className="profil">
            {param &&
               <Link to="/profil" className="goToEdit" onClick={openParameter}>
                  Editer le profil
               </Link>
            }
            <div className="editProfil" onClick={openParameter}>
               <FontAwesomeIcon icon={faPen} />
               <img src="/assets/MANDO.jpg" alt="" />
            </div>
            <div className="infoProfil">
               Bordelet Benjamin
               {param &&
                  <Link to="/login" className="goDisconnect" onClick={disconnect}>
                     Deconnexion
                  </Link>
               }
            </div>
         </div>
      </nav>
   );
};

export default NavBar;