import axios from "axios";

export const producstList = ()=> async (dispatch) =>{
    try{
        dispatch({type:"PRODUCT_LIST_REQUEST"})

        const { data } = await axios.get('http://localhost:3000/api/product/')

        dispatch({type: "PRODUCT_LIST_SECCESS", payload: data})


    }catch(err){
        dispatch({
            type: "PRODUCT_LIST_FAIL",
            payload: err.response && err.response.data.message ? err.response.data.message : err.message        
        })
    }
}  


export const ProductDetail = (id) => async (dispatch)=>{
    try{
        dispatch({type: "PRODUCT_DETAIL_REQUEST"})

        const { data } = await axios.get(`http://localhost:3000/api/product/${id}`)

        dispatch({type: "PRODUCT_DETAIL_SECCESS", payload: data})
    }catch(err){
        dispatch({
            type: "PRODUCT_DETAIL_FAIL",
            payload: err.response && err.response.data.message ? err.response.data.message : err.message        
        })
    }
}

export const adminDeleteProduct = (id)=> async(dispatch, getState)=>{
    try{
        dispatch({
            type:"DELETE_PRODUCT_REQUEST"
        })

        const {userLogin:{userInfo}} = getState()
        const config = {
            headers:{
                authorization: `Token ${userInfo.token}`
            }
        }
        
        await axios.delete(`http://localhost:3000/api/product/${id}`, config)

        dispatch({
            type:"DELETE_PRODUCT_SUCCESS"
        })

    }catch(err){
        dispatch({
            type:"DELETE_PRODUCT_FAIL",
            payload: err.response && err.response.data.message ? err.response.data.message : err.message
        })
    }
}

export const adminAddingProduct = ()=>async(dispatch, getState)=>{
    try{
        dispatch({
            type:"ADMIN_ADDING_PRODUCT_REQUEST"
        })
        const { userLogin: {userInfo} } = getState()
        
        const config = {
            headers:{
                "Content-Type": "application/json",
                "authorization": `Token ${userInfo.token}`,
            }
        }
        
        const { data } = await axios.post('http://localhost:3000/api/product',{}, config)
        dispatch({
            type:"ADMIN_ADDING_PRODUCT_SUCCESS",
            payload:data
        })

    }catch(err){
        dispatch({
            type:"ADMIN_ADDING_PRODUCT_FAIL",
            payload: err.response && err.response.data.message ? err.response.data.message : err.message
        })
    }
}
export const adminModifyProduct = ({product, id})=>async(dispatch, getState)=>{
    try{
        dispatch({
            type:"ADMIN_MODIFY_PRODUCT_REQUEST"
        })
        const {userLogin:{userInfo}} = getState()
        const config = {
            headers:{
                'Content-Type':"application/json",
                authorization: `Token ${userInfo.token}`
            }
        }
        const { data } = await axios.put(`http://localhost:3000/api/product/${id}`, product, config)
        dispatch({
            type:"ADMIN_MODIFY_PRODUCT_SUCCESS",
            payload:data
        })

    }catch(err){
        dispatch({
            type:"ADMIN_MODIFY_PRODUCT_FAIL",
            payload: err.response && err.response.data.message ? err.response.data.message : err.message
        })
    }
}