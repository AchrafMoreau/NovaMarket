

export const cartReducer = (state={ cartItems : [], shippingAddress: {} }, action)=>{

    switch(action.type){
        case "CART_ADD_ITEM":
            const items = action.payload

            const existItem = state.cartItems.find(elm=> elm.product === items.product)

            if(existItem){
                return{
                    ...state,
                    cartItems: state.cartItems.map(elm=>
                        elm.product === existItem.product ? items : elm
                    )
                }
            }else{
                return{
                    ...state,
                    cartItems: [...state.cartItems, items]
                }
            }
        case "CART_REMOVE_ITEM":
            return{
                ...state,
                cartItems: state.cartItems.filter(elm=> elm.product !== action.payload )
            }
        case "CART_SAVE_SHIPPING_ADDRESS":
            return{
                ...state,
                shippingAddress: action.payload
            }
        case "CART_SAVE_PAYMENT_METHOD":
            return{
                ...state,
                paymentMethod: action.payload
            }
        case "CART_RESET":
            return{
                cartItems:[],
                shippingAddress: {}
            }
        default:
            return state
    }
}