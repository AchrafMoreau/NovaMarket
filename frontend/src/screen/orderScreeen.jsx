import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Message } from '../component/error'
import { PayPalButton } from 'react-paypal-button-v2'
import {Loading} from "../component/loading"
import { useDispatch, useSelector } from 'react-redux'
import { createOrder, getAllOrder, updateOrder } from '../actions/orderAcrions'
import axios from 'axios'

export const AllOrdersScreen = () => {


    const [sdkReady, setSdkReady] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate("/")

    const {id} = useParams()

    const orderDetail = useSelector(state=> state.orderDetail)
    const { loading, error, order } = orderDetail

    const orderPay = useSelector(state=> state.orderPay)
    const {loading: payloading, success:paysuccess} = orderPay

    useEffect(()=>{
        const addPaypalScript = async()=>{
            const {data : configApi} = await axios.get("http://localhost:3000/api/config/paypal")
            const script = document.createElement("script")
            script.type = 'text/javascript'
            script.src = `https://www.paypal.com/sdk/js?client-id=${configApi}`
            script.async = true
            script.onload = ()=>{
                setSdkReady(true)
            }
            document.body.appendChild(script)
        }

        if(!order ||paysuccess ){
            dispatch({ type: "ORDER_UPDATE_RESETE"})
            dispatch(getAllOrder(id))
        }else if(!order.isPaid){
            if(!window.paypal){
                addPaypalScript()
            }else{
                setSdkReady(true)
            }
        }

    },[dispatch, id, paysuccess, order])

    console.log(payloading, loading)
    const successPaymentHandler = (paymentResult)=>{
        console.log(paymentResult)
        dispatch(updateOrder(id, paymentResult))
    }
   
    return loading ? <Loading /> : error ? <Message variant={"aler-danger"} children={error} /> : 
    <>
        <div className="container">
                <div className="row text-center mt-3">
                    <h1>Place order</h1>
                </div>
                <div className="row">
                    <ul className="list-group list-group-flush mt-5 col-8">
                        <li className="list-group-item">
                            <h2>Shipping</h2>
                            <div className="name">
                                <strong>Name: </strong>{""}
                                {order.user.name}
                            </div>
                            <div className="email">
                                <strong>Email: </strong>{" "} 
                                <a href={`MAILTO:${order.user.email}`}>{order.user.email}</a>
                            </div>
                            <strong>Address: </strong>
                            {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.ZIP}, {order.shippingAddress.country}
                            <div className="errMsg mt-3">
                                {order.isDeliverd ? <Message variant={"alert-success"} children={"Order Was Delivered"}/> : <Message variant={"alert-danger"} children={"The Order Has Not Been Delivered Yet"} />}
                            </div>
                        </li>

                        <li className="list-group-item">
                            <h2>Payment</h2>
                            <strong>Method: </strong>
                            {order.paymentMethod}
                            <div className="errMsg mt-3">
                                {order.isPaid ? <Message variant={"alert-success"} children={"Order Was Paid"}/> : <Message variant={"alert-danger"} children={"The order has not been paid yet"} />}
                            </div>
                        </li>
                        <li className="list-group-item">
                            <h2>Order Items</h2>
                            {order.orderItem.length === 0 ? <Message variant={"alert-danger"} children={"No Item... Your order Is Empty "}/> :
                            (
                                <ul className="list-group  list-group-flush mt-5">
                                    {order.orderItem.map((elm, index)=>{
                                        return(
                                            <li key={index} className="list-group-item">
                                                <div className="row">
                                                    <div className="col-md-2">
                                                        <img src={elm.image} alt={elm.name} className="img-fluid rounded" />
                                                    </div>
                                                    <div className="col">
                                                        <Link to={`/product/${elm.product}`}>{elm.name}</Link>
                                                    </div>
                                                    <div className="col-md-4">
                                                        {elm.qty} x ${elm.price} <br></br>= {(elm.qty * elm.price).toFixed(2)}
                                                    </div>
                                                    
                                                </div>
                                            </li>
                                        )
                                    })}
                                </ul>
                            )}
                        </li>
                        
                    </ul>
                    
                    <ul className="list-group col-4">
                        
                        <li className="list-group-item">
                            <h2>Order Summary</h2>
                        </li>
                        <li className="list-group-item d-flex">
                            <div className="col-6">
                                Items
                            </div>
                            <div className="col-6">
                                ${order.NETpriceItem}
                            </div>
                        </li>
                        <li className="list-group-item d-flex">
                            <div className="col-6">
                                Shipping
                            </div>
                            <div className="col-6">
                                ${order.shippingPrice}
                            </div>
                        </li>
                        <li className="list-group-item d-flex">
                            <div className="col-6">
                                Tax
                            </div>
                            <div className="col-6">
                                ${order.taxPrice}
                            </div>
                        </li>
                        <li className="list-group-item d-flex">
                            <div className="col-6 ">
                                Total
                            </div>
                            <div className="col-6">
                                ${order.totalPrice}
                            </div>
                        </li>
                        {!order.isPaid && 
                            <li className="list-group-item d-flex">
                                {payloading && <Loading />}
                                {!sdkReady ? <Loading /> :
                                <div className="col-12">
                                    <PayPalButton amount={order.totalPrice}
                                        onSuccess={successPaymentHandler} />
                                </div>
                                }
                            </li>
                        }
                    </ul>
                </div>
        </div>
    </>
}