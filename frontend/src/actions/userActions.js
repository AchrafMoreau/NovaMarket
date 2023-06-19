import axios from "axios";


export const login = (email, password)=> async(dispatch)=>{
    try{
        dispatch({
            type: "USER_LOGIN_REQUEST"
        })
    
        const config = {
            Headers:{
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