import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk  from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { ReducerProductList,RuduceProductDetail, adminAddingProductReducer, adminModifyProductReducer, deleteProductReducer } from './reducers/productReducers'
import { cartReducer } from './reducers/cartReducers';
import {  AdminUpdateUserReducer,
    removeUserReducer, 
    userDetailsReducer, 
    userLoginReducer, 
    userRigesterReducer,
    userUpdateProfileReducer,
    usersListReducer
} from './reducers/userReducers';
import { OrderReducer,
        getAllOrderReducer,
        getAllUserOrderReducer,
        updateOrderReducer
    } from './reducers/orderReducers';
 
const reducer = combineReducers({
    ProductList: ReducerProductList,
    productDetail : RuduceProductDetail,
    deleteProduct: deleteProductReducer,
    addProduct: adminAddingProductReducer,
    modifyProduct: adminModifyProductReducer,
    cart: cartReducer,
    userLogin : userLoginReducer,
    userRegister : userRigesterReducer,
    userDetails : userDetailsReducer,
    userUpdate: userUpdateProfileReducer,
    adminUpdate: AdminUpdateUserReducer,
    usersList :usersListReducer,
    deleteUser: removeUserReducer,
    placeOrder : OrderReducer,
    orderDetail : getAllOrderReducer,
    orderPay: updateOrderReducer,
    orderUserList: getAllUserOrderReducer
})


// get item from localstorage
const cartItemFromStorage = localStorage.getItem('cartitems') ? JSON.parse(localStorage.getItem('cartitems')) : []
const userInfoFromStorage = localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null
const shippingAddressFromStorage = localStorage.getItem("saveShipping") ? JSON.parse(localStorage.getItem("saveShipping")) : {}
const paymentMethodFromStorage = localStorage.getItem("paymentMethod") ? JSON.parse(localStorage.getItem("paymentMethod")) : {}

const initialState = {
    cart:{
        cartItems: cartItemFromStorage,
        shippingAddress: shippingAddressFromStorage,
        paymentMethod: paymentMethodFromStorage,
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