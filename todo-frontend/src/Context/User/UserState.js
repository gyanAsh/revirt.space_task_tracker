import axios from 'axios'
import React, { useReducer } from 'react'
import UserContext from './UserContext'
import UserReducer from './UserReducer'
import { 
    REGISTER_USER,
    LOGIN_USER
} from '../Types'
const UserState = ({ children }) => {
    
    const initalState = {
        user: null,
        token:null
    }

    const [state, dispatch] = useReducer(UserReducer, initalState);

    // Register new user
    const registerUser = (credentials) => {

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        try {
            const res = await axios.post('/api/v1/user', credentials, config);
            dispatch({ type: REGISTER_USER, payload: res.data.token });
        } catch (error) {
            console.log(error);
        }
    }

    // User login
    const loginUser = (credentials) => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        try {
            const res = await axios.post('/api/v1/auth', credentials, config);
            dispatch({ type:LOGIN_USER, payload:res.data.token})
        } catch (error) {
            console.log(error);
        }
    }

  return (
      <UserContext.Provider
          value={{
              user: state.user,
              token: state.token,
              registerUser,
              loginUser
          }}
      >
          {children}
      </UserContext.Provider>
  )
}

export default UserState