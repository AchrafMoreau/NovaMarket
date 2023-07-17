import React, { useEffect, useState } from "react";
import Product from "../component/product";
import { useSelector, useDispatch } from "react-redux";
import { producstList } from "../actions/productActions";
import { Message } from "../component/error";
import { Link } from 'react-router-dom'
import { Loading } from "../component/loading";
import { BestSeller } from "../component/bestSeller";

const HomeScreen = ()=>{

    const dispatch = useDispatch()
    const ProductList = useSelector(state=> state.ProductList)

    const { loading, err, products} = ProductList
    useEffect(()=>{

        dispatch(producstList())
        
    }, [dispatch])

  
    return(
        <>
            
            <div className="container-fluid">
                <div className="row landingPage">
                    <div className="col-md-4 leftContent">
                        <h1>NovaMarket</h1>
                        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cumque nobis incidunt consequatur numquam ratione. Adipisci ipsa voluptatem totam sapiente unde possimus harum non dolorum culpa aperiam eius rem, saepe laudantium!</p>
                        <button className="button">
                            Get Started
                        </button>
                    </div>
                    <div className="col-md-8 landingImage">
                    </div>

                </div>
                <div className="bestProducts row">
                    <h1 className="text-center mt-5">New Products</h1>
                    <BestSeller />
                </div>
                <div className="bestSeller">
                    <div className="uper">
                        <h3>Best Seller ✨</h3>
                        <button className="button" style={{fontSize:".9rem"}}>
                            <Link to={'/'}>See More...</Link>
                        </button>
                    </div>
                    <div className="products">
                        {loading 
                            ? <Loading />
                            : err   
                            ? <Message variant={'alert-danger'} children={err} />
                            : products.map((elm, index)=>{
                                return(
                                    <div className="" key={index}>
                                        <Product element={elm} /> 
                                    </div>
                                )
                            })
                        }
                    </div>

                </div>
            </div>
        </>
    )
}

export default HomeScreen