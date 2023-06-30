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
        <nav className="navbar navbar-expand-lg bg-light">
            <div className="container-fluid">
                <Link to="/" className="navbar-brand" >eCommerece</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav ms-auto">
                    
                    <li className="nav-item">
                        <Link to="/cart" className="nav-link" >
                            <i className="fa-solid fa-cart-shopping"></i>
                            cart
                        </Link>
                    </li>
                    { userInfo ? 
                    <li className="nav-link">
                        <div className="dropdown">
                            <div className="dropdown-toggle" style={{cursor: "pointer"}} data-bs-toggle="dropdown" aria-expanded="false">
                                <i className="fa-solid fa-user me-2"></i>
                                {userInfo.name}
                            </div>
                            <ul className="dropdown-menu">
                                <li className="dropdown-item">
                                    <Link to='/profile'>Profiel</Link>
                                </li>
                                
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
                        <li className="nav-link ms-3 me-5">
                            <div className="dropdown">
                                <div className="dropdown-toggle" style={{cursor: "pointer"}} data-bs-toggle="dropdown" aria-expanded="false">
                                    Admin
                                </div>
                                <ul className="dropdown-menu">
                                    <li className="dropdown-item">
                                        <Link to='/admin/users'>Users</Link>
                                    </li>
                                    <li className="dropdown-item">
                                        <Link to='/admin/products'>Products</Link>
                                    </li>
                                    <li className="dropdown-item">
                                        <Link to='/admin/orders'>Orders</Link>
                                    </li>
                                </ul>
                            </div>
                        </li> 
                    )}
                </ul>
                </div>
            </div>
        </nav>
    )
}

export default Header