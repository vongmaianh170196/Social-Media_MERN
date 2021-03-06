import axios from 'axios';
import {setAlert} from './alert';
import {
    GET_POSTS,
    POST_ERROR,
    UPDATE_LIKES,
    DELETE_POST,
    ADD_POST,
    GET_POST,
    ADD_COMMENT,
    REMOVE_COMMENT
} from './types';

//Post
export const getPosts = () => async dispatch => {
    try{
        const res = await axios.get('/api/posts');

        dispatch({
            type: GET_POSTS,
            payload: res.data
        })
    }catch(error){
        dispatch({
            type: POST_ERROR,
            payload: {msg: error.response.statusText, status: error.response.status}
        })
    }
}
export const deletePost = post_id => async dispatch => {
    try{
        await axios.delete(`/api/posts/${post_id}`);

        dispatch({
            type: DELETE_POST,
            payload: post_id
        })
        dispatch(setAlert('Post removed', 'success'))
    }catch(error){
        dispatch({
            type: POST_ERROR,
            payload: {msg: error.response.statusText, status: error.response.status}
        })
    }
}
export const addPost = formData => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    try{
        const res = await axios.post(`/api/posts`, formData, config);

        dispatch({
            type: ADD_POST,
            payload: res.data
        })
        dispatch(setAlert('Post created', 'success'))
    }catch(error){
        dispatch({
            type: POST_ERROR,
            payload: {msg: error.response.statusText, status: error.response.status}
        })
    }
}
export const getPost = post_id => async dispatch => {
    try{
        const res = await axios.get(`/api/posts/${post_id}`);

        dispatch({
            type: GET_POST,
            payload: res.data
        })
    }catch(error){
        dispatch({
            type: POST_ERROR,
            payload: {msg: error.response.statusText, status: error.response.status}
        })
    }
}
//Likes
export const addLike = post_id => async dispatch => {
    try{
        const res = await axios.put(`/api/posts/like/${post_id}`);

        dispatch({
            type: UPDATE_LIKES,
            payload: {post_id, likes: res.data}
        })
    }catch(error){
        dispatch({
            type: POST_ERROR,
            payload: {msg: error.response.statusText, status: error.response.status}
        })
    }
}
export const removeLike = post_id => async dispatch => {
    try{
        const res = await axios.put(`/api/posts/unlike/${post_id}`);

        dispatch({
            type: UPDATE_LIKES,
            payload: {post_id, likes: res.data}
        })
    }catch(error){
        dispatch({
            type: POST_ERROR,
            payload: {msg: error.response.statusText, status: error.response.status}
        })
    }
}
//Comments
export const addComment = (post_id, formData) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    try{
        const res = await axios.post(`/api/posts/comment/${post_id}`, formData, config);

        dispatch({
            type: ADD_COMMENT,
            payload: res.data
        })
        dispatch(setAlert('Comment created', 'success'))
    }catch(error){
        dispatch({
            type: POST_ERROR,
            payload: {msg: error.response.statusText, status: error.response.status}
        })
    }
}
export const deleteComment = (post_id, comment_id) => async dispatch => {
    
    try{
         await axios.delete(`/api/posts/comment/${post_id}/${comment_id}`);

        dispatch({
            type: REMOVE_COMMENT,
            payload: comment_id
        })
        dispatch(setAlert('Comment removed', 'success'))
    }catch(error){
        dispatch({
            type: POST_ERROR,
            payload: {msg: error.response.statusText, status: error.response.status}
        })
    }
}