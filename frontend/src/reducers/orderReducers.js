

export const OrderReducer = (state={}, action)=>{
    switch(action.type){
        case "ORDER_CREATE_REQUEST":
            return{
                loading: true,
            }
        case "ORDER_CREATE_SUCCESS":
            return{
                loading: false, 
                success: true, 
                order: action.payload
            }
        case "ORDER_CREATE_FAIL":
            return{
                loading:false,
                error: action.payload
            }
        default:
            return state
    }
}

export const getAllOrderReducer = (state={ loading:true, orderItem:[], shippingAddress:[]}, action)=>{
    switch(action.type){
        case "ORDER_DETAIL_REQUEST":
            return{
                ...state,
                loading: true
            }
        case "ORDER_DETAIL_SUCCESS":
            return{
                ...state,
                loading: false,
                order: action.payload,
                
            }
        case "ORDER_DETAIL_FAIL":
            return{
                ...state,
                error: action.payload
            }
        default:
            return state
    }
}
export const updateOrderReducer = (state= {}, action)=>{
    switch(action.type){
        case "ORDER_UPDATE_REQUEST":
            return{
                loading: true
            }
        case "ORDER_UPDATE_SUCCESS":
            return{
                loading: false,
                success: true
            }
        case "ORDER_UPDATE_FAIL":
            return{
                loading: false,
                error: action.payload
            }
        case "ORDER_UPDATE_RESETE":
            return {}
        default:
            return state
    }
}

export const getAllUserOrderReducer = (state={orderList:[]}, action)=>{
    switch(action.type){
        case "ORDER_LIST_USER_REQUEST":
            return{
                loading: true
            }
        case "ORDER_LIST_USER_SUCCESS":
            return{
                loading: false,
                orderList: action.payload
            }
        case "ORDER_LIST_USER_FAIL":
            return{
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}