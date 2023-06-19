import { Link } from "react-router-dom"
import Rating from "./rating"

const Product  = ({element})=>{
    return(
        <>
            <div className="card my-2">
                
                <div className="card-body">
                    <Link to={`/product/${element._id}`}>
                        <img src={element.image} alt="product_image" className="card-img-top"  />
                    </Link>
                    <Link to={`/product/${element._id}`}>
                        <div className="card-title">
                            {element.name}
                        </div>
                    </Link>
                    <div className="card-text">
                        {element.description}
                    </div>
                    <div className="card-text">
                        <Rating value={element.rating} text={`${element.numReviews} Reviews`}   />
                    </div>
                    <h3 className="card-text">
                        ${element.price}
                    </h3>
                    
                </div>
            </div>
        </>
    )
}

export default Product