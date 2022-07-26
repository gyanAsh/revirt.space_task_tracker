import React, { useContext, useState,useEffect } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import styles from './Login.module.css';
import UserContext from '../../../Context/User/UserContext';
import AlertContext from '../../../Context/Alert/AlertContext';

const Login = () => {
  const userContext = useContext(UserContext);
  const { loginUser, isAuthenticated } = userContext;
  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;

  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }

    // eslint-disable-next-line
  },[isAuthenticated])
  
  const [credentials, setCredentials] = useState({
    email: "",
    password: ""
  })
  const { email, password } = credentials;

  const onInputChange = e => setCredentials({
    ...credentials,
    [e.target.name]:e.target.value
  })

  const onFormSubmit = e => {
    e.preventDefault();
    if (email === "" || password === "") {
      setAlert("Please enter required details");
    } else {
      loginUser(credentials);
      setCredentials({
        email: "",
        password: ""
      })
    }
  }

  return (
        <div className={styles.loginContainer}>
          <h1>Login</h1>
          <form onSubmit={onFormSubmit}>
            <div>
                <label htmlFor='email'>Email:</label>
                    <input type="email" name="email" id='email' value={email} onChange={onInputChange}/>
            </div>
            <div>
                <label htmlFor='password'>Password:</label>
                <input type="password" name="password" id='password' value={password} onChange={onInputChange}/>
            </div>
            <button type="submit">Submit</button>
      </form>
      <Link to='/auth/register'><p className={styles.redirect}>Register new user ?</p></Link>
        </div>
  )
}

export default Login