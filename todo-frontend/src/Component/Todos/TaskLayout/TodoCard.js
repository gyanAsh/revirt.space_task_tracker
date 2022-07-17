import React,{useState} from 'react'
import styles from './TodoCard.module.css';

const TodoCard = () => {
    const [status, setStatus] = useState("Completed");
  return (
    <div className={styles.taskContainer}>
          <h3> Task asdfasdfasdfasdfasdfasdfasddfasdf asdfasdf</h3>
          <span></span>
          <div className={styles.inputs}>
              <button id={styles.status}>Mark as {status}</button>
              <button id={styles.delete}>Delete</button>
          </div>
    </div>
  )
}

export default TodoCard