import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk  from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { ReducerProductList,RuduceProductDetail } from './reducers/productReducers'
import { cartReducer } from './reducers/cartReducers';
import { useReducer } from './reducers/userReducers';

const reducer = combineReducers({
    ProductList: ReducerProductList,
    productDetail : RuduceProductDetail,
    cart: cartReducer,
    userLogin : useReducer
})


// get item from localstorage
const cartItemFromStorage = localStorage.getItem('cartitems') ? JSON.parse(localStorage.getItem('cartitems')) : []
const userInfoFromStorage = localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null


const initialState = {
    cart:{
        cartItems: cartItemFromStorage
    },
    userLogin:{
        userInfo: userInfoFromStorage
    }
}


const middleware = [thunk]


const store = createStore(
    reducer, 
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))   
)

export default store