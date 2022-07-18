import {
  GET_TASKS,
  ADD_NEW_TASK,
  UPDATE_STATUS,
  DELETE_TASK,
  FILTER_COMPLETED,
  FILTER_INCOMPLETE,
  CLEAR_FILTER
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
        tasks: [action.payload, ...state.tasks]
      }
    case UPDATE_STATUS:
      return {
        ...state,
        tasks: state.tasks.map(task => {
            if (task.id === action.payload.id)
            return action.payload;
          return task
        })
      }
    case DELETE_TASK:
      return {
        ...state,
        tasks:state.tasks.filter(task=> task.id !== action.payload),
      }
    case FILTER_COMPLETED:
      return {
        ...state,
        filtered:state.tasks.filter(task=> task.completed === true),
        filterType: FILTER_COMPLETED
      }
    case FILTER_INCOMPLETE:
      return {
        ...state,
        filtered: state.tasks.filter(task => task.completed === false),
        filterType: FILTER_INCOMPLETE
      }
    case CLEAR_FILTER:
      return {
        ...state,
        filtered: null,
        filterType: null
      }
    default:
        return state;
  }
}

export default TasksReducer