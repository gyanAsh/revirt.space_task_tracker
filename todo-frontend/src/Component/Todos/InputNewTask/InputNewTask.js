import React,{useState} from 'react'
import styles from './InputNewTask.module.css';
const InputNewTask = () => {

    const [task, setTask] = useState("");

  return (
    <div className={styles.inputTaskContainer}>
        <h3> Add a new task in the list</h3>
          <form>
              <input type="text" name="task" onChange={e=>setTask(e.target.value)} value={task} placeholder="Enter the task here" />
              <button type="submit">Submit</button>
          </form>  
    </div>
  )
}

export default InputNewTask