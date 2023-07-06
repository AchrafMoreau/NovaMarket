import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../actions/userActions";

const Header = ()=>{

    const navigate = useNavigate('/')
    const dispatch = useDispatch()
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const logoutHandler = ()=>{
        dispatch(logout())
        navigate("/")
        location.reload()
    }
     return(
        <nav id="nav" className="navbar navbar-expand-lg bg-light">
            <div className="container-fluid">
                <Link to="/" className="navbar-brand" >eCommerece</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav ms-auto">
                    
                    
                    { userInfo ? 
                    <li className="nav-link">
                        <div className="dropdown">
                            <div id="name" className="dropdown-toggle" style={{cursor: "pointer"}} data-bs-toggle="dropdown" aria-expanded="false">
                                <i className="fa-solid fa-user me-2"></i>
                                {userInfo.name}
                            </div>
                            <ul className="dropdown-menu">
                                <Link className="dropdown-item" to='/profile'>Profiel</Link>
                                
                                <li className="dropdown-item"  onClick={logoutHandler}>
                                    Logout
                                </li>
                            </ul>
                        </div>
                    </li> : 
                    
                    <li className="nav-item">
                        <Link to='/login' className="nav-link" href="#">
                            <i className="fa-solid fa-user"></i>
                            sign in
                        </Link>
                    </li>
                    }
                    {userInfo && userInfo.isAdmin && (
                        <li className="nav-link ms-3 me-2">
                            <div className="dropdown">
                                <div id="admin" className="dropdown-toggle" style={{cursor: "pointer"}} data-bs-toggle="dropdown" aria-expanded="false">
                                    Admin
                                </div>
                                <ul className="dropdown-menu">
                                    <Link to='/admin/users' className="dropdown-item">Users</Link>
                                    <Link to='/admin/products'className="dropdown-item">Products</Link>
                                    <Link to='/admin/orders' className="dropdown-item">Orders</Link>
                                </ul>
                            </div>
                        </li> 
                    )}
                    <li  className="nav-item">
                        <Link to="/cart" className="nav-link" id='cart' >
                            <i className="fa-solid fa-cart-shopping me-2"></i>
                            cart
                        </Link>
                    </li>
                </ul>
                </div>
            </div>
        </nav>
    )
}

export default Header