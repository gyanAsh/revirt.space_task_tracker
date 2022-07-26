import React, { useReducer } from 'react';
import { v4 } from 'uuid';
import AlertContext from "./AlertContext";
import AlertReducer from "./AlertReducer";
import {SET_ALERT,REMOVE_ALERT} from '../Types'


const AlertState = ({ children }) => {
    const initialState = [];

    const [state, dispatch] = useReducer(AlertReducer, initialState);

    const setAlert = (msg) => {
        const id = v4();
        dispatch({ type: SET_ALERT, payload: { id, msg } });
        setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), 2500);
    }

    return <AlertContext.Provider value={{
        alert: state,
        setAlert
    }}>
        {children}
    </AlertContext.Provider>
}

export default AlertState;