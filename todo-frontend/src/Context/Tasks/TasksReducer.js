import React from 'react'
import { GET_TASKS } from '../Types';

const TasksReducer = (state,action) => {
  switch (action.type) {
    case GET_TASKS:
        return {
            ...state,
            tasks: action.payload
        };
    default:
        return state;
  }
}

export default TasksReducer