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
    const [borderChange, setBorderChnage]= useState({
        address: "",
        city: "",
        ZIP: "",
        country: ""
    })
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
        setBorderChnage((prev)=>({
            ...prev,
            [e.target.name]: "var(--green-light)"
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

        <div className="container mb-5" style={{paddingTop:"6rem"}}>
            <CheckoutSteps step1 step2 />
            <div className="row mt-4">
                <h1>Shipping Form</h1>
            </div>
            <div className="row" >
                <form action="" id='form' onSubmit={handleForm}>
                    <div className="row">
                        <div className="col-12">
                            <label htmlFor="address" className="form-label">Address: </label>
                        </div>
                        <div className="col-12">
                            <input type="text"city
                                name='address'
                                style={{color:"#000", borderColor: borderChange.address}}
                                className='input'
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
                                style={{color:"#000", borderColor: borderChange.city}}
                                className='input'
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
                                style={{color:"#000", borderColor: borderChange.ZIP}}
                                className='input'
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
                                style={{color:"#000", borderColor: borderChange.country}}
                                className='input'
                                required={true}
                                onChange={(e)=>changeHandler(e)}
                                value={inputs.country}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 mt-3 d-flex justify-content-end">
                            <button className='button' >Payment</button>
                        </div>
                    </div>
                    
                </form>
            </div>
        </div>
    )
}
