import React, { useReducer } from 'react';
import axios from 'axios';
import {v4} from 'uuid'
import TasksContext from './TasksContext';
import TasksReducer from './TasksReducer';
import {
    GET_TASKS,
    ADD_NEW_TASK,
    UPDATE_STATUS
} from '../Types';

const TasksState = ({ children }) => {
    const initalState = {
        tasks: null,
    }
    const [state, dispatch] = useReducer(TasksReducer, initalState);

    // Get all ToDos
    const getTasks = async () => {
        try {
            const res = await axios.get('https://jsonplaceholder.typicode.com/todos');
            dispatch({type:GET_TASKS,payload: res.data.slice(0,50)})
        } catch (error) {
            console.log(error);
        }
        
    }

    // Adding a new ToDo
    const addNewTask = async(task) => {
        const config = {
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        }
        const todoObj = {
            title: task,
            userId: 1,
            completed:false
        }
        try {
            const res = await axios.post("https://jsonplaceholder.typicode.com/todos", todoObj, config)

            // To give tasks unique id
            // While working with real database this step can be skipped
            res.data.id = v4();

            dispatch({ type: ADD_NEW_TASK, payload: res.data });
        } catch (error) {
            console.log(error);
        }
    }

    // Update "incomplete to complete" or vice versa
    const updateTasksStatus = async(todoObj) => {
        const config = {
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        }
        try {            
            const res = await axios.patch(`https://jsonplaceholder.typicode.com/todos/${todoObj.id}`,todoObj,config);
            dispatch({ type: UPDATE_STATUS, payload: res.data });
        } catch (error) {
            console.log(error);
        }
        
    }

    return (<TasksContext.Provider
        value={{
            tasks: state.tasks,
            getTasks,
            addNewTask,
            updateTasksStatus
        }}
    >
        {children}
    </TasksContext.Provider>)
}

export default TasksState;