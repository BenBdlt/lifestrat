import { Link } from 'react-router-dom';

const Footer = () => {
 return (
       <nav>
       <ul>
          <li>
             LifeStrat
          </li>
          <li>
             <Link to="/contact">contact</Link>
          </li>
       </ul>
 </nav>
 );
};

export default Footer;