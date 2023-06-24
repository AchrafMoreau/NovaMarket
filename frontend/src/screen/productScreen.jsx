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

    return (
        <>
            <Link to="/" >
                <button className='btn btn-secondary mb-4' type='button'>
                    Go Back
                </button>
            </Link>
            {loading ? <Loading /> 
                    : err 
                    ? <Message variant={'alert-danger'} children={err} />
                    : <div className="container">
                        <div className="row">
                            <div className="col-md-6">
                                <img src={product.image} alt="" className='img-fluid'/>
                            </div>
                            <div className="col-md-3">
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item">{product.name}</li>
                                    <li className="list-group-item"><Rating text={`${product.numReviews} Reviews`} value={product.rating} /></li>
                                    <div className="list-group-item">Price: ${product.price}</div>
                                    <div className="list-group-item">Description: {product.description}</div>
                                </ul>
                            </div>
                            <div className="col-md-3">
                                <ul className="list-group ">
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
                                                    <select className="form-select" value={qty} onChange={(e)=> setQty(e.target.value)} >
                                                        {[...Array(product.countInStock).keys()].map(elm=>{
                                                            return(
                                                                <option value={elm +1} key={elm + 1}>
                                                                    {elm + 1}
                                                                </option>
                                                            )
                                                        })}
                                                    </select>
                                                    
                                                </div>
                                            </div>
                                        </li>}
                                    <div className="list-group-item">
                                        <div className="row" >
                                            <button className='btn btn-primary' type='button' onClick={addToCartHandler} disabled={product.countInStock === 0 ? true: false}>Add To Cart</button>
                                        </div>
                                    </div>
                                </ul>
                            </div>
                        </div>
                    </div>   
            }
        </>
    )
}

export default ProductScreen