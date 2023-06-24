import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getUserDetails, userUpdateProfile } from '../actions/userActions';
import { Message } from '../component/error';
import { Loading } from '../component/loading';

import { Link } from 'react-router-dom';

export const ProfileScreen = () => {

    const navigate = useNavigate("/")

    const [values, setValues]= useState({
        name: "",
        email: "",
        password: "",
        confirmPass: "",
        message: ""
    })

    const changeHandler = (e)=>{
        setValues((prev)=>({
            ...prev,
            [e.target.name] : e.target.value
        }))
    }

    const dispatch = useDispatch()
    


    const userDetails = useSelector(state=> state.userDetails)
    const { loading, user, error } = userDetails

    const userLogin = useSelector(state=> state.userLogin)
    const { userInfo } = userLogin

    const userUpdate = useSelector(state=> state.userUpdate)
    const { success } = userUpdate
    useEffect(()=>{
        if(!userInfo){
            navigate('/login')
        }else{
            if(!user.name){
                dispatch(getUserDetails("profile"))
            }else{
                setValues((prev)=>({
                    ...prev,
                    email : user.email,
                    name: user.name
                }))
            }
        }
    },[dispatch, user, userInfo, navigate])


    const handleForm = (e)=>{
        e.preventDefault()
        if(values.password !== values.password){
            setValues((prev)=>({
                ...prev,
                message: "Password Does Not Match!"
            }))
        }else{
            dispatch(userUpdateProfile({
                id: user._id,
                name: values.name,
                email: values.email,
                password: values.password
            }))
        }
    }

    return (
        <>
            <div className="row ">
                <div className="col-md-4 ">
                    <h1 className='text-center mb-3'>Profile</h1>
                    {error && <Message variant={"alert-danger"} children={error} />}
                    {success && <Message variant={"alert-success"} children={"Profile Updated"} />}
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
                        
                    </form>
                </div>
                <div className="col-md-8">
                    <h1>Our Order</h1>
                </div>
            </div>
            
        </>
        
    )
}

