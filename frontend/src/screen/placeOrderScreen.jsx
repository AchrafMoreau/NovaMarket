import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Message } from '../component/error'
import {Loading} from "../component/loading"
import { useDispatch, useSelector } from 'react-redux'
import { CheckoutSteps } from '../component/checkout'
import { createOrder } from '../actions/orderAcrions'

export const PlaceOrder = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate("/")

    const addDicimal = (num)=>{
        return (Math.round(num * 100) / 100).toFixed(2) 
    }
    const cart = useSelector(state=> state.cart)

    cart.itemsPrice = addDicimal(cart.cartItems.reduce((accu, item)=> accu + item.price * item.qty, 0)) 
    cart.shippingPrice = addDicimal((cart.itemsPrice < 100) ? 0 : 100)
    cart.tax = addDicimal(Number((cart.itemsPrice * 0.15).toFixed(2)))
    const {tax, shippingPrice, itemsPrice } = cart
    cart.total = addDicimal(Number(itemsPrice) +Number(shippingPrice)+ Number(tax))


    const placeOrder = useSelector(state=> state.placeOrder)
    const { order, error, success, loading }= placeOrder


    useEffect(()=>{
        if(success){
            navigate(`/order/${order._id}`)
        }
    },[navigate, success])

    const createOrderHandler = ()=>{
        const {
            total,
            cartItems,
            shippingAddress,
            paymentMethod,
        } = cart

        dispatch(createOrder({
            itemsPrice,
            shippingPrice,
            tax,
            total,
            cartItems,
            shippingAddress,
            paymentMethod,
        }))
    }

    return (
        <div className="container" style={{paddingTop:"6rem"}}>
            <CheckoutSteps step1 step2 step3 step4/>
            {loading && <Loading />}
            <div className="row text-center my-5">
                <h1>Place order</h1>
            </div>
            <div className="row mb-5">
                <ul className="list-group list-group-flush mt-5 col-8">
                    <li className="list-group-item infoOrderCard">
                        <h2>Shipping</h2>
                        <strong>Address: </strong>
                        {cart.shippingAddress.address}, {cart.shippingAddress.city}, {cart.shippingAddress.ZIP}, {cart.shippingAddress.country}
                    </li>
                    <li className="list-group-item infoOrderCard">
                        <h2>Payment</h2>
                        <strong>method: </strong>
                        {cart.paymentMethod}
                    </li>
                    <li className="list-group-item infoOrderCard">
                        <h2>Order Items</h2>
                        {cart.cartItems.length === 0 ? <Message variant={"alert-danger"} children={"No Item... Your Cart Is Empty "}/> :
                        (
                            <ul className="list-group  list-group-flush mt-5">
                                {cart.cartItems.map((elm, index)=>{
                                    return(
                                        <li key={index} className="list-group-item infoProductCard">
                                            <div className="row d-flex align-items-center">
                                                <div className="col-md-2">
                                                    <img src={elm.image} alt={elm.name} className="img-fluid rounded" />
                                                </div>
                                                <div className="col">
                                                    <Link to={`/product/${elm.product}`}>{elm.name}</Link>
                                                </div>
                                                <div className="col-md-4 price">
                                                    {elm.qty} x ${elm.price} <br></br>= ${(elm.qty * elm.price).toFixed(2)}
                                                </div>
                                                
                                            </div>
                                        </li>
                                    )
                                })}
                            </ul>
                        )}
                    </li>
                    
                </ul>
                
                <ul className="list-group col-4 summaryCard">
                    
                    <li className="list-group-item">
                        <h2>Order Summary</h2>
                    </li>
                    <li className="list-group-item d-flex">
                        <div className="col-6">
                            Items
                        </div>
                        <div className="col-6">
                            ${cart.itemsPrice}
                        </div>
                    </li>
                    <li className="list-group-item d-flex">
                        <div className="col-6">
                            Shipping
                        </div>
                        <div className="col-6">
                            ${cart.shippingPrice}
                        </div>
                    </li>
                    <li className="list-group-item d-flex">
                        <div className="col-6">
                            Tax
                        </div>
                        <div className="col-6">
                            ${cart.tax}
                        </div>
                    </li>
                    <li className="list-group-item d-flex">
                        <div className="col-6 ">
                            Total
                        </div>
                        <div className="col-6">
                            ${cart.total}
                        </div>
                    </li>
                    <li className="list-group-item ">
                        {error && <Message variant={'alert-danger'} children={error} />}
                        <button  type='button' onClick={createOrderHandler} className='checkoutBtn' >
                            Proceed To Checkout
                        </button>
                    </li>
                </ul>
            </div>
        </div>
  )
}
