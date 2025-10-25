import { useEffect, useState } from "react";
import { db } from "./firebase";
import { Link, useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { Button, Image, message, Spin } from "antd";
import producthero from "../assets/producthero1.1.jpg";
import navlogo from "../assets/navLogo.png";

const OrderDetails = () => {
  const { orderId } = useParams();
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const docRef = doc(db, "orders", orderId);
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

  return (
    <>
      {/* 🌟 Hero Section */}
      <div
        className="relative h-[40vh] flex flex-col justify-center items-center bg-cover bg-center"
        style={{ backgroundImage: `url(${producthero})` }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative text-center text-white z-10">
          <img
            src={navlogo}
            alt="Logo"
            className="mx-auto mb-3 w-20 sm:w-24 drop-shadow-lg"
          />
          <h1 className="text-4xl sm:text-5xl font-bold tracking-wide mb-2">
            Order Details
          </h1>
          <div className="text-lg sm:text-xl text-[#d4af37]">
            <Link to="/" className="hover:text-white transition">
              Home
            </Link>{" "}
            &gt; Order
          </div>
        </div>
      </div>

      {/* 🌟 Order Details Section */}
      <div className="max-w-5xl mx-auto my-10 px-4 sm:px-6">
        {orderDetails ? (
          <div className="bg-white shadow-xl rounded-2xl p-6 sm:p-10 border border-[#f6e8b1]">
            {/* Header Info */}
            <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-[#d4af37] border-b border-[#f1dca7] pb-2">
              Order Summary
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 text-gray-800">
              <p>
                <span className="font-semibold">Order ID:</span> {orderId}
              </p>
              <p>
                <span className="font-semibold">Customer Name:</span>{" "}
                {orderDetails.name}
              </p>
              <p>
                <span className="font-semibold">Email:</span>{" "}
                {orderDetails.email}
              </p>
              <p>
                <span className="font-semibold">Phone:</span>{" "}
                {orderDetails.number}
              </p>
              <p className="sm:col-span-2">
                <span className="font-semibold">Address:</span>{" "}
                {orderDetails.address}
              </p>
              <p>
                <span className="font-semibold">Total Items:</span>{" "}
                {orderDetails.totalQuantity}
              </p>
              <p>
                <span className="font-semibold">Total Price:</span>{" "}
                <span className="text-[#d4af37] font-semibold">
                  Rs. {orderDetails.totalPrice}
                </span>
              </p>
              <p className="sm:col-span-2">
                <span className="font-semibold">Order Status:</span>{" "}
                <span
                  className={`font-bold ${
                    orderDetails.Status?.toLowerCase() === "delivered"
                      ? "text-green-600"
                      : orderDetails.Status?.toLowerCase() === "pending"
                      ? "text-yellow-500"
                      : "text-red-500"
                  }`}
                >
                  {orderDetails.Status}
                </span>
              </p>
            </div>

            {/* Items Table */}
            <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-[#d4af37]">
              Purchased Items
            </h2>

            <div className="overflow-x-auto">
              <table className="min-w-full border border-[#f4e1a1] rounded-lg overflow-hidden">
                <thead className="bg-[#fff9e5] text-[#444]">
                  <tr>
                    <th className="p-3 text-sm sm:text-base font-semibold text-left">
                      Image
                    </th>
                    <th className="p-3 text-sm sm:text-base font-semibold text-left">
                      Product Name
                    </th>
                    <th className="p-3 text-sm sm:text-base font-semibold text-center">
                      Price
                    </th>
                    <th className="p-3 text-sm sm:text-base font-semibold text-center">
                      Quantity
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {orderDetails.items.map((item, index) => (
                    <tr
                      key={index}
                      className="hover:bg-[#fff6da] transition border-b border-[#f9efc8]"
                    >
                      <td className="p-3">
                        <Image
                          src={item.image}
                          alt={item.title}
                          width={90}
                          height={90}
                          className="rounded-lg shadow-sm"
                        />
                      </td>
                      <td className="p-3 text-[#555] font-medium">
                        {item.title}
                      </td>
                      <td className="p-3 text-center text-[#d4af37] font-semibold">
                        Rs. {item.price}
                      </td>
                      <td className="p-3 text-center">
                        <span className="inline-block bg-[#f9f1cb] text-[#333] px-3 py-1 rounded-full text-sm font-semibold">
                          {item.quantity}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Back Button */}
            <div className="text-center mt-8">
              <Button
                type="default"
                size="large"
                onClick={() => window.history.back()}
                className="!bg-[#d4af37] !text-white hover:!bg-[#c19f2c] transition-all rounded-full px-6"
              >
                Back to Orders
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex justify-center items-center h-[50vh]">
            <Spin size="large" />
          </div>
        )}
      </div>
    </>
  );
};

export default OrderDetails;
