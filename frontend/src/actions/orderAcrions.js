import axios from "axios"


export const createOrder = (order)=> async(dispatch, getState)=>{
    try{
        dispatch({
            type: "ORDER_CREATE_REQUEST"
        })

        const { userLogin:{ userInfo } } = getState()
        const config = {
            headers:{
                "Content-Type": "application/json",
                authorization : `Token ${userInfo.token}`
            }
        }
        const {data} = await axios.post("http://localhost:3000/api/order", order, config)

        dispatch({
            type: "ORDER_CREATE_SUCCESS",
            payload: data
        })

    }catch(err){
        dispatch({
            type: "ORDER_CREATE_FAIL",
            payload: err.response && err.response.data.message ? err.response.data.message : err.message
        })
    }


}