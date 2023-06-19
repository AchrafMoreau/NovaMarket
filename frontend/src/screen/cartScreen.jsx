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
        navigate("/login?redirect=shipping")
    }


    return (
        <>
            <div className="row">
                <div className="col-md-8">
                    <h1 className='mt-3 mb-5'>Shopping Cart</h1>
                    {cartItems.length === 0
                        ? 
                        <div className="row" >
                            <div className="alert alert-info">
                                Your Cart Is Empty <Link to='/' >Go Back</Link>
                            </div>
                        </div>
                        
                        : (
                            <ul className="list-group ">
                                {cartItems.map((elm)=>{
                                    return(
                                        <li key={elm.product} className="list-group-item">
                                            <div className="row">
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
                                                    <select className="form-select" value={elm.qty} onChange={(e)=> dispatsh(addToCart(elm.product, Number(e.target.value)))} >
                                                        {[...Array(elm.countInStock).keys()].map(elm=>{
                                                            return(
                                                                <option value={elm +1} key={elm + 1}>
                                                                    {elm + 1}
                                                                </option>
                                                            )
                                                        })}
                                                    </select>
                                                </div>
                                                <div className="col-md-2">
                                                    <button className='btn btn-light' onClick={(e)=>removeFromCartHandler(elm.product)}>
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
                    
                    <ul className="list-group  mt-5">
                        <li className="list-group-item">
                            <h3>Subtotal({cartItems.reduce((acc, item)=>acc + item.qty, 0)}) Items</h3>
                            <p>$ {cartItems.reduce((acc, item)=> acc + (item.qty * item.price), 0).toFixed(2)}</p>
                        </li>
                        <li className="list-group-item  ">
                            <button onClick={checkOutHandler} type='button' className='btn btn-primary w-100' disabled={cartItems.length === 0 }>
                                Proceed To Checkout
                            </button>
                        </li>
                    </ul>
                    

                </div>
            </div>
        </>
    )
}
