import React, { useReducer } from 'react';
import axios from 'axios';
import TasksContext from './TasksContext';
import TasksReducer from './TasksReducer';
import { GET_TASKS } from '../Types';

const TasksState = ({ children }) => {
    const initalState = {
        tasks: null,
    }
    const [state, dispatch] = useReducer(TasksReducer, initalState);

    const getTasks = async () => {
        try {
            const res = await axios.get('https://jsonplaceholder.typicode.com/todos');
            dispatch({type:GET_TASKS,payload: res.data.slice(0,50)})
        } catch (error) {
            console.log(error);
        }
        
    }

    return (<TasksContext.Provider
        value={{
            tasks: state.tasks,
            getTasks,
        }}
    >
        {children}
    </TasksContext.Provider>)
}

export default TasksState;