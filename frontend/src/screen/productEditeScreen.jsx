import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { adminUpdateUser, getUserDetails } from '../actions/userActions'
import { Loading } from '../component/loading'
import { Message } from '../component/error'
import { ProductDetail, adminModifyProduct } from '../actions/productActions'

export const ProductEditeScreen = () => {
    
    const {id} = useParams()
    const navigate = useNavigate("/")

    const [value, setValue] = useState({
        name: "",
        brand: "",
        category: "",
        image: "",
        description: "",
        countInStock: 0,
        price: 0,
    })

    const dispatch = useDispatch()
    const productDetail = useSelector(state=> state.productDetail)
    const {loading, product, error} = productDetail
    const modifyProduct = useSelector(state=> state.modifyProduct)
    const {loading:prodLoading, product:prodProduct, success, error:prodErr} = modifyProduct


    useEffect(()=>{
        if(success){
            dispatch({
                type:"ADMIN_MODIFY_PRODUCT_RESER"
            })
            navigate("/admin/products")
        }else{
            if(!product.name || product._id !== id){
                dispatch(ProductDetail(id))
            }else{
                setValue({
                    name: product.name,
                    brand: product.brand,
                    category: product.category,
                    image: product.image,
                    description: product.description,
                    countInStock: product.countInStock,
                    price: product.price,
                })
            }
        }
    },[product, dispatch, id, navigate, success])


    const changeHandler = (e)=>{
        setValue((prev)=>({
            ...prev,
            [e.target.name] : e.target.value
        }))
    }

    const handleForm = (e)=>{
        e.preventDefault()
        dispatch(adminModifyProduct({product: value, id}))
    }

    return (
        <>
            <div className="container">
                {prodLoading? <Loading /> : prodErr ? <Message variant={'alert-danger'} children={adminError} /> : 
                <div className="row mb-3">
                    <h1 className='text-center my-3'>Update User</h1>
                    {loading ? <Loading /> : error ? <Message variant={'alert-danger'} children={error} /> :
                        <form action="" method='POST'  onSubmit={handleForm}>
                            <div className="row mb-3 my-4">
                                <div className="col-6">
                                    <label htmlFor="name" className="form-label">Name: </label>
                                </div>
                                <div className="col-6">
                                    <input type="text"
                                        name='name'
                                        className='form-control'
                                        onChange={(e)=>changeHandler(e)}
                                        value={value.name}
                                    />
                                </div>
                            </div>
                            <div className="row mb-3">
                                <div className="col-6">
                                    <label htmlFor="brand" className="form-label">Brand: </label>
                                </div>
                                <div className="col-6">
                                    <input type="brand"
                                        name='brand'
                                        className='form-control'
                                        onChange={(e)=>changeHandler(e)}
                                        value={value.brand}
                                    />
                                </div>
                            </div>
                            <div className="row mb-3">
                                <div className="col-6">
                                    <label htmlFor="countInStock" className="form-label">Count In Stock: </label>
                                </div>
                                <div className="col-6">
                                    <input type="number"
                                        name='countInStock'
                                        className='form-control'
                                        onChange={(e)=>changeHandler(e)}
                                        value={value.countInStock}
                                    />
                                </div>
                            </div>
                            <div className="row mb-3">
                                <div className="col-6">
                                    <label htmlFor="price" className="form-label">Price: </label>
                                </div>
                                <div className="col-6">
                                    <input type="number"
                                        name='price'
                                        className='form-control'
                                        onChange={(e)=>changeHandler(e)}
                                        value={value.price}
                                    />
                                </div>
                            </div>
                            <div className="row mb-3">
                                <div className="col-6">
                                    <label htmlFor="description" className="form-label">Description: </label>
                                </div>
                                <div className="col-6">
                                    <input type="text"
                                        name='description'
                                        className='form-control'
                                        onChange={(e)=>changeHandler(e)}
                                        value={value.description}
                                    />
                                </div>
                            </div>
                            <div className="row mb-3">
                                <div className="col-6">
                                    <label htmlFor="category" className="form-label">category: </label>
                                </div>
                                <div className="col-6">
                                    <input type="brand"
                                        name='category'
                                        className='form-control'
                                        onChange={(e)=>changeHandler(e)}
                                        value={value.category}
                                    />
                                </div>
                            </div>
                            
                            
                            
                            <div className="row mb-3">
                                <div className="col-12 mt-3 d-flex justify-content-end">
                                    <button className='btn btn-primary' >Update</button>
                                </div>
                            </div>
                        </form>
                    }
                </div>}
            </div>
        </>
    )
}
