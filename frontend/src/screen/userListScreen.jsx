import React, { useEffect } from 'react'
import {Loading}  from "../component/loading"
import { Message } from "../component/error"
import { useDispatch, useSelector } from 'react-redux'
import { getAllusersList } from '../actions/userActions'
import { Link } from 'react-router-dom'


export const UserListScreen = () => {

    const dispatch = useDispatch()
    const usersList = useSelector(state=> state.usersList)
    const { loading, error, users} = usersList


    useEffect(()=>{
        dispatch(getAllusersList())
    },[dispatch])

    const supHandler = (id)=>{
        console.log(id)
    }
    return (
        <>
            <div className="container">
                {loading ? <Loading /> : error ? <Message variant={'alert-danger'} children={error} /> : (
                    <table className="table table-dark table-striped table-sm">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Admin</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(elm=>{
                            return(
                                <tr key={elm._id}>
                                    <td>{elm.name}</td>
                                    <td>{elm.email}</td>
                                    <td>{elm.isAdmin ? <i className='fa-solid fa-check' style={{color:"green"}}></i> : <i className='fa-solid fa-xmark'style={{color:"red"}}></i>}</td>
                                    <td>
                                        <Link to={`/user/${elm._id}/edit`}>
                                            <button className='btn btn-sm btn-light'>
                                                <i className='fa-solid fa-edit'></i>
                                            </button>
                                        </Link>
                                        <button
                                        onClick={()=>supHandler(elm._id)} style={{backgroundColor: "#b5183c"}}
                                        className='btn ms-3 btn-light btn-sm'>
                                            <i className='fa-solid fa-trash' ></i>
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
