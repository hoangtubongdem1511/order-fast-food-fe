import { isPresentInFavorite } from "../../config/logic"
import { REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, GET_USER_REQUEST, GET_USER_FAILURE, ADD_TO_FAVORITE_REQUEST, ADD_TO_FAVORITE_SUCCESS, ADD_TO_FAVORITE_FAILURE, GET_USER_SUCCESS, LOGOUT } from "./ActionType"

const initialState = {
    user: null,
    isLoading:false,
    error: null,
    jwt: null,
    favorites: [],
    success: null
}

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case REGISTER_REQUEST:
        case LOGIN_REQUEST:
        case GET_USER_REQUEST:
        case ADD_TO_FAVORITE_REQUEST:
            return {...state, isLoading: true, error: null , success: null};
        
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            return {...state, isLoading: false, jwt: action.payload , success: "register success"};
        case GET_USER_SUCCESS:
            return {...state, isLoading: false, user: action.payload , favorites:action.payload.favorites};

        case ADD_TO_FAVORITE_SUCCESS:
            return {
                ...state, 
                isLoading: false, 
                error: null,  
                favorites: isPresentInFavorite(state.favorites , action.payload)
                ? state.favorites.filter((item) => item.id !== action.payload.id) 
                : [action.payload, ...state.favorites],
                success: "add to favorite success"};

        case LOGOUT:
            return initialState;

        case REGISTER_FAILURE:
        case LOGIN_FAILURE:
        case GET_USER_FAILURE:
        case ADD_TO_FAVORITE_FAILURE:
            return {
                ...state, 
                isLoading: false, 
                error: action.payload , 
                success: null
            };
        default:
            return state;
    }
}