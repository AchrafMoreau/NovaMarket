import React, { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { ProductDetail, productReviewCreated } from '../actions/productActions'
import Rating from '../component/rating'
import { Loading } from '../component/loading'
import { Message } from '../component/error'


const ProductScreen = () => {

    const [qty, setQty] = useState(1)
    const [review, setReview]= useState({
        comment: "",
        rating: 0
    })
    const {id} = useParams()
    const navigate = useNavigate()

    const addToCartHandler = ()=>{
        navigate(`/cart/${id}?qty=${qty}`)
    }

    const dispatch = useDispatch()

    const productDetail = useSelector(state=> state.productDetail)
    const {err, product, loading} = productDetail

    const creatingProductReview = useSelector(state=> state.creatingProductReview)
    const {error:errorReview, success:successReview} = creatingProductReview
    
    const userLogin = useSelector(state=> state.userLogin)
    const { userInfo } = userLogin

    useEffect(()=>{
        if(successReview){
            alert("review Submitted")
            setReview({
                rating:0,
                comment:""
            })
            dispatch({
                type:"CREATE_PRODUCT_REVIEW_RESET"
            })
        }
        dispatch(ProductDetail(id))
    },[dispatch, successReview])


    const chnageHanlder = (e)=>{
        setReview((prev)=>({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }
    const handelFrom = (e)=>{
        e.preventDefault()
        const id = product._id
        console.log(id)
        dispatch(productReviewCreated({review, id}))
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
                        <div className="row border-1 ">
                            <h1>Reviews</h1>
                            {product.reviews.length === 0 && <Message variant={'alert-info'} children={"No Reviews..."} />}
                            <ul className="list-group list-group-flush" >
                                {product.reviews.map(review => (
                                    <li className='list-group-item reviews'>
                                        <strong className='me-2'>{review.name}</strong>
                                        <Rating value={review.rating} />
                                        <p className='fst-italic'>{review.createdAt.substring(0, 10)}</p>
                                        <p className='ms-5'>{review.comment}</p>
                                    </li>
                                ))}
                                <li className='list-group-item reviews'>
                                    {errorReview && <Message variant={`alert-danger`} children={errorReview} />}
                                    <h4>Write a Customer Review</h4>
                                    { userInfo 
                                    ? <form onSubmit={handelFrom} id='form' style={{boxShadow:'0px 5px 20px rgba(0,0,0,.3)'}}>
                                        <label htmlFor="" style={{fontSize:"1.4rem"}}>Rating</label>
                                        <select name="rating" className='input' id="" value={review.rating} onChange={(e)=>chnageHanlder(e)}>
                                            <option value="">Select...</option>
                                            <option value="1">1 - Poor</option>
                                            <option value="2">2 - Fair</option>
                                            <option value="3">3 - Good</option>
                                            <option value="4">4 - Very Good</option>
                                            <option value="5">5 - Excellent</option>
                                        </select>
                                        <label htmlFor="" style={{fontSize:"1.4rem"}}>Comment</label>
                                        <textarea name="comment" className='input' id="" cols="10" rows="3" onChange={(e)=>chnageHanlder(e)}></textarea>
                                        <button className='button mt-2'>
                                            Submit
                                        </button>
                                    </form> 
                                    : <Message variant={'alert-info'} children={`Please ${<Link to='/login'>Sign in</Link>} to write a review `} />}
                                </li>
                            </ul>

                        </div>
                    </div>   
            }

        </div>
        </>
    )
}

export default ProductScreen