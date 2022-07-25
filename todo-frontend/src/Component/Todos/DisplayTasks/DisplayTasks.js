import React,{useContext, useEffect} from 'react'
import TodoCard from '../TaskLayout/TodoCard'
import styles from './DisplayTasks.module.css';
import TasksContext from '../../../Context/Tasks/TasksContext';

const DisplayTasks = () => {
    const tasksContext = useContext(TasksContext)
    const { tasks, getTasks, filtered } = tasksContext;

    useEffect(() => {
        getTasks();
        // eslint-disable-next-line
    },[])
    
  return (
    <div className={styles.displayTasksContainer}>
        <h3>Added task to-do list</h3>
          <ol className={styles.displayList}>
        {filtered !== null ? filtered.map(task => (
                <li key={task._id}>
                <TodoCard
                    task={task}
                />
                </li>
              )) : tasks !== null && tasks.map(task => (
                  <li key={task._id}>
                      <TodoCard
                          task={task}
                      />
                  </li>
               ))}

          </ol>  
    </div>
  )
}

export default DisplayTasks