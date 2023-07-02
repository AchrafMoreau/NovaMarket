import Header from './component/header'
import Footer from './component/footer'
import HomeScreen from './screen/homeScreen'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ProductScreen from './screen/productScreen'
import { CartScreen } from './screen/cartScreen'
import { LoginScreen } from './screen/loginScreen'
import { RegisterScreen } from './screen/registerScreen'
import { ProfileScreen } from './screen/profileScreen'
import { ShippingAddress } from './screen/shippingScreen';
import { PaymentMethods } from './screen/paymentScreen'
import { PlaceOrder } from './screen/placeOrderScreen'
import { AllOrdersScreen } from './screen/orderScreeen'
import './App.css'
import { Modlue3d } from './component/test3d'
import { UserListScreen } from './screen/userListScreen'
import { UserEdietScreen } from './screen/userEditeScreen'
import { ProductEditeScreen } from './screen/productEditeScreen'
import { ProductListScreen } from './screen/productsListScreen'

function App() {

  return (
      <BrowserRouter>
          <Header />
          <div className="container-fluid">
            <Routes>
              <Route path="/login" element={<LoginScreen />}  />
              <Route path="/placeorder" element={<PlaceOrder />}  />
              <Route path="/order/:id" element={<AllOrdersScreen />}  />
              <Route path="/payment" element={<PaymentMethods/>}  />
              <Route path="/shipping" element={<ShippingAddress />}  />
              <Route path='/profile' element={<ProfileScreen />}/>
              <Route path="/register" element={<RegisterScreen />}  />
              <Route path="/product/:id" element={<ProductScreen />} />
              <Route path='/cart/:id?' element={<CartScreen />} />
              <Route path="/module" element={<Modlue3d />}  />
              <Route path="/admin/users" element={<UserListScreen />}  />
              <Route path="/admin/products" element={<ProductListScreen />}  />
              <Route path="/admin/user/:id/edit" element={<UserEdietScreen />}  />
              <Route path="/admin/product/:id/edit" element={<ProductEditeScreen />}  />
              <Route path="/" element={<HomeScreen />} exact />

            </Routes>
          </div>
          <Footer />
      </BrowserRouter>
  )
}

export default App
