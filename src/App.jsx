import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Dashbord from "./pages/Dashbord";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import Checkout from "./pages/Checkout";
import OrderDetails from "./pages/OrderDetails";
import Contact from "./componet/ContactUs/Contact";

// Auth Pages
import Auth from "./pages/Auth/Auth";
import SignUp from "./pages/Auth/SignUp";
import Login from "./pages/Auth/Login";
import Admin from "./pages/Auth/Admin";
import UserManagement from "./pages/Auth/UserManagement";

// Context
import { FirebaseProvider } from "./context/FirebaseContext";

// Scroll Restoration
import { useEffect } from "react";
import { useLocation } from "react-router-dom";


function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  return (
    <BrowserRouter>
      <FirebaseProvider>
        <ScrollToTop />

        <Routes>
          {/* ========== AUTH ROUTES ========== */}
          <Route path="/auth">
         
            <Route index element={<Auth />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="admin" element={<Admin />} />
            <Route path="users" element={<UserManagement />} />
          </Route>

          {/* ========== MAIN DASHBOARD ========== */}
          <Route path="/" element={<Dashbord />}>
            <Route index element={<Home />} />
            <Route path="products" element={<Products />} />
            <Route path="product/:id" element={<ProductDetail />} />
            <Route path="cart" element={<Cart />} />
            <Route path="orders" element={<Orders />} />
            <Route path="order-details/:orderId" element={<OrderDetails />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="contact" element={<Contact />} />
          </Route>

          {/* ========== 404 FALLBACK ========== */}
          <Route
            path="*"
            element={
              <div className="flex items-center justify-center h-screen text-center">
                <div>
                  <h1 className="text-5xl font-bold text-gray-800 mb-4">
                    404
                  </h1>
                  <p className="text-gray-600 mb-6">
                    Oops! The page you’re looking for doesn’t exist.
                  </p>
                  <a
                    href="/"
                    className="bg-[#e0c869] text-white px-6 py-2 rounded-lg hover:bg-[#c7b15b] transition"
                  >
                    Go Home
                  </a>
                </div>
              </div>
            }
          />
        </Routes>
      </FirebaseProvider>
    </BrowserRouter>
  );
}

export default App;
