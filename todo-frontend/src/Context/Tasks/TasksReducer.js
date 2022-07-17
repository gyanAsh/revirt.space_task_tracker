import {
  GET_TASKS,
  ADD_NEW_TASK
} from '../Types';

const TasksReducer = (state,action) => {
  switch (action.type) {
    case GET_TASKS:
        return {
            ...state,
            tasks: action.payload
      };
    case ADD_NEW_TASK:
      return {
        ...state,
        tasks:[action.payload,...state.tasks]
      }
    default:
        return state;
  }
}

export default TasksReducer