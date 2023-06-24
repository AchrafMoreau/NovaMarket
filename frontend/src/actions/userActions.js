import axios from "axios";


export const login = (email, password)=> async(dispatch)=>{
    try{
        dispatch({
            type: "USER_LOGIN_REQUEST"
        })
    
        const config = {
            headers:{
                "Content-Type": "application/json"
            }
        }
        const { data } = await axios.post("http://localhost:3000/api/user/login", {email, password},config)

        dispatch({
            type: "USER_LOGIN_SUCCESS",
            payload: data
        })

        localStorage.setItem("userInfo", JSON.stringify(data))
    }catch(err){
        dispatch({
            type: "USER_LOGIN_FAIL",
            payload: err.response && err.response.data.message ? err.response.data.message : err.message
        })
    }
}

export const logout = ()=> async(dispatch)=>{
    localStorage.removeItem("userInfo")
    dispatch({
        type: "USER_LOGOUT"
    })
}

export const register = (name, email, password)=> async(dispatch)=>{
    try{


        dispatch({
            type: "USER_REGISTER_LOADING"
        })
        const config = {
            headers:{
                "Content-Type": "application/json"
            }
        }
        const { data } = await axios.post("http://localhost:3000/api/user/register",{name, email, password}, config)
        
        

        dispatch({
            type: "USER_REGISTER_SUCCESS",
            payload : data
        })

        dispatch({
            type: "USER_LOGIN_SUCCESS",
            payload: data
        })

        localStorage.setItem("userInfo", JSON.stringify(data))
    }catch(err){
        dispatch({
            type: "USER_REGISTER_FAIL",
            payload: err.response && err.response.data.message ? err.response.data.message : err.message
        })
    }
}
export const getUserDetails = (id)=> async(dispatch, getState)=>{
    try{
        dispatch({
            type: "USER_DETAILS_LOADING"
        })

        const { userLogin:{ userInfo } } = getState()
        const config = {
            headers:{
                "Content-Type": "application/json",
                authorization : `Token ${userInfo.token}`
            }
        }
        const { data } =await axios.get(`http://localhost:3000/api/user/${id}`, config)

        dispatch({
            type: "USER_DETAILS_SUCCESS",
            payload: data
        })
        
    }catch(err){
        dispatch({
            type: "USER_REGISTER_FAIL",
            payload: err.response && err.response.data.message ? err.response.data.message : err.message
        })
    }
}

export const userUpdateProfile = (user) => async(dispatch, getState)=>{
    try{
        dispatch({
            type: "USER_UPDATE_LOADING"
        })


        const { userLogin: {userInfo} } = getState()
        const config = {
            headers:{
                "Content-Type": "application/json",
                authorization: `Token ${userInfo.token}`
            }
        }

        const { data } = await axios.put("http://localhost:3000/api/user/profile", user, config)

        dispatch({
            type: "USER_UPDATE_SUCCESS",
            payload: data
        })

    }catch(err){
        dispatch({
            type: "USER_UPDATE_FAIL",
            payload: err.response && err.response.data.message ? err.response.data.message : err.message
        })
    }
}