import React, { useState, useContext } from 'react';
import { Form, Input, Button, message, Modal } from 'antd';
import { auth, googleProvider } from './firebase';  // Import Firebase and Google provider
import { signInWithPopup } from 'firebase/auth';  // Import sign-in function from Firebase
import { CartContext } from '../context/CartContext'; // Import cart context
import { addDoc, collection } from 'firebase/firestore';
import { db } from './firebase';  // Firebase configuration
import { Link, useNavigate } from 'react-router-dom';
import producthero from '../assets/producthero1.1.jpg';
import Banner from '../componet/ProductsComponent/Banner';
import { CiCircleFilled } from '@ant-design/icons';
import { FirebaseContext } from '../context/FirebaseContext';
import navlogo from '../assets/navLogo.png';



function Checkout() {
  const { cartItems, clearCart } = useContext(CartContext); // Access cart items from context
  const [isLoading, setIsLoading] = useState(false);
  const [continueAsGuest, setContinueAsGuest] = useState(false);
  const [isConfirmationVisible, setIsConfirmationVisible] = useState(false); // For confirmation popup
  const [isLogin, setIsLogin] = useState(false);
  const { user, setUser } = useContext(FirebaseContext);
  console.log(cartItems)
  const navigate = useNavigate(); // To navigate between pages

  // Calculate total quantity and price
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce((sum, item) => sum + item.quantity * item.price, 0);

  // WhatsApp number to send the order details to
  const WHATSAPP_NUMBER = '923442241275'; // Update this with the actual number

  const checkOutOrder = async (values) => {
    setIsLoading(true);

    // Create checkout object containing user details and cart items
    const checkOutObj = {
      ...values,
      totalPrice,
      totalQuantity,
      Status: "pending",
      user: auth.currentUser ? auth.currentUser.uid : "guest",
      items: cartItems.map(
        (data) => ({
          title: data.title,
          price: data.price,
          quantity: data.quantity,
          image: data.thumbnail
        })
      ),
    };

    const docRef = collection(db, "orders");

    try {
      // Store checkout data in Firestore
      await addDoc(docRef, checkOutObj);
      message.success("Your order is placed!");

      // After placing the order, show confirmation popup
      setIsConfirmationVisible(true);

      // Send WhatsApp message with the order details
      const encodedOrderDetails = encodeURIComponent(
        `Order Details:
        Name: ${values.name}
        Email: ${values.email}
        Phone: ${values.number}
        Address: ${values.address}
        Total Items: ${totalQuantity}
        Total Price: $${Math.floor(totalPrice)}
        Items: ${cartItems.map(item => `(${item.quantity}) ${item.title} - $${item.price}`).join(', ')}
        `
      );

      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedOrderDetails}`);

      // Clear the cart after successful order placement
      clearCart();

    } catch (error) {
      message.error("Order placement failed: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

 // Google Sign-In function
const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider); // Open Google sign-in popup
    message.success(`Welcome, ${result.user.displayName}`); // Show success message
    setIsLogin(true);
    setUser(result.user); 
  } catch (error) {

    setIsLogin(false)
    setUser(null);
    message.error(`Google Sign-In failed: ${error.message}`); // Show error message if sign-in fails
  }
};


  // Function to handle the confirmation popup "OK" button
  const handleConfirmationOk = () => {
    setIsConfirmationVisible(false); // Close the modal
    navigate("/orders"); // Redirect to order confirmation page
  };

  return (
    <div className="checkout-page">
          <div style={{backgroundImage:
        `url(${producthero})`,
         height: "50vh",
        //  objectFit:"cover",
        //  marginTop:"-100px",
         backgroundSize: "cover",
         backgroundRepeat: "no-repeat",}}
         className="shop-hero h-[40vh] ">
          <div className="white h-full ">
           <div className="h-full text-center flex flex-col justify-center items-center">
            <div className='h-[7vh] w-[7vw] flex justify-center items-center'>
              <img src={navlogo} alt="Furnios" className='w-[100%]' /></div>
            <h1 className="font-semibold text-5xl">Checkout</h1>
            <div className="my-4 px-4 text-xl">
            <Link to={'/'} className="font-semibold">{"Home > "}</Link> <Link> Checkout</Link>
            </div>
           </div>
          </div>

         </div>

    
      {/* If user is not logged in */}
   {/* If user is not logged in */}
{!user && !continueAsGuest && (
  <div className="flex flex-col items-center w-1/2 h-2/3 mt-10 shadow p-4 m-auto">
    <p className='text-xl '>Please sign up to save your history</p>
    <Button onClick={signInWithGoogle} className='mt-6 p-6'
      style={{border:"1px solid #f5d776",color:"#f5d776"}}>
      Continue with Google
    </Button>
    <p className="text-center text-md m-4">-------OR-------</p>
    <Button onClick={() => setContinueAsGuest(true)}
      className='p-6 mb-6' style={{border:"1px solid #f5d776",color:"#f5d776"}}>
      Continue as a Guest
    </Button>
  </div>
)}


      {/* Show the form if user is guest or logged in */}
      {(user || continueAsGuest) && (
        <div className='w-[90vw] m-auto my-10 flex justify-between p-4'>
        <div className=' my-4 w-[50%] h-[70vh] '>
        <Form layout="vertical" onFinish={checkOutOrder} 
        className=' h-[100%] ' >
          <h1 className='text-3xl font-semibold'>Billing Details</h1>
          <Form.Item className='text-2xl' label="Name" name="name"
           rules={[{ required: true, message: 'Please enter your name' }]}>
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
         <div className="cart-summary my-4 p-4 w-[40vw] h-[50vh]" >
          <table className='w-full border-b-2'>
            <thead className='h-10'>
              <tr >
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
                <td className='text-right text-xl font-bold' style={{color:"#d6b754"}}>Rs.  ${Math.floor(totalPrice)}.+0000</td>
              </tr>
            </tbody>
          </table>
        
           <h1 className='font-semibold mt-2'>
             <span className='pr-6'><CiCircleFilled /></span>
             Direct Bank Tansfer</h1>
           <p className='text-sm text-justify px-1 mb-2'>Make ayour payment directly into bank account please use
             your Order in as payment release your order will not be
            shipped untill the funds have cleaned in our account
           </p>
           <input type="radio" name='bank' />
           <label htmlFor="bank" className='px-2'>Direct Bank Transfer</label><br />
           <input type="radio" name='bank' />
           <label htmlFor="bank" className='px-2'>Direct Bank Transfer</label>
           <div>
            <p className='px-1 text-justify mt-2 text-sm'>Your personal data will be used to support your experience
              throughout this website to manage to your account, and 
              for other purpose described in our <strong>privacy policy.</strong>
            </p>
           </div>
           <Button className='mx-10 w-1/2 my-5 p-5 px-10 border border-black'> Place Order</Button>
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




// i want if use is click on continue with google button then the user is login 