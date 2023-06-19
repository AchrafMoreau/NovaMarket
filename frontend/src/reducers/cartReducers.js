

export const cartReducer = (state={ cartItems : [] }, action)=>{

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
            console.log(action.payload)
            return{
                ...state,
                cartItems: state.cartItems.filter(elm=> elm.product !== action.payload )
            }
        default:
            return state
    }
}