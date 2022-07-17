import React from 'react'
import styles from './TodoCard.module.css';

const TodoCard = ({title,completed}) => {
  return (
    <div className={styles.taskContainer}>
          <h3> {title}</h3>
          <span></span>
          <div className={styles.inputs}>
              <button id={styles.status}>Mark as { completed ? "C" : "soop"}</button>
              <button id={styles.delete}>Delete</button>
          </div>
    </div>
  )
}

export default TodoCard