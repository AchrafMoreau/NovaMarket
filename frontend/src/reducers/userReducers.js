export const userLoginReducer = (state={}, action) =>{
    switch(action.type){
        case "USER_LOGIN_REQUEST":
            return{
                loading: true
            }
        case "USER_LOGIN_SUCCESS":
            return{
                loading: false, userInfo: action.payload
            }
        case "USER_LOGIN_FAIL":
            return{
                loading: false, error: action.payload
            }
        case "USER_LOGOUT":
            return {}
        default:
            return state
    }
}


export const userRigesterReducer = (state= {}, action)=>{
    switch(action.type){
        case "USER_REGISTER_LOADING":
            return{
                loading: true
            }
        case "USER_REGISTER_SUCCESS":
            return{
                loading: false, userInfo: action.payload
            }
        case "USER_REGISTER_FAIL":
            return{
                loading: false, error: action.payload
            }
        default:
            return state
    }

}

export const userDetailsReducer = (state={ user: {}}, action)=>{
    switch(action.type){
        case "USER_DETAILS_LOADING":
            return{
                ...state, loading: true
            }
        case "USER_DETAILS_SUCCESS":
            return{
                loading: false, user: action.payload
            }
        case "USER_DETAILS_FAIL":
            return{
                loading:false, error:action.payload
            }
        case "USER_DETAILS_RESET":
            return { user: {}}
        default:
            return state
    }
}

export const userUpdateProfileReducer = (state={}, action) =>{
    switch(action.type){
        case "USER_UPDATE_LOADING":
            return{
                loading: true
            }
        case "USER_UPDATE_SUCCESS":
            return{
                loading: false, success: true , user: action.payload
            }
        case "USER_UPDATE_FAIL":
            return{
                loading:false , error: action.payload
            }
        default:
            return state
    }
}

export const usersListReducer = (state={users: []}, action)=>{
    switch(action.type){
        case "USERS_LIST_REQUEST":
            return{
                loading: true
            }
        case "USERS_LIST_SUCCESS":
            return{
                loading: false,
                users: action.payload
            }
        case "USERS_LIST_FAIL":
            return{
                loading:false,
                error: action.payload
            }
        default:
            return state
    }
}