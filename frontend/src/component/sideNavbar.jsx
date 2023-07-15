import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate , Link} from 'react-router-dom'
export const SideBar = () => {
    const navigate = useNavigate('/')
    const dispatch = useDispatch()
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const logoutHandler = ()=>{
        dispatch(logout())
        navigate("/")
        location.reload()
    }
  return (
    <nav class="nav__cont">
        <div className="nav-home">
            <i className='fa-solid fa-home'></i>
            <Link to="/" className="navbar-brand"id="nova" >NovaMarket</Link>
        </div>
        <ul className="nav">          
            { userInfo ? 
            <li className="nav-items">
                <div className="big">
                    <i className="fa-solid fa-user"></i>
                    {userInfo.name}
                </div>
                <div className="small">
                    <Link className="dropdown-item" to='/profile'>Profiel</Link>
                    
                    <li className="dropdown-item"  onClick={logoutHandler}>
                        Logout
                    </li>

                </div>
            </li> : 
            
            <li className="nav-items">
                <Link to='/login' className="nav-link"id="name" href="#">
                    <i className="fa-solid fa-user"></i>
                    sign in
                </Link>
            </li>
            }
            {userInfo && userInfo.isAdmin && (
                <li className="nav-items">
                    <div className="big">
                        <i className="fa-solid fa-gear"></i>
                        Admin
                    </div>
                    <div className="small">
                        <Link to='/admin/users' className="dropdown-item">Users</Link>
                        <Link to='/admin/products'className="dropdown-item">Products</Link>
                        <Link to='/admin/orders' className="dropdown-item">Orders</Link>
                    </div>
                </li> 
            )}
            <li  className="nav-items">
                <Link to="/cart" className="big" >
                    <i className="fa-solid fa-cart-shopping"></i>
                    cart
                </Link>
            </li>
        </ul>
    </nav>
  )
}
