import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { register } from '../actions/userActions'
import { Message } from '../component/error'
import { Loading } from '../component/loading'

export const RegisterScreen = () => {


    const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",
        confirmPass: "",
        message: null,
    })

    const changeHandler = (e)=>{
        setValues(preValue => ({
            ...preValue,
            [e.target.name] : e.target.value
        }))
    }

    const navigate = useNavigate('/')
    const redirect = useLocation().search ? useLocation().search.split("=")[1] : "/"

    const dispatch = useDispatch()
    const userRegister = useSelector(state=> state.userRegister)
    const { loading, userInfo, error} = userRegister


    useEffect(()=>{
        if(userInfo){
            navigate(redirect)
        }
    })

    const handleForm = (e)=>{
        e.preventDefault()
        if(values.confirmPass != values.password){
            setValues(prev => ({...prev, message: 'Password Does Not Match !'}))
        }else{
            dispatch(register(values.name, values.email, values.password))
        }
    }

    return (
        <div className='container py-5'>
            {error && <Message variant={"alert-danger"} children={error} />}
            {values.message && <Message variant={"alert-danger"} children={values.message} />}
            {loading && <Loading />}
            <form action=""  id='form'  style={{marginTop:"50px"}} onSubmit={handleForm}>
                <p className='title'>Register</p>
                <p class="message">Signup now and get full access to our app. </p>
                <div id="flex">
                    <label>
                        <input required placeholder="" type="text" id="input"  
                            name='name'
                            onChange={(e)=>changeHandler(e)}
                            value={values.name}
                        />
                        <span>Firstname</span>
                    </label>

                    <label>
                        <input required placeholder="" type="text" id="input"/>
                        <span>Lastname</span>
                    </label>
                </div>  
                <label>
                    <input required placeholder="" type="email" id="input"
                        name='email'
                        onChange={(e)=>changeHandler(e)}
                        value={values.email}
                    />
                    <span>Email</span>
                </label> 
                    
                <label>
                    <input required placeholder="" type="password" id="input"
                        name='password'
                        onChange={(e)=>changeHandler(e)}
                        value={values.password}
                    />
                    <span>Password</span>
                </label>
                <label>
                    <input required placeholder="" type="password" id="input"
                        name='confirmPass'
                        onChange={(e)=>changeHandler(e)}
                        value={values.confirmPass}
                    />
                    <span>Confirm password</span>
                </label>   
                <button class="button">Sign In</button>
                <p class="signin">Already have an acount ?<Link to={'/login'}>Login</Link> </p>
                
            </form>
        </div>
    )
}
