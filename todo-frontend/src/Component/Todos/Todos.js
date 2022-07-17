import React from 'react'
import DisplayTasks from './DisplayTasks/DisplayTasks'
import InputNewTask from './InputNewTask/InputNewTask'

const Todos = () => {
  return (
    <div>
        <InputNewTask />
        <DisplayTasks/>  
    </div>
  )
}

export default Todos