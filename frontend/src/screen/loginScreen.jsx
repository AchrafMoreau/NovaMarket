import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, redirect, useLocation, useNavigate, useParams } from 'react-router-dom'
import { Message } from '../component/error'
import { Loading } from '../component/loading';
import { login } from '../actions/userActions';

export const LoginScreen = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const redirect = useLocation().search ? useLocation().search.split("=")[1] : "/"


    const navigate = useNavigate('/')
    const dispatch = useDispatch()
    const userLogin = useSelector(state => state.userLogin)
    const { loading, userInfo, error} = userLogin

    useEffect(()=>{
        if(userInfo){
            navigate(redirect)
        }
    },[dispatch, userInfo, redirect])


    const handleForm = (e)=>{
        e.preventDefault()
        dispatch(login(email, password))
    }

    return (
        <div className="container mt-5 p-5 border rounded-1" style={{width:"50%"}}>
            <h1 className='text-center mb-3'>Sign In</h1>
            {error && <Message variant='alert-danger' children={error}/>}
            {loading && <Loading />}
            <form action="" method='POST' onSubmit={handleForm}>
                <div className="row">
                    <div className="col-12">
                        <label htmlFor="email" className="form-label">Email: </label>
                    </div>
                    <div className="col-12">
                        <input type="email"
                            name='email'
                            className='form-control'
                            onChange={(e)=>setEmail(e.target.value)}
                            value={email}
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
                            onChange={(e)=>setPassword(e.target.value)}
                            value={password}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 mt-3 d-flex justify-content-end">
                        <button className='btn btn-primary' >Login</button>
                    </div>
                </div>
                <div className="row">
                    New Customer <Link to={redirect ? `/register?redirect=${redirect}` : `/register`}>Register</Link>
                </div>
            </form>

        </div>
    )
}
