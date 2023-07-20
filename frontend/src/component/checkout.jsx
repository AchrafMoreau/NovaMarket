import React from 'react'
import { Link } from 'react-router-dom'


export const CheckoutSteps = ({step1, step2, step3, step4}) => {
  return (
    <nav className='navbar'>
      <ul className="m-auto"  id='checkout'>
        {step1 ? 
          <li className="nav-item activeCheckout">
            <Link to={'/login'}>Sign In</Link>
          </li> :
          <li className="nav-item disable" >
            <span>Sgin In</span>
          </li>
        }
        {step2 ? 
          <li className="nav-item activeCheckout">
            <Link to={'/shipping'}>Shipping</Link>
          </li> :
          <li className="nav-item disable" >
            <span>Shipping</span>
          </li>
        }
        {step3 ? 
          <li className="nav-item activeCheckout">
            <Link to={'/payment'}>Payment</Link>
          </li> :
          <li className="nav-item disable">
            <span>Payment</span>

          </li>
        }
        {step4 ? 
          <li className="nav-item activeCheckout">
            <Link to={'/placeorder'}>Place Order</Link>
          </li> :
          <li className="nav-item disable"  >
            <span>Place Order</span>
          </li>
        }
      </ul>
    </nav>
  )
}
