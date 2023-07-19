import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { adminUpdateUser, getUserDetails } from '../actions/userActions'
import { Loading } from '../component/loading'
import { Message } from '../component/error'

export const UserEdietScreen = () => {
    
    const {id} = useParams()
    const navigate = useNavigate("/")
    const [borderChange, setBorderChange] = useState({
        name:"rgb(225,142,149)",
        email:"rgb(225,142,149)",
        isAdmin:"rgb(225,142,149)"
    })
    const [value, setValue] = useState({
        name: "",
        email: "",
        isAdmin: false
    })

    const dispatch = useDispatch()
    const userDetails = useSelector(state=> state.userDetails)
    const {loading, user, error} = userDetails
    const adminUpdate = useSelector(state=> state.adminUpdate)
    const {loading:adminLoading, user:adminUser, success, error:adminError} = adminUpdate


    useEffect(()=>{

        if(success){
            dispatch({
                type:"ADMIN_UPDATE_USER_RESET"
            })
            navigate("/admin/users")
        }else{
            if(!user.name || user._id !== id){
                dispatch(getUserDetails(id))
            }else{
                setValue({
                    name: user.name,
                    email: user.email,
                    isAdmin: user.isAdmin
                })
            }
        }
    },[user, dispatch, id, navigate, success])


    const changeHandler = (e)=>{
        setValue((prev)=>({
            ...prev,
            [e.target.name] : e.target.value
        }))
        setBorderChange((prev)=>({
            ...prev,
            [e.target.name]: 'var(--green-light)'
        }))
    }

    const handleForm = (e)=>{
        e.preventDefault()
        value.id = id
        dispatch(adminUpdateUser(value))
    }
    console.log(borderChange)
    return (
        <>
            <div className="container">
                {adminLoading? <Loading /> : adminError ? <Message variant={'alert-danger'} children={adminError} /> : 
                <div className="row" style={{marginTop:"3rem"}}>
                    <h1 className='text-center my-3'>Update User</h1>
                    {loading ? <Loading /> : error ? <Message variant={'alert-danger'} children={error} /> :
                        <form action="" id='form' method='POST' style={{width:"50%"}} onSubmit={handleForm}>
                            <div className="row my-4">
                                <div className="col-6">
                                    <label htmlFor="name" className="label">Name: </label>
                                </div>
                                <div className="col-6" >
                                    <input type="text"
                                        name='name'
                                        className='input'
                                        style={{borderColor: borderChange.name}} 
                                        onChange={(e)=>changeHandler(e)}
                                        value={value.name}
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6">
                                    <label htmlFor="email" className="form-label">Email: </label>
                                </div>
                                <div className="col-6">
                                    <input type="email"
                                        name='email'
                                        className='input'
                                        style={{borderColor: borderChange.email}} 
                                        onChange={(e)=>changeHandler(e)}
                                        value={value.email}
                                    />
                                </div>
                            </div>
                            
                            <div className="row my-4">
                                <div className="col-6">
                                    <label htmlFor="email" className="form-label">Admin: </label>
                                </div>
                                <div className="col-6">
                                    <select className="input" style={{borderColor: borderChange.isAdmin}} value={value.isAdmin} name="isAdmin" onChange={(e)=>changeHandler(e)} aria-label="Default select example">
                                        <option value={true}>Yes</option>
                                        <option value={false}>No</option>
                                    </select>
                                </div>
                            </div>
                            
                            <div className="row">
                                <div className="col-12 mt-3 d-flex justify-content-end">
                                    <button className='edite' style={{boxShadow:"none"}} >Update</button>
                                </div>
                            </div>
                        </form>
                    }
                </div>}
            </div>
        </>
    )
}