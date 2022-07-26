import React,{useContext} from 'react';
import styles from './Alert.module.css';
import AlertContext from '../../Context/Alert/AlertContext';

const Alert = () => {
    const alertContext = useContext(AlertContext);
    const {alert} = alertContext;
    return<div className={styles.alertContainer} >
        {alert != null && alert.map(alert => (
            <h1 key={alert.id}>{alert.msg}</h1>
        ))}
      </div>
    
}

export default Alert