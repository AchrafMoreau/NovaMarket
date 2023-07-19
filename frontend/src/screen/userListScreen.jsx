import React, { useEffect } from 'react'
import {Loading}  from "../component/loading"
import { Message } from "../component/error"
import { useDispatch, useSelector } from 'react-redux'
import { getAllusersList } from '../actions/userActions'
import { Link } from 'react-router-dom'
import { removingUser } from '../actions/userActions'

export const UserListScreen = () => {

    const dispatch = useDispatch()
    const usersList = useSelector(state=> state.usersList)
    const { loading, error, users} = usersList

    const deleteUser = useSelector(state=> state.deleteUser)
    const { loading:deleteLoading, success, error:deleteError } = deleteUser

    useEffect(()=>{
        dispatch(getAllusersList())
    },[dispatch, success])

    const supHandler = (id)=>{
        if(window.confirm("Are You Sure ...!")){
            dispatch(removingUser(id))
        }
    }
    return (
        <>
            <div className="container my-5">
                <h1 className='mt-5'>List Of Users</h1>
                {loading ? <Loading /> : error ? <Message variant={'alert-danger'} children={error} /> : (
                    <table className="table table-dark table-striped my-5 ">
                    <thead>
                        <tr >
                            <th><h3>ID</h3></th>
                            <th><h3>Name</h3></th>
                            <th><h3>Email</h3></th>
                            <th><h3>Address</h3></th>
                        </tr>
                    </thead>
                    <tbody >    
                        {users.map(elm=>{
                            return(
                                <tr key={elm._id}>
                                    <td>{elm._id}</td>
                                    <td>{elm.name}</td>
                                    <td>{elm.email}</td>
                                    <td>{elm.isAdmin ? <i className='fa-solid fa-check' style={{color:"green"}}></i> : <i className='fa-solid fa-xmark'style={{color:"red"}}></i>}</td>
                                    <td>
                                        <Link to={`/admin/user/${elm._id}/edit`}>
                                            <button className='btn btn-sm btn-light button'style={{boxShadow:"none"}} >
                                                <i className='fa-solid fa-edit'></i>
                                            </button>
                                        </Link>
                                        <button 
                                        onClick={()=>supHandler(elm._id)} style={{backgroundColor: "#b5183c", boxShadow:"none"}}
                                        className='btn ms-3 btn-light btn-sm button' >
                                            <i className='fa-solid fa-trash'></i>
                                        </button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                )}
            </div>
        </>
         
    )
}
