import React, { useEffect } from "react";
import Product from "../component/product";
import { useSelector, useDispatch } from "react-redux";
import { producstList } from "../actions/productActions";
import { Message } from "../component/error";
import { Loading } from "../component/loading";


const HomeScreen = ()=>{

    const dispatch = useDispatch()
    const ProductList = useSelector(state=> state.ProductList)

    const { loading, err, products} = ProductList

    useEffect(()=>{

        dispatch(producstList())

    }, [dispatch])


    return(
        <>
            <div className="container mt-5">
                <div className="row">
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