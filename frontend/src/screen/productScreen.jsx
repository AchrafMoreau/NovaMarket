import React, { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { ProductDetail } from '../actions/productActions'
import Rating from '../component/rating'
import { Loading } from '../component/loading'
import { Message } from '../component/error'


const ProductScreen = () => {

    const [qty, setQty] = useState(1)
    const {id} = useParams()
    const navigate = useNavigate()

    const addToCartHandler = ()=>{
        navigate(`/cart/${id}?qty=${qty}`)
    }

    const dispatch = useDispatch()

    const productDetail = useSelector(state=> state.productDetail)
    const {err, product, loading} = productDetail
    useEffect(()=>{

        dispatch(ProductDetail(id))
    },[dispatch])

    const handleQty = ()=>{
        console.log("we enterd", qty)
        setQty(prev => prev = prev + 1)
    }
    return (
        <>
        <div className="container" style={{paddingTop:"7rem"}}>
            <Link to="/" >
                <button className='button mb-4' type='button'>
                    <i className='fa-solid fa-arrow-left'></i>
                </button>
            </Link>
            {loading ? <Loading /> 
                    : err 
                    ? <Message variant={'alert-danger'} children={err} />
                    : <div className="container mt-3" style={{marginBottom:"5rem"}}>
                        <div className="row">
                            
                            <div className="col-md-5" >
                                <img src={product.image}  className='img-fluid' alt="" />
                            </div>
                            <div className="col-md-4">
                                <ul className="list-group list-group-flush infoProduct" >
                                    <li className="list-group-item">{product.name}</li>
                                    <li className="list-group-item"><Rating text={`${product.numReviews} Reviews`} value={product.rating} /></li>
                                    <div className="list-group-item">Price: ${product.price}</div>
                                    <div className="list-group-item">Description: {product.description}</div>
                                </ul>
                            </div>
                            <div className="col-md-3">
                                <ul className="list-group summaryCard ">
                                    <li className="list-group-item">
                                        <div className="row">
                                            <div className="col-6">
                                                Price: 
                                            </div>    
                                            <div className="col-6">
                                                ${product.price}
                                            </div>
                                        </div>
                                    </li>
                                    <li className="list-group-item">
                                        <div className="row">
                                            <div className="col-6">
                                                Status: 
                                            </div>    
                                            <div className="col-6">
                                                {product.countInStock > 0 ? "In Stock" : "Out Of Stock"}
                                            </div>
                                        </div>
                                    </li>
                                    {product.countInStock > 0 && <li className="list-group-item">
                                            <div className="row">
                                                <div className="col-6">
                                                    Quantity:
                                                </div>
                                                <div className="col-12 mt-2">
                                                    <div class="quantity buttons_added">
                                                        <input type="button" value="-" class="minus" onClick={()=>setQty(prev => prev > 1 ? prev = prev - 1 : prev = prev)}/>
                                                        <input type="number" step="1" min="1" max="" name="quantity" value={qty} title="Qty" class="input-text qty text" size="4" pattern="" inputmode=""/>
                                                        <input type="button" value="+" class="plus" onClick={()=>setQty(prev => prev < product.countInStock ? prev = prev + 1 : prev = prev)}/>
                                                    </div>
                                                    
                                                    
                                                </div>
                                            </div>
                                        </li>}
                                    <div className="list-group-item">
                                        <div className="row"style={{marginInline:"5px"}} >
                                            <button className='checkoutBtn'type='button' onClick={addToCartHandler} disabled={product.countInStock === 0 ? true: false}>Add To Cart</button>
                                        </div>
                                    </div>
                                </ul>
                            </div>
                        </div>
                    </div>   
            }

        </div>
        </>
    )
}

export default ProductScreen