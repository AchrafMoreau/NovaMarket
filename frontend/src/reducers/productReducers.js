export const ReducerProductList = (state={ products: []}, action)=>{
    switch(action.type){
        case "PRODUCT_LIST_REQUEST":
            return { loading: true, products: []}
        case "PRODUCT_LIST_SECCESS":
            return { loading: false, products: action.payload}
        case "PRODUCT_LIST_FAIL" :
            return { loading: false, err: action.payload}
        default:
            return state
    }
} 

export const RuduceProductDetail = (state={product : {reviews: []}}, action) =>{
    switch(action.type){
        case "PRODUCT_DETAIL_REQUEST":
            return {loading : true, ...state}
        case "PRODUCT_DETAIL_SECCESS":
            return {loading: false, product: action.payload}
        case "PRODUCT_DETAIL_FAIL":
            return {loading: false , err: action.payload}
        default:
            return state
    }
}

export const deleteProductReducer = (state={}, action)=>{
    switch(action.type){
        case "DELETE_PRODUCT_REQUEST":
            return{
                loading:true
            }
        case "DELETE_PRODUCT_SUCCESS":
            return{
                loading:false,
                success: true
            }
        case "DELETE_PRODUCT_FAIL":
            return{
                loading:false,
                error: action.payload
            }
        default:
            return state
    }
}