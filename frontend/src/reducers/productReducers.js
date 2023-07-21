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

export const adminAddingProductReducer = (state={ product:{}}, action)=>{
    switch(action.type){
        case "ADMIN_ADDING_PRODUCT_REQUEST":
            return{
                loading:true
            }
        case "ADMIN_ADDING_PRODUCT_SUCCESS":
            return{
                loading:false,
                product: action.payload,
                success:true
            }
        case "ADMIN_ADDING_PRODUCT_FAIL":
            return{
                loading:false,
                error: action.payload
            }
        case "ADMIN_ADDING_PRODUCT_RESET":
            return { product:{}}
        default:
            return state
    }
}

export const adminModifyProductReducer = (state={product:{}}, action)=>{
    switch(action.type){
        case "ADMIN_MODIFY_PRODUCT_REQUEST":
            return{
                loading:true
            }
        case "ADMIN_MODIFY_PRODUCT_SUCCESS":
            return{
                loading:false,
                product: action.payload,
                success: true
            }
        case "ADMIN_MODIFY_PRODUCT_FAIL":
            return{
                loading:false,
                error:action.payload
            }
        case "ADMIN_MODIFY_PRODUCT_RESER":
            return {}
        default:
            return state
    }
}

export const creatingProductReviewReducer = (state={}, action)=>{
    switch(action.type){
        case "CREATE_PRODUCT_REVIEW_REQUEST":
            return {
                loading: true
            }
        case "CREATE_PRODUCT_REVIEW_SUCCESS":
            return{
                loading:false,
                success:true
            }
        case "CREATE_PRODUCT_REVIEW_FAIL":
            return{
                loading:false,
                error: action.payload
            }
        case "CREATE_PRODUCT_REVIEW_RESET":
            return {}
        default:
            return state
    }
}