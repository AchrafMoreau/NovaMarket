import { Link, useNavigate } from "react-router-dom"
import Rating from "./rating"

const Product  = ({element})=>{

    const navigate = useNavigate("/")
    const handleclick = (path)=>{
        if(!document.startViewTransition){
            navigate(path)
        }else{
            document.startViewTransition(()=> navigate(path))
        }
        
    }
    return(
        <> 
        <div className="card1">
            <div id="cards" className="card my-2">
                
                <div className="card-body">

                    <img src={element.image} 
                        alt="product_image" className="card-img-top"  
                        style={{viewTransitionName: "myimg", contain:"layout"}} 
                        onClick={()=>handleclick(`/product/${element._id}`)} />
    
                    <Link to={`/product/${element._id}`}>
                        <div className="card-title">
                            {element.name}
                        </div>
                    </Link>
                    {/* <div className="card-text descrip">
                        {element.description}
                    </div> */}
                    <div className="card-text rating">
                        <Rating value={element.rating} text={`${element.numReviews} Reviews`}   />
                    </div>
                    <h3 className="card-text price">
                        ${element.price}
                    </h3>
                    
                </div>
            </div>
        </div>
        </>
    )
}

export default Product