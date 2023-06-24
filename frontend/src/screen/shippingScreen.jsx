import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { shippingAddressCart } from '../actions/cartActions'
import { CheckoutSteps } from '../component/checkout'

export const ShippingAddress = () => {

    const cart = useSelector(state=> state.cart)
    const {shippingAddress} = cart
    console.log(shippingAddress)
    const dispatch = useDispatch()

    const navigate = useNavigate("/")
    const [inputs, setInputs] = useState({
        address:shippingAddress.address,
        city: shippingAddress.city,
        ZIP: shippingAddress.ZIP,
        country:shippingAddress.country,
    })


    const changeHandler = (e)=>{
        setInputs((prev)=>({
            ...prev,
            [e.target.name] : e.target.value
        }))
    }
    const handleForm = (e)=>{
        e.preventDefault()
        const { address, city, ZIP, country} = inputs
        dispatch(shippingAddressCart({
            address, city, ZIP, country
        }))
        navigate("/payment")
    }

    console.log(inputs)
    return (

        <div className="container">
            <CheckoutSteps step1 step2 />
            <div className="row">
                <h1>Shipping Form</h1>
            </div>
            <div className="row" >
                <form action=""  onSubmit={handleForm}>
                    <div className="row">
                        <div className="col-12">
                            <label htmlFor="address" className="form-label">Address: </label>
                        </div>
                        <div className="col-12">
                            <input type="text"city
                                name='address'
                                className='form-control'
                                required={true}
                                onChange={(e)=>changeHandler(e)}
                                value={inputs.address}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <label htmlFor="city" className="form-label">City: </label>
                        </div>
                        <div className="col-12">
                            <input type="text"
                                name='city'
                                className='form-control'
                                required={true}
                                onChange={(e)=>changeHandler(e)}
                                value={inputs.city}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <label htmlFor="ZIP" className="form-label">ZIP: </label>
                        </div>
                        <div className="col-12">
                            <input type="text"
                                name='ZIP'
                                className='form-control'
                                required={true}
                                onChange={(e)=>changeHandler(e)}
                                value={inputs.ZIP}
                            />
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col-12">
                            <label htmlFor="country" className="form-label">Country: </label>
                        </div>
                        <div className="col-12 ">
                            <input type="text"
                                name='country'
                                className='form-control'
                                required={true}
                                onChange={(e)=>changeHandler(e)}
                                value={inputs.country}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 mt-3 d-flex justify-content-end">
                            <button className='btn btn-primary' >Payment</button>
                        </div>
                    </div>
                    
                </form>
            </div>
        </div>
    )
}
