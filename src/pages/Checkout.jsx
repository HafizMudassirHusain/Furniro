import React, { useState, useContext } from 'react'; 
import { Form, Input, Button, message, Modal } from 'antd'; 
import { auth, googleProvider } from './firebase'; 
import { signInWithPopup } from 'firebase/auth'; 
import { CartContext } from '../context/CartContext'; 
import { addDoc, collection } from 'firebase/firestore'; 
import { db } from './firebase'; 
import { Link, useNavigate } from 'react-router-dom'; 
import producthero from '../assets/producthero1.1.jpg'; 
import Banner from '../componet/ProductsComponent/Banner'; 
import { CiCircleFilled } from '@ant-design/icons'; 
import { FirebaseContext } from '../context/FirebaseContext'; 
import navlogo from '../assets/navLogo.png'; 
import jsPDF from 'jspdf'; 

function Checkout() { 
  const { cartItems, clearCart } = useContext(CartContext); 
  const [isLoading, setIsLoading] = useState(false); 
  const [continueAsGuest, setContinueAsGuest] = useState(false); 
  const [isConfirmationVisible, setIsConfirmationVisible] = useState(false); 
  const [isLogin, setIsLogin] = useState(false); 
  const { user, setUser } = useContext(FirebaseContext); 
  const navigate = useNavigate();

  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0); 
  const totalPrice = cartItems.reduce((sum, item) => sum + item.quantity * item.price, 0); 
  const WHATSAPP_NUMBER = '923442241275';

  const checkOutOrder = async (values) => { 
    setIsLoading(true);

    // Get the current date and time
    const currentDateTime = new Date();
    const formattedDate = `${String(currentDateTime.getDate()).padStart(2, '0')}/${String(currentDateTime.getMonth() + 1).padStart(2, '0')}/${currentDateTime.getFullYear()}`;
    const hours = String(currentDateTime.getHours()).padStart(2, '0');
    const minutes = String(currentDateTime.getMinutes()).padStart(2, '0');
    const formattedTime = `${hours}:${minutes}`;
    const currentDay = currentDateTime.toLocaleString('en-US', { weekday: 'long' });

    const checkOutObj = { 
      ...values, 
      totalPrice, 
      totalQuantity, 
      Status: "pending", 
      date: formattedDate, 
      time: formattedTime, 
      day: currentDay, 
      user: auth.currentUser ? auth.currentUser.uid : "guest", 
      items: cartItems.map(data => ({ 
        title: data.title, 
        price: data.price, 
        quantity: data.quantity, 
        image: data.thumbnail 
      })), 
    };

    const docRef = collection(db, "orders");

    try { 
      await addDoc(docRef, checkOutObj); 
      message.success("Your order is placed!"); 
      setIsConfirmationVisible(true);

      // Generate and download the invoice
      generateInvoice(values, checkOutObj);

      const encodedOrderDetails = encodeURIComponent(
        `Order Details:\nName: ${values.name}\nEmail: ${values.email}\nPhone: ${values.number}\nAddress: ${values.address}\nTotal Items: ${totalQuantity}\nTotal Price: $${Math.floor(totalPrice)}\nItems: ${cartItems.map(item => `(${item.quantity}) ${item.title} - $${item.price}`).join(', ')}`
      );
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedOrderDetails}`);

      clearCart();
      
      // Conditional redirection based on user or guest
      if (user) {
        navigate("/orders");  // Redirect logged-in users to the Orders page
      } else {
        navigate("/");  // Redirect guests to the Home page
      }
      
    } catch (error) { 
      message.error("Order placement failed: " + error.message); 
    } finally { 
      setIsLoading(false); 
    } 
  };

  const generateInvoice = (values, orderDetails) => { 
    const doc = new jsPDF(); 
    doc.text(`Invoice`, 10, 10); 
    doc.text(`Name: ${values.name}`, 10, 20); 
    doc.text(`Email: ${values.email}`, 10, 30); 
    doc.text(`Phone: ${values.number}`, 10, 40); 
    doc.text(`Address: ${values.address}`, 10, 50); 
    doc.text(`Total Items: ${orderDetails.totalQuantity}`, 10, 60); 
    doc.text(`Total Price: $${Math.floor(orderDetails.totalPrice)}`, 10, 70); 
    doc.text(`Date: ${orderDetails.date}`, 10, 80); 
    doc.text(`Time: ${orderDetails.time}`, 10, 90); 
    doc.text(`Day: ${orderDetails.day}`, 10, 100); 
    orderDetails.items.forEach((item, index) => { 
      doc.text(`(${item.quantity}) ${item.title} - $${item.price}`, 10, 110 + index * 10); 
    }); 
    doc.save('invoice.pdf'); 
  };

  const signInWithGoogle = async () => { 
    try { 
      const result = await signInWithPopup(auth, googleProvider); 
      message.success(`Welcome, ${result.user.displayName}`); 
      setIsLogin(true); 
      setUser(result.user); 
    } catch (error) { 
      setIsLogin(false); 
      setUser(null); 
      message.error(`Google Sign-In failed: ${error.message}`); 
    } 
  };

  const handleConfirmationOk = () => { 
    setIsConfirmationVisible(false); 
    navigate("/orders"); 
  };

  return (
    <div className="checkout-page">
      <div
        style={{
          backgroundImage: `url(${producthero})`,
          height: "50vh",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
        className="shop-hero h-[40vh]"
      >
        <div className="white h-full">
          <div className="h-full text-center flex flex-col justify-center items-center">
            <div className="h-[7vh] w-[7vw] flex justify-center items-center">
              <img src={navlogo} alt="Furnios" className="w-[100%]" />
            </div>
            <h1 className="font-semibold text-5xl">Checkout</h1>
            <div className="my-4 px-4 text-xl">
              <Link to={'/'} className="font-semibold">{"Home > "}</Link> <Link> Checkout</Link>
            </div>
          </div>
        </div>
      </div>

      {/* If user is not logged in */}
      {!user && !continueAsGuest && (
        <div className="flex flex-col items-center w-[90%] md:w-1/2 h-2/3 mt-10 shadow p-4 m-auto">
          <p className='text-xl'>Please sign up to save your history</p>
          <Button onClick={signInWithGoogle} className='mt-6 p-6' style={{ border: "1px solid #f5d776", color: "#f5d776" }}>
            Continue with Google
          </Button>
          <p className="text-center text-md m-4">-------OR-------</p>
          <Button onClick={() => setContinueAsGuest(true)} className='p-6 mb-6' style={{ border: "1px solid #f5d776", color: "#f5d776" }}>
            Continue as a Guest
          </Button>
        </div>
      )}

      {/* Show the form if user is guest or logged in */}
      {(user || continueAsGuest) && (
        <div className='w-[90vw] m-auto my-10 flex flex-col lg:flex-row p-4'>
          <div className='my-4 w-full lg:w-[50%] h-[70vh]'>
            <Form layout="vertical" onFinish={checkOutOrder} className='h-full'>
              <h1 className='text-3xl font-semibold'>Billing Details</h1>
              <Form.Item className='text-2xl' label="Name" name="name" rules={[{ required: true, message: 'Please enter your name' }]}>
                <Input className='p-4' />
              </Form.Item>
              <Form.Item className='text-2xl' label="Email" name="email" rules={[{ required: true, message: 'Please enter your email' }]}>
                <Input className='p-4' />
              </Form.Item>
              <Form.Item className='text-2xl' label="Phone Number" name="number" rules={[{ required: true, message: 'Please enter your phone number' }]}>
                <Input className='p-4' />
              </Form.Item>
              <Form.Item className='text-2xl' label="Address" name="address" rules={[{ required: true, message: 'Please enter your address' }]}>
                <Input className='p-4' />
              </Form.Item>
              <Form.Item>
                <Button className='mx-4 py-6 px-6' type="primary" htmlType="submit" loading={isLoading}>
                  Submit Order
                </Button>
              </Form.Item>
            </Form>
          </div>

          {/* Display Cart Summary */}
          <div className="cart-summary my-4 p-4 w-full lg:w-[40vw] h-auto lg:h-[50vh]">
            <table className='w-full border-none outline-none'>
              <thead className='h-10'>
                <tr>
                  <th className='text-left text-xl font-bold'>Product</th>
                  <th className='text-right text-xl font-bold'>Subtotal</th>
                </tr>
              </thead>
              <tbody>
                <tr className='h-10'>
                  <td className='text-left'>Total Items:</td>
                  <td className='text-right'>{totalQuantity}.+000</td>
                </tr>
                <tr className='h-10'>
                  <td className='text-left'>Total:</td>
                  <td className='text-right text-xl font-bold' style={{ color: "#d6b754" }}>Rs. ${Math.floor(totalPrice)}.+0000</td>
                </tr>
              </tbody>
            </table>

            <h1 className='font-semibold mt-2'>
              <span className='pr-6'><CiCircleFilled /></span>
              Direct Bank Transfer
            </h1>
            <p className='text-sm text-justify px-1 mb-2'>Make your payment directly into the bank account. Please use your Order as payment reference. Your order will not be shipped until the funds have cleared in our account.</p>
            
            <input type="radio" name='bank' id='bank1' />
            <label htmlFor="bank1" className='px-2'>Direct Bank Transfer</label><br />
            <input type="radio" name='bank' id='bank2' />
            <label htmlFor="bank2" className='px-2'>Direct Bank Transfer</label>
            
            <div>
              <p className='px-1 text-justify mt-2 text-sm'>Your personal data will be used to support your experience throughout this website, to manage your account, and for other purposes described in our <strong>privacy policy.</strong></p>
            </div>
            
            <Button className=' w-full lg:w-1/2 my-5 p-5 px-10 border border-black'>Place Order</Button>
          </div>
        </div>
      )}

      <Banner backColor={"#f5d776"} />

      {/* Confirmation Popup */}
      <Modal
        title="Order Confirmation"
        visible={isConfirmationVisible}
        onOk={handleConfirmationOk}
        onCancel={() => setIsConfirmationVisible(false)}
        okText="OK"
        cancelText="Cancel"
      >
        <p>Your order has been successfully placed!</p>
        <p>We have sent the order details to WhatsApp.</p>
      </Modal>
    </div>
  );
}

export default Checkout;
