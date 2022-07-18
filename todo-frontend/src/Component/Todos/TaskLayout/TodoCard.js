import React,{useContext} from 'react'
import TasksContext from '../../../Context/Tasks/TasksContext';
import styles from './TodoCard.module.css';

const TodoCard = ({task}) => {
    const { title, completed,id } = task;

    const tasksContext = useContext(TasksContext);
    const { updateTasksStatus ,deleteTask } = tasksContext;
    
    const updateStatus = () => {
        const taskObj = {
            ...task,
            completed: !completed
        }
        updateTasksStatus(taskObj);
    }

    const deleteCurrentTask = () => {
        deleteTask(id);
    }

  return (
    <div className={styles.taskContainer}>
          <h3> {title}</h3>
          <span></span>
          <div className={styles.inputs}>
              <button
                  id={completed ? styles.incomplete : styles.completed}
                  onClick={updateStatus}
              >
                  Mark as {completed ? "incomplete" : "completed"}
              </button>
              <button id={styles.delete} onClick={deleteCurrentTask}>Delete</button>
          </div>
    </div>
  )
}

export default TodoCard