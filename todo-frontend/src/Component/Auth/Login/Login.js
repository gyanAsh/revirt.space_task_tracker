import React from 'react'
import styles from './Login.module.css'
const Login = () => {
  return (
        <div className={styles.loginContainer}>
          <h1>Login</h1>
          <form>
            <div>
                <label htmlFor='email'>Email:</label>
                    <input type="email" name="email" id='email'/>
            </div>
            <div>
                <label htmlFor='password'>Password:</label>
                <input type="password" name="password" id='password'/>
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
  )
}

export default Login