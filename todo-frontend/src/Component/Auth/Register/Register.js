import React,{useContext,useState} from 'react'
import styles from './Register.module.css';
import UserContext from '../../../Context/User/UserContext';
import AlertContext from '../../../Context/Alert/AlertContext';
const Register = () => {
    const userContext = useContext(UserContext);
    const { registerUser } = userContext;
    const alertContext = useContext(AlertContext);
    const { setAlert } = alertContext;

    const [credentials, setCredentials] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword:''
    })
    const { name, email, password,confirmPassword } = credentials;

    const onInputChange = e =>setCredentials({
                                ...credentials,
                                [e.target.name]:e.target.value
                            })

    const onFormSubmit = (e) => {
        e.preventDefault();
        if (name === '' || email === '' || password === '' || confirmPassword === '') {
            setAlert('Please enter all required details');
        } else if( password !== confirmPassword ) {
            setAlert('Password did not match');
        } else {
            registerUser({ name, email, password });
            setCredentials({
                name: '',
                email: '',
                password: '',
                confirmPassword:''
            })
        }
        
    }

  return (
        <div className={styles.registerContainer}>
          <h1>Register</h1>
          <form onSubmit={onFormSubmit}>
            <div>
                <label htmlFor='name'>Name:</label>
                  <input type="text" name="name" id='name' value={name} onChange={onInputChange} />
            </div>
            <div>
                <label htmlFor='email'>Email:</label>
                    <input type="email" name="email" id='email' value={email} onChange={onInputChange} />
            </div>
            <div>
                <label htmlFor='password'>Password:</label>
                  <input type="password" name="password" id='password' value={password} onChange={onInputChange}/>
              </div>
              <div>
                <label htmlFor='confirmPassword'>Password:</label>
                  <input type="password" name="confirmPassword" id='confirmPassword' value={confirmPassword} onChange={onInputChange}/>
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
  )
}

export default Register