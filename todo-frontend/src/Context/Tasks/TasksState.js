import React, { useReducer } from 'react';
import axios from 'axios';
import {v4} from 'uuid'
import TasksContext from './TasksContext';
import TasksReducer from './TasksReducer';
import {
    GET_TASKS,
    ADD_NEW_TASK,
    UPDATE_STATUS,
    DELETE_TASK,
    FILTER_COMPLETED,
    FILTER_INCOMPLETE,
    CLEAR_FILTER
} from '../Types';

const TasksState = ({ children }) => {
    const initalState = {
        tasks: null,
        filtered: null,
        filterType:null
    }
    const [state, dispatch] = useReducer(TasksReducer, initalState);

    // Get all ToDos
    const getTasks = async () => {
        try {
            const res = await axios.get('/api/v1/todo');
            dispatch({type:GET_TASKS,payload: res.data.slice(0,50)})
        } catch (error) {
            console.log(error);
            console.log(error.response.data);
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

            if (state.filtered !== null) {
                filterIncomplete();
            }
                
        } catch (error) {
            console.log(error);
            console.log(error.response.data);
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
            const res = await axios.patch(`https://jsonplaceholder.typicode.com/todos/${todoObj.id}`, todoObj, config);
            dispatch({ type: UPDATE_STATUS, payload: res.data });

            if (state.filtered !== null && state.filterType === FILTER_COMPLETED) {
                filterCompleted();
            } else if(state.filtered !== null && state.filterType === FILTER_INCOMPLETE) {
                filterIncomplete();
            }

        } catch (error) {
            console.log(error);
            console.log(error.response.data);
        }
        
    }
    // Delete todo from the list
    const deleteTask = async(taskId) => {
        
        try {
            await axios.delete(`https://jsonplaceholder.typicode.com/todos/${taskId}`);
            dispatch({ type: DELETE_TASK, payload: taskId });

            if (state.filtered !== null && state.filterType === FILTER_COMPLETED) {
                filterCompleted();
            } else if(state.filtered !== null && state.filterType === FILTER_INCOMPLETE) {
                filterIncomplete();
            }

        } catch (error) {
            console.log(error);
            console.log(error.response.data);
        }
    }

    // Will display completed tasks
    const filterCompleted = () => {
        try {
            dispatch({ type: FILTER_COMPLETED });
        } catch (error) {
            console.log(error);
        }
    }

    // Will display incomplete tasks
    const filterIncomplete = () => {
        try {
            dispatch({ type: FILTER_INCOMPLETE });
        } catch (error) {
            console.log(error);
        }
    }

    const clearFilter = () => {
        try {
            dispatch({ type: CLEAR_FILTER });
        } catch (error) {
            console.log(error);
        }
        
    }

    return (<TasksContext.Provider
        value={{
            tasks: state.tasks,
            filtered: state.filtered,
            filterType:state.filterType,
            getTasks,
            addNewTask,
            updateTasksStatus,
            deleteTask,
            filterCompleted,
            filterIncomplete,
            clearFilter
        }}
    >
        {children}
    </TasksContext.Provider>)
}

export default TasksState;