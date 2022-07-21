import React, { useReducer } from 'react'
import UserContext from './UserContext'
import UserReducer from './UserReducer'

const UserState = ({ children }) => {
    
    const initalState = {
        user: null,
        token:null
    }

    const [state, dispatch] = useReducer(UserReducer, initalState);

    // User Login
    // const login = (credentials) => {
        
    // }


  return (
      <UserContext.Provider
          value={{
              user: state.user,
              token:state.token
          }}
      >
          {children}
      </UserContext.Provider>
  )
}

export default UserState