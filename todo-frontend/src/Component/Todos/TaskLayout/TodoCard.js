import React, { useContext } from 'react'
import { CheckCircleFill} from 'react-bootstrap-icons';
import styles from './TodoCard.module.css';
import TasksContext from '../../../Context/Tasks/TasksContext';


const TodoCard = ({task}) => {
    const { title, completed,_id } = task;

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
        deleteTask(_id);
    }

  return (
      <div className={completed ? styles.taskCompletedContainer : styles.taskContainer}>
          {/* <CheckCircleFill color="royalblue" size={46} /> */}
          <CheckCircleFill className={styles.completedIcon} />
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