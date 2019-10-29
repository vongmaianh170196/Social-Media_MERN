import axios from 'axios';
import {setAlert} from './alert';

import{
    GET_PROFILE,
    PROFILE_ERROR,
    CREATE_PROFILE,
    UPDATE_PROFILE
}from './types';

export const getCurrentProfile = () => async dispatch => {
    try {
        
        const res = await axios.get('/api/profile/me');
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: error.response.statusText, status: error.response.status}
        });
    }
}

export const createProfile = (
    formData, history, edit) => async dispatch => {
        try{
            const config = {
                headers:{
                    'Content-type': 'application/json',
                    //'x-auth-token': localStorage.getItem('token')
                }
            }
        
            const body = JSON.stringify(formData);
        
            const res = await axios.post('/api/profile', body, config)
            dispatch({
                type: CREATE_PROFILE,
                payload: res.data
            })
            dispatch(setAlert(edit ? 'Profile Updated' : 'Profile created', 'success'))
            if(!edit){
                history.push('/dashboard')
            }
        }catch(error){
            const errors = error.response.data.errors;
            if(errors){
                errors.forEach(err => dispatch(setAlert(err.msg, 'danger')));
            }
            dispatch({
                type: PROFILE_ERROR,
                payload: {msg: error.response.statusText, status: error.response.status}
            })
        }
    };


    export const addExperience = (formData, history) => async dispatch => {
        try{
            const config = {
                headers:{
                    'Content-type': 'application/json',
                    //'x-auth-token': localStorage.getItem('token')
                }
            }
        
            const body = JSON.stringify(formData);
        
            const res = await axios.put('/api/profile/experience', body, config)
            dispatch({
                type: UPDATE_PROFILE,
                payload: res.data
            })
            dispatch(setAlert('Experience added', 'success'))
            history.push('/dashboard')
        }catch(error){
            const errors = error.response.data.errors;
            if(errors){
                errors.forEach(err => dispatch(setAlert(err.msg, 'danger')));
            }
            dispatch({
                type: PROFILE_ERROR,
                payload: {msg: error.response.statusText, status: error.response.status}
            })
        }
    }

    export const addEducation = (formData, history) => async dispatch => {
        try{
            const config = {
                headers:{
                    'Content-type': 'application/json',
                    //'x-auth-token': localStorage.getItem('token')
                }
            }
        
            const body = JSON.stringify(formData);
        
            const res = await axios.put('/api/profile/education', body, config)
            dispatch({
                type: UPDATE_PROFILE,
                payload: res.data
            })
            dispatch(setAlert('Education added', 'success'))
            history.push('/dashboard')
        }catch(error){
            const errors = error.response.data.errors;
            if(errors){
                errors.forEach(err => dispatch(setAlert(err.msg, 'danger')));
            }
            dispatch({
                type: PROFILE_ERROR,
                payload: {msg: error.response.statusText, status: error.response.status}
            })
        }
    }