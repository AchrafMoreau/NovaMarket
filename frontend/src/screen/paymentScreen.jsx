import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { CheckoutSteps } from "../component/checkout"
import { paymentMethods } from "../actions/cartActions"

export const PaymentMethods = ()=>{
    const navigate = useNavigate("/")

    const cart = useSelector(state => state.cart)
    const { shippingAddress } =cart
    if(!shippingAddress){
        navigate("/shipping")
    }


    const [paymentMethod, setPaymentMethods] = useState("paypal")

    const dispatch= useDispatch()
    const handleForm = (e)=>{
        e.preventDefault()
        dispatch(paymentMethods(paymentMethod))
        navigate("/placeorder")
    }

    const changeHandler = (e)=>{
        setPaymentMethods(e.target.value)
    }
    
    return(
        <div className="container" style={{paddingTop:"6rem"}}>
            <CheckoutSteps step1 step2 step3 />
            <div className="row text-center mt-5">
                <h1>Payment Method Form</h1>
            </div>
            <form action="" className="mb-5 mt-3" id="form" onSubmit={handleForm}>

                <div className="form-group">
                    <legend className="form-lable">Select Method</legend>
                    <div className="col border px-3 d-flex" >
                        <input className="form-check me-3" 
                            type="radio" 
                            id="paypal"
                            name='paymentMethod' 
                            value='paypal'
                            checked 
                            onChange={(e)=>{ changeHandler(e)}}
                        />Paypal
                    </div>
                    <div className="col border px-3 mt-2 d-flex ">
                        <input className="form-check me-3" 
                            type="radio" 
                            id="strip"
                            name='paymentMethod' 
                            value='strip' 
                            onChange={(e)=>{ changeHandler(e)}}
                        />Strip
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 mt-3 d-flex justify-content-end">
                        <button className='button' >Continue</button>
                    </div>
                </div>
            </form>
        </div>

    )
}