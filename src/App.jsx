import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Dashbord from './pages/Dashbord'; 
import Cart from './pages/Cart';
import Orders from './pages/Orders';
import Auth from './pages/Auth/Auth';
import SignUp from './pages/Auth/SignUp';
import Checkout from './pages/Checkout';
import { FirebaseProvider } from './context/FirebaseContext';
import OrderDetails from './pages/OrderDetails';
import Login from './pages/Auth/Login';
import Contact from './componet/ContactUs/Contact';
import Admin from './pages/admin';

function App() {
  return (
    
    <BrowserRouter>
    <Routes > 
<Route path='/auth'>
<Route path='/auth' element={<Auth />}/>
<Route path='login' element={<Login />}/>
<Route path='signup' element={<SignUp />}/> 
<Route path='admin' element={<Admin />} />   
    </Route>
     

      <Route path='/' element={    <FirebaseProvider><Dashbord /></FirebaseProvider> }>
      <Route index element={<Home/>} />
      
      <Route path='/products' element={<Products />} />
      <Route path='/product/:id' element={<ProductDetail/>} />
      <Route path='/cart' element={<Cart />} />
      <Route path='/orders' element={<Orders />} />
      <Route path="/order-details/:orderId" element={<OrderDetails />} />
      <Route path="/checkout" element={<Checkout />} /> 
      <Route path='/contact' element={<Contact />}/>
      </Route>


    </Routes>
    </BrowserRouter>

  )
}

export default App;
