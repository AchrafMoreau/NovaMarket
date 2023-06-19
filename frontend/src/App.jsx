import Header from './component/header'
import Footer from './component/footer'
import HomeScreen from './screen/homeScreen'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ProductScreen from './screen/productScreen'
import { CartScreen } from './screen/cartScreen'
import { LoginScreen } from './screen/loginScreen'
import './App.css'

function App() {

  return (
      <BrowserRouter>
          <Header />
          <div className="container">
            <Routes>
              <Route path="/login" element={<LoginScreen />} exact />
              <Route path="/product/:id" element={<ProductScreen />} />
              <Route path='/cart/:id?' element={<CartScreen />} />
              <Route path="/" element={<HomeScreen />} exact />
            </Routes>
          </div>
          <Footer />
      </BrowserRouter>
  )
}

export default App
