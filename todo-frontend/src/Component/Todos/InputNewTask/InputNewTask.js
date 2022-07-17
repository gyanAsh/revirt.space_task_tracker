import React,{useContext, useState} from 'react'
import TasksContext from '../../../Context/Tasks/TasksContext';
import styles from './InputNewTask.module.css';
const InputNewTask = () => {
  const tasksContext = useContext(TasksContext);
  const { addNewTask } = tasksContext;
  
  const [task, setTask] = useState("");
  
  const onTaskSubmit = (e) => {
    e.preventDefault();
    addNewTask(task);
}
  return (
    <div className={styles.inputTaskContainer}>
        <h3> Add a new task in the list</h3>
          <form onSubmit={onTaskSubmit}>
              <input type="text" name="task" onChange={e=>setTask(e.target.value)} value={task} placeholder="Enter the task here" />
              <button type="submit">Submit</button>
          </form>  
    </div>
  )
}

export default InputNewTask