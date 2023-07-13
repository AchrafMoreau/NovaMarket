import React, { useEffect, useState } from "react";
import Product from "../component/product";
import { useSelector, useDispatch } from "react-redux";
import { producstList } from "../actions/productActions";
import { Message } from "../component/error";
import { Loading } from "../component/loading";
import axios from "axios";


const HomeScreen = ()=>{

    const dispatch = useDispatch()
    const ProductList = useSelector(state=> state.ProductList)

    const { loading, err, products} = ProductList
    useEffect(()=>{

        dispatch(producstList())
        
    }, [dispatch])


    return(
        <>
            <div style={{height:"100vh"}} className="container mt-3">
                <Loading />
            </div>
            <div className="container-fluid">
                <div className="row" style={{background:"black"}}>
                    {loading 
                        ? <Loading />
                        : err   
                        ? <Message variant={'alert-danger'} children={err} />
                        : products.map((elm, index)=>{
                            return(
                                <div className="col-3" key={index}>
                                    <Product element={elm} /> 
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default HomeScreen