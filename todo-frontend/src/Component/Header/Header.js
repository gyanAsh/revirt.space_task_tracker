import React, { useContext } from 'react'
import UserContext from '../../Context/User/UserContext';
import styles from './Header.module.css'
const Header = () => {
  const userContext = useContext(UserContext);
  const { user } = userContext;

  return (
    <div className={styles.headerContainer}><div>To-Do List</div>
      {user !== null && <span>Welcome, {user.name}</span>}</div>
  )
}

export default Header