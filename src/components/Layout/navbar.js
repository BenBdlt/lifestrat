import { Link } from 'react-router-dom';
import './layout.css'
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const NavBar = () => {
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
         <Link to="/profil">
            <FontAwesomeIcon icon={faPen} />
            <img src="/assets/MANDO.jpg" alt="" />
         </Link>
      </div>
 </nav>
 );
};

export default NavBar;