import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getOrdersListForAdmin } from '../actions/orderAcrions'
import { Loading } from '../component/loading'
import { Message } from '../component/error'
import { Link } from 'react-router-dom'

export const OrderListScreen = () => {

    const dispatch = useDispatch()
    const orderList = useSelector(state=> state.orderList)
    const {loading, success, order, error} = orderList


    useEffect(()=>{
        dispatch(getOrdersListForAdmin())

    },[dispatch])

    const supHandler = (id)=>{

    }
    return (
        <>
            <div className="container mt-5">
                <div className="row align-items-center ">
                    <div className="col my-3">
                        <h1>Orders</h1>
                    </div>
                    
                </div>

                {loading ? <Loading /> : error ? <Message variant={'alert-danger'} children={error} /> : 
                    <table className="table table-dark table-striped ">
                        <thead>
                            <tr >
                                <th><h3>USER</h3></th>
                                <th><h3>DATE</h3></th>
                                <th><h3>TOTAL</h3></th>
                                <th><h3>PAID</h3></th>
                                <th><h3>DELIVRED</h3></th>
                            </tr>
                        </thead>
                        <tbody >
                            {order.map(elm => (
                            <tr  key={elm._id}>
                                <td>{elm.user.name}</td>
                                <td>{elm.createdAt.substring(1,10)}</td>
                                <td>$ {elm.totalPrice}</td>
                                <td>{elm.isPaid ? 
                                    elm.paidAt ? <p style={{color:"green"}}>{elm.paidAt.substring(0,10)}</p> : <i className='fa-solid fa-check' style={{color:"green"}}></i>   
                                    : <i className='fa-solid fa-xmark'style={{color:"red"}}></i>}
                                </td>
                                <td>{elm.isDeliverd ? 
                                    elm.deliverdAt ? <p style={{color:"green"}}>{elm.deliverdAt.substring(0,10)}</p> : <i className='fa-solid fa-check' style={{color:"green"}}></i> 
                                    : <i className='fa-solid fa-xmark'style={{color:"red"}}></i>}</td>
                                <td>
                                <Link to={`/order/${elm._id}`}>
                                    <button className='btn btn-sm btn-light'>
                                    Datails
                                    </button>
                                </Link>
                                </td>
                            </tr>
                            ))}
                        </tbody>
                    </table>
                }

            </div>
        </>
    )
}
