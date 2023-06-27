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

export const getAllOrder = (id)=> async(dispatch, getState)=>{
    try{
        dispatch({
            type: "ORDER_DETAIL_REQUEST"
        })

        const { userLogin: { userInfo }} = getState()

        const config = {
            headers:{
                authorization: `Token ${userInfo.token}`
            }
        }

        const { data } = await axios.get(`http://localhost:3000/api/order/${id}`, config)

        dispatch({
            type: "ORDER_DETAIL_SUCCESS",
            payload: data
        })
    }catch(err){
        dispatch({
            type: "ORDER_DETAIL_FAIL",
            payload: err.response && err.response.data.message ? err.response.data.message : err.message
        })
    }
}

export const updateOrder = (id, paymentResult)=> async(dispatch, getState)=>{
    try{
        dispatch({
            type:"ORDER_UPDATE_REQUEST"
        })

        const {userLogin:{userInfo}} = getState()
        const config ={
            headers:{
                "Content-Type": "application/json",
                authorization : `Token ${userInfo.token}`
            }
        }

        const { data } = await axios.put(`http://localhost:3000/api/order/${id}/pay`, paymentResult, config) 

        dispatch({
            type: "ORDER_UPDATE_SUCCESS",
            payload: data
        })
    }catch(err){
        dispatch({
            type: "ORDER_DETAIL_FAIL",
            payload: err.response && err.response.data.message ? err.response.data.message : err.message
        })
    }
}

export const userOrders = ()=> async(dispatch, getState)=>{
    try{
        dispatch({
            type:"ORDER_LIST_USER_REQUEST"
        })

        const {userLogin: {userInfo}} = getState()
        const config = {
            headers:{
                authorization: `Token ${userInfo.token}`
            }
        }
        const { data } = await axios.get(`http://localhost:3000/api/order/myorders`, config)

        dispatch({
            type:"ORDER_LIST_USER_SUCCESS",
            payload: data
        })
    }catch(err){
        dispatch({
            type: "ORDER_LIST_USER_FAIL",
            payload: err.response && err.response.data.message ? err.response.data.message : err.message
        })
    }
}