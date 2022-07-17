import React from 'react'
import TodoCard from '../TaskLayout/TodoCard'

const DisplayTasks = () => {
  return (
    <div >
        <h3>Added task to-do list</h3>
          <ol>
              <li> <TodoCard/></li>
              <li> TASK TWO</li>
              <li> TASK TWO</li>
              <li> TASK TWO</li>
          </ol>  
    </div>
  )
}

export default DisplayTasks