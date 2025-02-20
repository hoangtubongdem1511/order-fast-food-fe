import axios from "axios"
import { LOGIN_SUCCESS, REGISTER_REQUEST, REGISTER_SUCCESS, LOGIN_REQUEST, GET_USER_REQUEST, ADD_TO_FAVORITE_REQUEST, ADD_TO_FAVORITE_SUCCESS, LOGOUT, REGISTER_FAILURE, LOGIN_FAILURE, GET_USER_SUCCESS, GET_USER_FAILURE, ADD_TO_FAVORITE_FAILURE } from "./ActionType"
import { api, API_URL } from "../../config/api"

export const registerUser = (reqData) => async (dispatch) => {
    dispatch ({type: REGISTER_REQUEST})
    try {
        const {data} = await axios.post(`${API_URL}/auth/signup`, reqData.userData);
        if(data.jwt)localStorage.setItem("jwt", data.jwt);
        if(data.role === "ROLE_RESTAURANT_OWNER") {
            reqData.navigate("/admin/restaurants")
        }
        else {
            reqData.navigate("/")
        }
        dispatch({type: REGISTER_SUCCESS, payload: data.jwt})
        console.log("register success" , data)

    } catch (error) {
        dispatch({type: REGISTER_FAILURE, payload: error})
        console.log("error" , error)
    }
}

// export const loginUser = (reqData) => async (dispatch) => {
//     dispatch ({type: LOGIN_REQUEST})
//     try {
//         const {data} = await axios.post(`${API_URL}/auth/signin`, reqData.userData)
//         if(data.jwt) {
//             localStorage.setItem("jwt", data.jwt);
//         }
//         if(data.role === "ROLE_RESTAURANT_OWNER") {
//             reqData.navigate("/admin/restaurant")
//         }
//         else {
//             reqData.navigate("/")
//         }
//         dispatch({type: LOGIN_SUCCESS, payload: data})
//         console.log("login success" , data)
//     } catch (error) {
//         dispatch({type: LOGIN_FAILURE, payload: error})
//         console.log("error" , error)
//     }
// }

// export const getUser = (jwt) => async (dispatch) => {
//     dispatch ({type: GET_USER_REQUEST})
//     try {
//         const {data} = await api.get(`/api/users/profile`, {
//             headers:{
//                 Authorization: `Bearer ${jwt}`
//             }
//         })
        
//         dispatch({type: GET_USER_SUCCESS, payload: data})
//         console.log("user profile" , data)

//     } catch (error) {
//         dispatch({type: GET_USER_FAILURE, payload: error})
//         console.log("error" , error)
//     }
// }

export const loginUser = (reqData) => async (dispatch) => {
    try {
        const { data } = await axios.post(`${API_URL}/auth/signin`, reqData.userData);
        if (data.jwt) {
            localStorage.setItem("jwt", data.jwt);
            dispatch({ type: LOGIN_SUCCESS, payload: data.jwt });
            reqData.navigate(data.role === "ROLE_RESTAURANT_OWNER" ? "/" : "/"); //"/admin/restaurants"
            // Dispatch getUser action after successful login
            dispatch(getUser());
        }
    } catch (error) {
        dispatch({ type: LOGIN_FAILURE, payload: error.response ? error.response.data : error.message });
        console.log("error", error);
    }
};

export const getUser = () => async (dispatch) => {
    dispatch({ type: GET_USER_REQUEST });
    const jwt = localStorage.getItem("jwt");
    if (!jwt) {
        dispatch({ type: GET_USER_FAILURE, payload: "JWT token not found" });
        return;
    }
    try {
        const { data } = await axios.get(`${API_URL}/api/users/profile`, {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        });
        dispatch({ type: GET_USER_SUCCESS, payload: data });
        console.log("user profile", data);
    } catch (error) {
        dispatch({ type: GET_USER_FAILURE, payload: error.response ? error.response.data : error.message });
        console.log("error", error);
    }
};

export const addToFavorite = ({jwt , restaurantId}) => async (dispatch) => {
    dispatch ({type: ADD_TO_FAVORITE_REQUEST})
    try {
        const {data} = await api.put(`/api/restaurants/${restaurantId}/add-favorites`, {} , {
            headers:{
                Authorization: `Bearer ${jwt}`
            }
        })
        
        dispatch({type: ADD_TO_FAVORITE_SUCCESS, payload: data})
        console.log("add to favorite" , data)

    } catch (error) {
        dispatch({type: ADD_TO_FAVORITE_FAILURE, payload: error})
        console.log("error" , error)
    }
}

export const logout = () => async (dispatch) => {
    try {
        
        localStorage.clear();
        dispatch({type: LOGOUT})
        console.log("logout success")

    } catch (error) {
        console.log("error" , error)
    }
}
