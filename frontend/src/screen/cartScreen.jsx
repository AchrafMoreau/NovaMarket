import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { addToCart, removeFromCart } from '../actions/cartActions'


export const CartScreen = () => {

    const navigate = useNavigate()
    const { id } = useParams()
    const qty = useLocation().search ? Number(useLocation().search.split("=")[1]) : 1

    const dispatsh = useDispatch()
    
    const cart = useSelector(state => state.cart)
    const { cartItems } = cart
    

    useEffect(()=>{
        dispatsh(addToCart(id, qty))
    },[dispatsh, id, qty])

    const removeFromCartHandler = (prodId)=>{
        dispatsh(removeFromCart(prodId))
    }

    
    const checkOutHandler = ()=>{
        navigate("/login/?redirect=/shipping")
    }

    const plusHandler = (id, stock)=>{
        const myelem = document.getElementById(id)
        myelem.value < stock ? myelem.value++ : myelem.value
        // console.log(myelem.value, id)
        dispatsh(addToCart(id, Number(myelem.value)))
    }
    const minusHandler = (id, stock)=>{
        const myelem = document.getElementById(id)
        myelem.value > 1 ? myelem.value-- : myelem.value
        dispatsh(addToCart(id, Number(myelem.value)))
    }
    return (
        <>
            <div className="container">

                <div className="row" style={{paddingTop:"6rem", minHeight:"100vh"}}>
                    <div className="col-md-8">
                        <h1 className='mt-3 mb-5'>Shopping Cart</h1>
                        {cartItems.length === 0
                            ? 
                            <div className="row "  >
                                <div className="alert alert-info">
                                    Your Cart Is Empty <Link to='/' >Go Back</Link>
                                </div>
                            </div>
                            
                            : (
                                <ul className="list-group " id='card'>
                                    {cartItems.map((elm)=>{
                                        return(
                                            <li key={elm.product} className="list-group-item infoProductCard">
                                                <div className="row d-flex align-items-center">
                                                    <div className="col-md-2">
                                                        <img src={elm.image} alt={elm.name} className="img-fluid" />
                                                    </div>
                                                    <div className="col-md-3">
                                                        <Link to={`/product/${elm.product}`}>{elm.name}</Link>
                                                    </div>
                                                    <div className="col-md-2">
                                                        ${(elm.price * elm.qty).toFixed(2)}
                                                    </div>
                                                    <div className="col-md-3"> 
                                                        <div class="quantity buttons_added">
                                                            <input type="button" value="-" class="minus" onClick={()=>minusHandler(elm.product, elm.countInStock)}/>
                                                            <input type="number" step="1" min="1"  name="quantity" value={elm.qty} id={elm.product}  class="input-text qty text" size="4" pattern="" inputmode="" onChange={(e)=> dispatsh(addToCart(elm.product, Number(e.target.value)))}/>
                                                            <input type="button" value="+" class="plus" onClick={()=>plusHandler(elm.product, elm.countInStock)}/>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-2">
                                                        <button className='button' onClick={(e)=>removeFromCartHandler(elm.product)}>
                                                            <i className="fas fa-trash"></i>
                                                        </button>
                                                    </div>
                                                </div>
                                            </li>
                                        )
                                    })}
                                </ul>
                            )

                        }
                    </div>
                    <div className="col-md-4">
                        
                        <ul className="list-group  mt-5 summaryCard">
                            <li className="list-group-item ">
                                <h3>Subtotal({cartItems.reduce((acc, item)=>acc + item.qty, 0)}) Items</h3>
                                <p>$ {cartItems.reduce((acc, item)=> acc + (item.qty * item.price), 0).toFixed(2)}</p>
                            </li>
                            <li className="list-group-item  ">
                                <button onClick={checkOutHandler} type='button' className='checkoutBtn my-2' disabled={cartItems.length === 0 }>
                                    Proceed To Checkout
                                </button>
                            </li>
                        </ul>
                        

                    </div>
                </div>
            </div>
        </>
    )
}
