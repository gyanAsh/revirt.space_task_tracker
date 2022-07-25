import React,{useContext,useState} from 'react'
import styles from './Login.module.css';
import UserContext from '../../../Context/User/UserContext';
const Login = () => {
  const userContext = useContext(UserContext);
  const { loginUser } = userContext;
  
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
      alert("Please enter required details");
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
        </div>
  )
}

export default Login