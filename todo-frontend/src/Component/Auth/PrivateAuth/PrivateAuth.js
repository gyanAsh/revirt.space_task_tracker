import React,{useContext,useEffect} from 'react'
import UserContext from '../../../Context/User/UserContext';
import { Navigate } from 'react-router-dom';

const PrivateAuth = ({ children }) => {
    const userContext = useContext(UserContext);
    const { isAuthenticated, loadUser } = userContext;

    useEffect(() => {
        loadUser();
        // eslint-disable-next-line
    }, [isAuthenticated])

    if (isAuthenticated)
        return children;
    else
        return <Navigate replace to="/auth/login"/>
}

export default PrivateAuth