import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { adminUpdateUser, getUserDetails } from '../actions/userActions'
import { Loading } from '../component/loading'
import { Message } from '../component/error'
import { ProductDetail, adminModifyProduct } from '../actions/productActions'
import axios from 'axios'

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
        uploading: false
    })
    const [changed, setChanged] = useState({
        name: "var(--lipstik-color)",
        brand: "var(--lipstik-color)",
        category: "var(--lipstik-color)",
        image: "var(--lipstik-color)",
        description: "var(--lipstik-color)",
        countInStock:" var(--lipstik-color)",
        price: "var(--lipstik-color)",
    })

    const dispatch = useDispatch()
    const productDetail = useSelector(state=> state.productDetail)
    const {loading, product, error} = productDetail
    const modifyProduct = useSelector(state=> state.modifyProduct)
    const {loading:prodLoading, product:prodProduct, success, error:prodErr} = modifyProduct


    useEffect(()=>{
        // dispatch(ProductDetail(id))

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

    useEffect(()=>{
        dispatch(ProductDetail(id))
    },[])

    const changeHandler = (e)=>{
        setValue((prev)=>({
            ...prev,
            [e.target.name] : e.target.value
        }))
        setChanged((prev)=>({
            ...prev,
            [e.target.name]: "var(--green-light)"
        }))
    }

    const handleForm = (e)=>{
        e.preventDefault()
        dispatch(adminModifyProduct({product: value, id}))
    }

    const handleUpload = async(e)=>{
        const file = e.target.files[0]
        const formData = new FormData();
        formData.append("image", file)    
        setValue((prevValues)=>({
            ...prevValues,
            uploading: true
        }))

        try{
            const config = {
                headers:{
                    'Content-Type':"multipart/form-data"
                }
            }

            const { data } = await axios.post(`http://localhost:3000/api/upload`, formData, config)

            setValue((prevValues)=>({
                ...prevValues,
                image: data,
                uploading: false
            }))
        }catch(err){
            console.log(err)
            setValue(preValues => ({
                ...preValues,
                uploading: false
            }))
        }
    }
    console.log(changed)
    return (
        <>
            <div className="container">
                {prodLoading? <Loading /> : prodErr ? <Message variant={'alert-danger'} children={adminError} /> : 
                <div className="row mb-3">
                    <h1 className='text-center my-3'>Update User</h1>
                    {loading ? <Loading /> : error ? <Message variant={'alert-danger'} children={error} /> :
                        <form action="" id='form' style={{width:"70%"}} method='POST'  onSubmit={handleForm}>
                            <div className="row mb-3 my-4 border-1" >
                                <div className="col-md-4">
                                    <label htmlFor="name" className="form-label"><h4>Name: </h4></label>
                                </div>
                                <div className="col-md-8" id='from-control'>
                                    <input type="text"
                                        name='name'
                                        className='input input-alt'
                                        onChange={(e)=>changeHandler(e)}
                                        style={{borderColor: changed.name}}
                                        value={value.name}
                                    />
                                    
                                </div>
                            </div>
                            <div className="row mb-3">
                                <div className="col-md-4">
                                    <label htmlFor="brand" className="form-label"><h4>Brand: </h4></label>
                                </div>
                                <div className="col-md-8" id='from-control'>
                                    <input type="text"
                                        name='brand'
                                        className='input input-alt'
                                        onChange={(e)=>changeHandler(e)}
                                        style={{borderColor: changed.brand}}
                                        value={value.brand}
                                    />
                                    
                                </div>
                            </div>
                            <div className="row mb-3">
                                <div className="col-md-4">
                                    <label htmlFor="image" className="form-label"><h4>Image: </h4></label>
                                </div>
                                <div className="col-md-8" >
                                    <div className="col-md-8" id='from-control'>
                                        <input type="text"
                                            name='image'
                                            className='input input-alt'
                                            onChange={(e)=>changeHandler(e)}
                                            style={{borderColor: changed.image}}
                                            value={value.image}
                                        />
                                        
                                    </div>
                                    <div className="col-md-4 mt-2">
                                        <input type="file"
                                            name='upload'
                                            onChange={handleUpload}
                                        />
                                        
                                        {value.uploading && <Loading />}
                                    </div>
                                </div>
                            </div>
                            <div className="row mb-3">
                                <div className="col-md-4">
                                    <label htmlFor="countInStock" className="form-label"><h4>Count In Stock: </h4></label>
                                </div>
                                <div className="col-md-8" id='from-control'>
                                    <input type="number"
                                        name='countInStock'
                                        className='input input-alt'
                                        onChange={(e)=>changeHandler(e)}
                                        style={{borderColor: changed.countInStock}}
                                        value={value.countInStock}
                                    />
                                    
                                </div>
                            </div>
                            <div className="row mb-3">
                                <div className="col-md-4">
                                    <label htmlFor="price" className="form-label"><h4>Price: </h4></label>
                                </div>
                                <div className="col-md-8" id='from-control'>
                                    <input type="number"
                                        name='price'
                                        className='input input-alt'
                                        onChange={(e)=>changeHandler(e)}
                                        style={{borderColor: changed.price}}
                                        value={value.price}
                                    />
                                    
                                </div>
                            </div>
                            <div className="row mb-3">
                                <div className="col-md-4">
                                    <label htmlFor="description" className="form-label"><h4>Description: </h4></label>
                                </div>
                                <div className="col-md-8" id='from-control'>
                                    <input type="text"
                                        name='description'
                                        className='input input-alt'
                                        onChange={(e)=>changeHandler(e)}
                                        style={{borderColor: changed.description}}
                                        value={value.description}
                                    />
                                    
                                </div>
                            </div>
                            <div className="row mb-3">
                                <div className="col-md-4">
                                    <label htmlFor="category" className="form-label"><h4>category: </h4></label>
                                </div>
                                <div className="col-md-8" id='from-control'>
                                    <input type="text"
                                        name='category'
                                        className='input input-alt'
                                        onChange={(e)=>changeHandler(e)}
                                        style={{borderColor: changed.category}}
                                        value={value.category}
                                    />
                                    
                                </div>
                            </div>
                            
                            
                            
                            <div className="row mb-3">
                                <div className="col-12 mt-3 d-flex justify-content-end">
                                    <button className='edite' >Update</button>
                                </div>
                            </div>
                        </form>
                    }
                </div>}
            </div>
        </>
    )
}
