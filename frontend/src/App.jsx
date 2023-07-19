import Header from './component/header'
import Footer from './component/footer'
import HomeScreen from './screen/homeScreen'
import { BrowserRouter, Route, Routes, useLocation, useParams } from 'react-router-dom'
import ProductScreen from './screen/productScreen'
import { CartScreen } from './screen/cartScreen'
import { LoginScreen } from './screen/loginScreen'
import { RegisterScreen } from './screen/registerScreen'
import { ProfileScreen } from './screen/profileScreen'
import { ShippingAddress } from './screen/shippingScreen';
import { PaymentMethods } from './screen/paymentScreen'
import { PlaceOrder } from './screen/placeOrderScreen'
import { AllOrdersScreen } from './screen/orderScreeen'
import './style/homeStyle.css'
import './style/formStyle.css'
import "./style/numeroStyle.css"
import "./App.css"
import { UserListScreen } from './screen/userListScreen'
import { UserEdietScreen } from './screen/userEditeScreen'
import { ProductEditeScreen } from './screen/productEditeScreen'
import { ProductListScreen } from './screen/productsListScreen'
import { OrderListScreen } from './screen/orderListScreen'
import { SideBar } from './component/sideNavbar'

function App() {


  

  return (
      <BrowserRouter>
        
        <section className="content-fluid">
          <Routes>
            <Route path="/login" element={<><Header /><LoginScreen /><Footer /></>}  />
            <Route path="/placeorder" element={<><Header /><PlaceOrder /><Footer /></>}  />
            <Route path="/order/:id" element={<><Header /><AllOrdersScreen /><Footer /></>}  />
            <Route path="/payment" element={<><Header /><PaymentMethods/><Footer /></>}  />
            <Route path="/shipping" element={<><Header /><ShippingAddress /><Footer /></>}  />
            <Route path='/profile' element={<><Header /><ProfileScreen /><Footer /></>}/>
            <Route path="/register" element={<><Header /><RegisterScreen /><Footer /></>}  />
            <Route path="/product/:id" element={<><Header /><ProductScreen /><Footer /></>} />
            <Route path='/cart/:id?' element={<><Header /><CartScreen /><Footer /></>} />
            <Route path="/admin/users" element={<> <SideBar /> <UserListScreen /> </>}  />
            <Route path="/admin/products" element={<><SideBar /><ProductListScreen /> </>}  />
            <Route path="/admin/orders" element={<><SideBar /><OrderListScreen /></>}  />
            <Route path="/admin/user/:id/edit" element={<><SideBar /><UserEdietScreen /></>}  />
            <Route path="/admin/product/:id/edit" element={<><SideBar /><ProductEditeScreen /></>}  />
            <Route path="/" element={<><Header /><HomeScreen /><Footer /></>} exact />
          </Routes>
        </section>
        

        
      </BrowserRouter>
  )
}

export default App
