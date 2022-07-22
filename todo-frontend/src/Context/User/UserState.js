import React, { useReducer } from 'react';
import axios from 'axios'
import setAuthToken from '../../Utils/setAuthToken';
import UserContext from './UserContext'
import UserReducer from './UserReducer'
import { 
    REGISTER_USER,
    LOGIN_USER,
    GET_USER
} from '../Types'
const UserState = ({ children }) => {
    
    const initalState = {
        user: null,
        token:localStorage.token
    }

    const [state, dispatch] = useReducer(UserReducer, initalState);

    // Register new user
    const registerUser = async(credentials) => {

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        try {
            const res = await axios.post('/api/v1/user', credentials, config);
            dispatch({ type: REGISTER_USER, payload: res.data.token });
            if (localStorage.token) {
                setAuthToken(localStorage.token);
            }
        } catch (error) {
            console.log(error);
            console.log(error.response.data);
        }
    }

    // User login
    const loginUser = async(credentials) => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        try {
            const res = await axios.post('/api/v1/auth', credentials, config);
            dispatch({ type: LOGIN_USER, payload: res.data.token })
            if (localStorage.token) {
                setAuthToken(localStorage.token);
            }
        } catch (error) {
            console.log(error);
            console.log(error.response.data);
        }
    }

    const loadUser = async () => {
        if (localStorage.token) {
            setAuthToken(localStorage.token);
        }
        try {
            const res = await axios.get('/api/v1/auth');
            dispatch({ type: GET_USER, payload: res.data });
        } catch (error) {
            console.log(error);
            console.log(error.response.data);
        }
    }

  return (
      <UserContext.Provider
          value={{
              user: state.user,
              token: state.token,
              registerUser,
              loginUser,
              loadUser
          }}
      >
          {children}
      </UserContext.Provider>
  )
}

export default UserState