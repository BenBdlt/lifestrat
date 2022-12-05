import React from 'react';
import './layout.css';
import { Router, Route,Routes } from 'react-router-dom';
import Home from '../../pages/Home/home';
import About from '../../pages/About/about';
import Profil from '../../pages/Profil/profil';
import Auth from '../../pages/Auth/auth';

export function Layout({userLogged}) {

    
    // React.useEffect(() => {
    //     if (!userLogged) {
    //       redirect('/login');
    //       console.log(userLogged)
    //     } else {
    //         console.log('alert')
    //     }
    // });

    return (
        <>
            {/* <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/profil" element={<Profil />} />
                    <Route path="/about" element={<About />} />
                </Routes>
            </Router> */}
        </>
    );
    }

export default Layout;