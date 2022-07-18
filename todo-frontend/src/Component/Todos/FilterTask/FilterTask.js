import React,{useContext} from 'react'
import styles from './FilterTask.module.css';
import { FILTER_COMPLETED, FILTER_INCOMPLETE } from '../../../Context/Types';
import TasksContext from '../../../Context/Tasks/TasksContext';
const FilterTask = () => {
    const tasksContext = useContext(TasksContext);
    const {
        filterCompleted,
        filterIncomplete,
        clearFilter, filterType,
        // eslint-disable-next-line
        filtered,
    } = tasksContext;
    
    const displayAll = () => {
        clearFilter();
    }

    const displayCompletedTasks = () => {
        filterCompleted()
    }
    
    const displayIncompletedTasks = () => {
        filterIncomplete();
    }    
    
  return (
      <div className={styles.filterContainer}>
          <h3>Display :</h3>
          <div className={styles.filterButtons}>
              <button onClick={displayAll} className={filterType === null ? styles.activeBtn:null}>All</button>
              <button onClick={displayCompletedTasks} className={filterType === FILTER_COMPLETED ? styles.activeBtn:null}>Completed</button>
              <button onClick={displayIncompletedTasks} className={filterType === FILTER_INCOMPLETE?styles.activeBtn:null}>Incomplete</button>
          </div>
    </div>
  )
}

export default FilterTask