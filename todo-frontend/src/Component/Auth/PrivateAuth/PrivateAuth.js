import React from 'react'
import { Navigate } from 'react-router-dom';

const PrivateAuth = ({children}) => {
    if (localStorage.token)
        return children;
    else
        return <Navigate replace to="/auth/login"/>
}

export default PrivateAuth