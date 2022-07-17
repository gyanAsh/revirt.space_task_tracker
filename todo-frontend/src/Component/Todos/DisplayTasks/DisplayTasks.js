import React from 'react'
import TodoCard from '../TaskLayout/TodoCard'
import styles from './DisplayTasks.module.css';
const DisplayTasks = () => {
  return (
    <div className={styles.displayTasksContainer}>
        <h3>Added task to-do list</h3>
          <ol className={styles.displayList}>
              <li> <TodoCard/></li>
              <li> <TodoCard/></li>
              <li> <TodoCard/></li>
              <li> <TodoCard/></li>
              <li> <TodoCard/></li>
          </ol>  
    </div>
  )
}

export default DisplayTasks