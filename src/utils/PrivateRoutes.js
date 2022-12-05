import React from 'react';
import { Outlet, Navigate } from "react-router-dom";

export function PrivateRoutes({userLogged}) {
    console.log("USER " + userLogged)
    return(
        userLogged ? <Outlet/> : <Navigate to="/login" />
    )
}

export default PrivateRoutes;