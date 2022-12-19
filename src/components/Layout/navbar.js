import { Link } from 'react-router-dom';
import './layout.css'
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { auth, db, logout } from "../../firebase";
import { query, collection, getDocs, where } from "firebase/firestore";

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

   const [user, loading, error] = useAuthState(auth);
   const [name, setName] = useState("");
   const navigate = useNavigate();
   const fetchUserName = async () => {
      try {
         const q = query(collection(db, "users"), where("uid", "==", user?.uid));
         const doc = await getDocs(q);
         const data = doc.docs[0].data();
         setName(data.name);
      } catch (err) {
         console.error(err);
         alert("An error occured while fetching user data");
      }
   };

   // useEffect(() => {
   //    if (loading) return;
   //    if (!user) return navigate("/");
   //    fetchUserName();
   // }, [user, loading]);
   
   
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
               {user?.email}
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