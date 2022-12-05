import React from 'react';
import './layout.css';
import { Routes, Navigate } from 'react-router-dom';
import Auth from '../../pages/Auth/auth';

function LayoutNoLogin() {

    

    return (
        <>
            <Navigate to="/login" />
        </>
    );
    }

export default LayoutNoLogin;