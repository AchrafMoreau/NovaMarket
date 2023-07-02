import React, { useEffect } from 'react'
import {Loading}  from "../component/loading"
import { Message } from "../component/error"
import { useDispatch, useSelector } from 'react-redux'
import { getAllusersList } from '../actions/userActions'
import { Link, useParams } from 'react-router-dom'
import { removingUser } from '../actions/userActions'
import { adminAddingProduct, adminDeleteProduct, producstList } from '../actions/productActions'

export const ProductListScreen = () => {


    const dispatch = useDispatch()
    const productList = useSelector(state=> state.ProductList)
    const { products, err, loading } = productList 

    const deleteProduct = useSelector(state=> state.deleteProduct)
    const { error, loading:supLoading, success} = deleteProduct
    
    const userLogin = useSelector(state=> state.userLogin)
    const { userInfo } = userLogin
    
    const addProduct = useSelector(state=> state.addProduct)
    const { success:prodSuccess, error:prodErr, loading:prodLoading } = addProduct

    useEffect(()=>{
        if(userInfo && userInfo.isAdmin)
        dispatch(producstList())
    },[dispatch, success, userInfo, prodSuccess])

    const supHandler = (id)=>{
        if(window.confirm("Are You Sure ...!")){
            dispatch(adminDeleteProduct(id))
        }
    }
    const addProductHandler = ()=>{
        dispatch(adminAddingProduct())
    }
    return (
        <>
            <div className="container">
                <div className="row align-items-center ">
                    <div className="col ">
                        <h1>Products</h1>
                    </div>
                    <div className="col text-end">
                        <button className='my-3 btn btn-primary' onClick={addProductHandler}>
                            <i className='fa-solid fa-plus'></i> Create Product
                        </button>
                    </div>
                </div>
                
                {supLoading ? <Loading /> : error ? <Message variant={"alert-danger"} children={error}/> :
                    loading ? <Loading /> : err ? <Message variant={'alert-danger'} children={err} /> : (
                        <table className="table table-dark table-striped table-sm">
                            <thead>
                                <tr>
                                <th>Name</th>
                                <th>PRICE</th>
                                <th>CATEGORY</th>
                                <th>BRAND</th>
                                <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map(elm => (
                                <tr key={elm._id}>
                                    <td>{elm.name}</td>
                                    <td>$ {elm.price}</td>
                                    <td>{elm.category}</td>
                                    <td>{elm.brand}</td>
                                    <td>
                                    <Link to={`/admin/product/${elm._id}/edit`}>
                                        <button className='btn btn-sm btn-light'>
                                        <i className='fa-solid fa-edit'></i>
                                        </button>
                                    </Link>
                                    <button
                                        onClick={() => supHandler(elm._id)}
                                        style={{ backgroundColor: "#b5183c" }}
                                        className='btn ms-3 btn-light btn-sm'>
                                        <i className='fa-solid fa-trash'></i>
                                    </button>
                                    </td>
                                </tr>
                                ))}
                            </tbody>
                        </table>
                    )
                    }

            </div>
        </>
         
    )
}
