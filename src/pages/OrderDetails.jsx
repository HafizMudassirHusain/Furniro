import React, { useEffect, useState } from 'react';
import { db } from './firebase'; // Firebase config
import { Link, useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { Button, Image, message, Spin } from 'antd';
import producthero from '../assets/producthero1.1.jpg';
import navlogo from '../assets/navLogo.png';  

const OrderDetails = () => {
  const { orderId } = useParams(); // Get the order ID from URL params
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const docRef = doc(db, 'orders', orderId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setOrderDetails(docSnap.data());
        } else {
          message.error("Order not found.");
        }
      } catch (error) {
        message.error("Failed to fetch order details: " + error.message);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  console.log(orderId) 

  return (

<>

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
        <h1 className="font-semibold text-5xl">Orders</h1>
        <div className="my-4 px-4 text-xl">
          <Link to={'/'} className="font-semibold">{"Home > "}</Link>
          <Link> orders</Link>
        </div>
      </div>
    </div>
  </div>


<div className="order-details-page w-[90%] m-auto my-5">
  {orderDetails ? (
    <div className="order-details p-4 sm:p-6 lg:p-8 bg-white rounded-md">
      <h1 className="text-2xl sm:text-3xl font-bold mb-4">Order Details</h1>
      <p className="mb-2 text-left text-sm sm:text-base">Order ID: <span className="font-semibold">{orderId}</span></p>
      <p className="mb-2 text-sm text-left sm:text-base">Customer Name: <span className="font-semibold">{orderDetails.name}</span></p>
      <p className="mb-2 text-sm text-left sm:text-base">Email: <span className="font-semibold">{orderDetails.email}</span></p>
      <p className="mb-2 text-sm text-left sm:text-base">Phone: <span className="font-semibold">{orderDetails.number}</span></p>
      <p className="mb-2 text-sm text-left sm:text-base">Address: <span className="font-semibold">{orderDetails.address}</span></p>
      <p className="mb-2 text-sm text-left sm:text-base">Total Items: <span className="font-semibold">{orderDetails.totalQuantity}</span></p>
      <p className="mb-2 text-sm text-left sm:text-base">Total Price: <span className="font-semibold">Rs. {orderDetails.totalPrice}</span></p>
      <p className="mb-2 text-sm text-left sm:text-base">Order Status: <span className="font-semibold">{orderDetails.Status}</span></p>
      <h3 className="mt-4 text-lg sm:text-xl font-semibold">Items Purchased:</h3>
      
      <div className="overflow-x-auto">
        <table className="w-full text-center">
          <thead className="h-[7vh]" style={{ background: "#faf1d4" }}>
            <tr>
              <th className="text-sm sm:text-base">Product Image</th>
              <th className="w-[30%] text-sm sm:text-base">Product Name</th>
              <th className="text-sm sm:text-base">Price</th>
              <th className="text-sm sm:text-base">Quantity</th>
            </tr>
          </thead>
          <tbody>
            {orderDetails.items.map((item, index) => (
              <tr key={index}>
                <td>
                  <Image src={item.image} height={100} width={100} />
                </td>
                <td>
                  <h1 className="text-blue-300 text-sm sm:text-base">{item.title}</h1>
                </td>
                <td>
                  <h1 className="text-sm sm:text-base">Rs. {item.price}</h1>
                </td>
                <td>
                  <Button className="text-sm sm:text-base">Quantity: {item.quantity}</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Button
        className="mt-4 w-full sm:w-auto p-2 sm:p-4"
        onClick={() => window.history.back()}
        type="primary"
      >
        Back to Orders
      </Button>
    </div>
  ) : (
    <Spin size="large" fullscreen={true} />
  )}
</div>
</>


  

  );
};

export default OrderDetails;
