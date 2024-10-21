import React, { useEffect, useState } from 'react';
import { db } from './firebase'; // Firebase config
import { collection, query, where, getDocs } from 'firebase/firestore';
import { FirebaseContext } from '../context/FirebaseContext'; 
import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, message, Spin } from 'antd';
import producthero from '../assets/producthero1.1.jpg';
import navlogo from '../assets/navLogo.png';


const Orders =  () => {
  const [orders, setOrders] = useState([]);
  const { user } = useContext(FirebaseContext); 
  const [Loading, setLoading] = useState(true);
console.log(orders);
console.log(user);

  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchOrders = async () => {
      if (user ) {
        const q = query(collection(db, 'orders'), where('user', '==', user.uid));
        const querySnapshot = await getDocs(q);
       const fetchedOrders = [];
        querySnapshot.forEach((doc) => {
          fetchedOrders.push({ ...doc.data(), id: doc.id });
        });
        setOrders(fetchedOrders);
        setLoading(false)
      } else {
      
        message.error("Please log in to view your orders.");
        // navigate("/auth/login"); // Redirect to login if user is not logged in
      }
    };

      fetchOrders();
  }, [user, navigate]);

  const handleViewOrderDetails = (orderId) => {
    navigate(`/order-details/${orderId}`); 
  };

  return (
    <div className="orders-page">
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


{
  user ? (
  <div className="body m-auto w-[90%]">
  

    <div>
      <h1 className="text-3xl sm:text-4xl font-bold mt-10">Welcome {user?.displayName}</h1>
    </div>

    <h1 className="text-2xl sm:text-3xl font-semibold mb-4 tracking-widest my-4 p-1">Here are all your Orders</h1>
    
    <div className="orders-list grid grid-cols-1 sm:grid-cols-2 gap-5">
      {orders.length > 0 ? (
        orders.map((order) => (
          <div key={order.id} className="order-item my-4 p-4 border rounded shadow bg-white">
            <h2 className="text-xl font-semibold">Order ID: {order.id}</h2>
            <p className="mb-2">Total Items: {order.totalQuantity}</p>
            <p className="mb-2">Total Price: Rs. {order.totalPrice}</p>
            <p className="mb-2">Status: {order.Status}</p>
            <Button
              className="px-8 py-4 border-none rounded-md hover:text-red-500 w-full"
              onClick={() => handleViewOrderDetails(order.id)}
              style={{ background: "rgb(191, 155, 14)", color: "black" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "white")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "black")}
            >
              View Order Details
            </Button>
          </div>
        ))
      ) : (
  
<Spin size="large" fullscreen={true} />

      )}
    </div>
  </div>
  ) : (
    <div className="text-center text-lg font-semibold">
    <p>Please log in to see your orders.</p>
    <div className="text-center text-lg font-semibold">No Orders Found</div>
  </div>
  )

}


</div>

  );
};

export default Orders;
