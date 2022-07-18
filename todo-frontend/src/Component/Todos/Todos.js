import React from 'react'
import DisplayTasks from './DisplayTasks/DisplayTasks'
import InputNewTask from './InputNewTask/InputNewTask'
import FilterTask from './FilterTask/FilterTask';

const Todos = () => {
  return (
    <div>
        <InputNewTask />
        <FilterTask/>
        <DisplayTasks/>  
    </div>
  )
}

export default Todos