import React, { useEffect, useState } from 'react';
import { db } from './firebase'; // Firebase config
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { Button, Image, message, Spin } from 'antd';

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
    <div className="order-details-page w-[90%] m-auto">
      {orderDetails ? (
        <div className="order-details">
          <h1 className="text-3xl font-bold mb-4">Order Details</h1>
          <p className="mb-2">Order ID: {orderId}</p>
          <p className="mb-2">Customer Name: {orderDetails.name}</p>
          <p className="mb-2">Email: {orderDetails.email}</p>
          <p className="mb-2">Phone: {orderDetails.number}</p>
          <p className="mb-2">Address: {orderDetails.address}</p>
          <p className="mb-2">Total Items: {orderDetails.totalQuantity}</p>
          <p className="mb-2">Total Price: Rs. {orderDetails.totalPrice}</p>
          <p className="mb-2">Order Status: {orderDetails.Status}</p>
          <h3 className="mt-4 text-xl font-semibold">Items Purchased:</h3>  
          <div>

                <table className="w-full text-center">
                <thead className="h-[7vh]" style={{ background: "#faf1d4" }}>
                  <tr>
                    <th>Product Image</th>
                    <th className="w-[10vw]">Product Name</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    
                  </tr>
                </thead>
                {orderDetails.items.map((item, index) => (
                  <tbody key={index}>
                    <tr>
                      <td>
                        <Image src={item.image} height={100} width={100} />
                      </td>
                      <td>
                        <h1 className="text-blue-300 w-[10vw]">{item.title}</h1>
                      </td>
                      <td>
                        <h1>Rs. {item.price}</h1>
                      </td>
                      <td>
                        <Button>Quantity: {item.quantity}</Button>
                      </td>
                    </tr>
                  </tbody>
                ))}
              </table>

          </div>
          <Button
            className="mt-4"
            onClick={() => window.history.back()}
            type="primary"
          >
            Back to Orders
          </Button>
        </div>
      ) : (
        <Spin size="large" fullscreen={true} percent={"auto"}  />
      )}
    </div>
  );
};

export default OrderDetails;
