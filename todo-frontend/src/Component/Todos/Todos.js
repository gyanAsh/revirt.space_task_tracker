import React, { useContext } from 'react'
import UserContext from '../../Context/User/UserContext';
import DisplayTasks from './DisplayTasks/DisplayTasks'
import InputNewTask from './InputNewTask/InputNewTask'
import FilterTask from './FilterTask/FilterTask';

const Todos = () => {

  const userContext = useContext(UserContext);
  const { isAuthenticated } = userContext;
  
  return isAuthenticated && <div>
        <InputNewTask />
        <FilterTask/>
        <DisplayTasks/>  
    </div>
  
}

export default Todos