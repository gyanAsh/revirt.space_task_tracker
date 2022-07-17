import React, { useReducer } from 'react';
import axios from 'axios';
import {v4} from 'uuid'
import TasksContext from './TasksContext';
import TasksReducer from './TasksReducer';
import {
    GET_TASKS,
    ADD_NEW_TASK
} from '../Types';

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

    const addNewTask = async(task) => {
        const config = {
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        }
        const taskObj = {
            title: task,
            userId: 1,
            completed:false
        }
        try {
            const res = await axios.post("https://jsonplaceholder.typicode.com/todos", taskObj, config)

            // To give tasks unique id
            // While working with real database this step can be skipped
            res.data.id = v4();

            console.log(res);
            dispatch({ type: ADD_NEW_TASK, payload: res.data });
        } catch (error) {
            console.log(error);
        }
    }

    return (<TasksContext.Provider
        value={{
            tasks: state.tasks,
            getTasks,
            addNewTask
        }}
    >
        {children}
    </TasksContext.Provider>)
}

export default TasksState;