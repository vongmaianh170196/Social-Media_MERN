import { GET_PROFILE, PROFILE_ERROR, CLEAR_PROFILE, CREATE_PROFILE, UPDATE_PROFILE } from "../actions/types";

const initialSate = {
    profile: null,
    profiles: [],
    repos: [],
    loading: true,
    error: {}
}

export default function(state = initialSate, action){
    const {type, payload} = action;
    
    switch(type){
        case GET_PROFILE:
        case UPDATE_PROFILE:
            return {
                ...state,
                profile: payload,
                loading: false
            }
        case PROFILE_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            }
        case CLEAR_PROFILE:
            return {
                ...state,
                profile: null,
                repos:[],
                loading: null
            }
        case CREATE_PROFILE:
            return {
                ...state,
                profile: payload,
                //profiles: [...state.profiles, payload]
            }
        
        default:
            return state;
    }
}