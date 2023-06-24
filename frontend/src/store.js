import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk  from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { ReducerProductList,RuduceProductDetail } from './reducers/productReducers'
import { cartReducer } from './reducers/cartReducers';
import { userDetailsReducer, 
    userLoginReducer, 
    userRigesterReducer,
    userUpdateProfileReducer
} from './reducers/userReducers';
 
const reducer = combineReducers({
    ProductList: ReducerProductList,
    productDetail : RuduceProductDetail,
    cart: cartReducer,
    userLogin : userLoginReducer,
    userRegister : userRigesterReducer,
    userDetails : userDetailsReducer,
    userUpdate: userUpdateProfileReducer,
})


// get item from localstorage
const cartItemFromStorage = localStorage.getItem('cartitems') ? JSON.parse(localStorage.getItem('cartitems')) : []
const userInfoFromStorage = localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null
const shippingAddressFromStorage = localStorage.getItem("saveShipping") ? JSON.parse(localStorage.getItem("saveShipping")) : {}

const initialState = {
    cart:{
        cartItems: cartItemFromStorage,
        shippingAddress: shippingAddressFromStorage
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