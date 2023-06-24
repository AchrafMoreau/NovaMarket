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

    console.log(values)
    return (
        <div className='container mt-5 p-5 border rounded-1' style={{width:"50%"}}>
            <h1 className='text-center mb-3'>Sign In</h1>
            {error && <Message variant={"alert-danger"} children={error} />}
            {values.message && <Message variant={"alert-danger"} children={values.message} />}
            {loading && <Loading />}
            <form action=""  onSubmit={handleForm}>
                <div className="row">
                    <div className="col-12">
                        <label htmlFor="name" className="form-label">Name: </label>
                    </div>
                    <div className="col-12">
                        <input type="text"
                            name='name'
                            className='form-control'
                            onChange={(e)=>changeHandler(e)}
                            value={values.name}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <label htmlFor="email" className="form-label">Email: </label>
                    </div>
                    <div className="col-12">
                        <input type="email"
                            name='email'
                            className='form-control'
                            onChange={(e)=>changeHandler(e)}
                            value={values.email}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <label htmlFor="confirmPass" className="form-label">Confirm Password: </label>
                    </div>
                    <div className="col-12">
                        <input type="password"
                            name='confirmPass'
                            className='form-control'
                            onChange={(e)=>changeHandler(e)}
                            value={values.confirmPass}
                        />
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col-12">
                        <label htmlFor="password" className="form-label">Password: </label>
                    </div>
                    <div className="col-12 ">
                        <input type="password"
                            name='password'
                            className='form-control'
                            onChange={(e)=>changeHandler(e)}
                            value={values.password}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 mt-3 d-flex justify-content-end">
                        <button className='btn btn-primary' >Register</button>
                    </div>
                </div>
                <div className="row">
                    I already have an account <Link to={redirect ? `/register?redirect=${redirect}` : `/register`}>Login</Link>
                </div>
            </form>
        </div>
    )
}
