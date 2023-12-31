import axios from 'axios'

export const addToCart = (id, qty) => async(dispatsh, getState)=>{
    
    const { data } = await axios.get(`http://localhost:3000/api/product/${id}`)
    console.log("this's the countStock from backend: ",data.countInStock)
    dispatsh({
        type: "CART_ADD_ITEM",
        payload: {
            product: data._id,
            name: data.name,
            image: data.image,
            price: data.price,
            countInStock : data.countInStock,
            qty
        }
    })

    localStorage.setItem("cartitems", JSON.stringify(getState().cart.cartItems))
} 
 
export const removeFromCart = (id) => async(dispatsh, getsate)=>{
    dispatsh({
        type: "CART_REMOVE_ITEM",
        payload:id
    })

    localStorage.setItem("cartItems", getsate().cart.cartItems)
}
export const shippingAddressCart = (data)=> async(dispatsh)=>{
    dispatsh({
        type:"CART_SAVE_SHIPPING_ADDRESS",
        payload: data
    })

    localStorage.setItem("saveShipping", JSON.stringify(data))
}

export const paymentMethods = (data)=> async(dispatsh)=>{
    dispatsh({
        type:"CART_SAVE_PAYMENT_METHOD",
        payload: data
    })

    localStorage.setItem("paymentMethod", JSON.stringify(data))
}