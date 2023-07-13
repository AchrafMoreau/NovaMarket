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
        <div className="container mt-3">
            {error && <Message variant='alert-danger' children={error}/>}
            {loading && <Loading />}
            <form action="" method='POST' id='form' onSubmit={handleForm}>
                <p className='title'>Sign In</p>
                <label>
                    <input type="email"
                        name='email'
                        id='input'
                        required
                        onChange={(e)=>setEmail(e.target.value)}
                        value={email}
                    />
                    <span>Email</span>
                </label>

                <label >
                    <input type="password"
                        name='password'
                        id='input'
                        required
                        onChange={(e)=>setPassword(e.target.value)}
                        value={password}
                    />
                    <span>Password</span>
                </label>
                    
                <button class="submit">Submit</button>
                <p class="signin">New Customer <Link to={redirect ? `/register?redirect=${redirect}` : `/register`}>Register</Link> </p>
                
                
            </form>

        </div>
    )
}
