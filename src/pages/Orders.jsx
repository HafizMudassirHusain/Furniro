import { useEffect, useState, useContext } from "react";
import { db } from "./firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { FirebaseContext } from "../context/FirebaseContext";
import { Link, useNavigate } from "react-router-dom";
import { Button, message, Spin, Empty } from "antd";
import { ShoppingBag, Package, IndianRupee, Truck } from "lucide-react";
import producthero from "../assets/producthero1.1.jpg";
import navlogo from "../assets/navLogo.png";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const { user } = useContext(FirebaseContext);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        if (user) {
          const q = query(collection(db, "orders"), where("user", "==", user.uid));
          const querySnapshot = await getDocs(q);
          const fetchedOrders = [];
          querySnapshot.forEach((doc) => {
            fetchedOrders.push({ ...doc.data(), id: doc.id });
          });
          setOrders(fetchedOrders);
        } else {
          message.error("Please log in to view your orders.");
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
        message.error("Failed to load orders. Try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  const handleViewOrderDetails = (orderId) => {
    navigate(`/order-details/${orderId}`);
  };

  return (
    <div className="orders-page">
      {/* ===== HERO SECTION ===== */}
      <div
        style={{
          backgroundImage: `url(${producthero})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
        className="relative h-[45vh] flex items-center justify-center"
      >
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]" />
        <div className="relative z-10 text-center text-white">
          <div className="flex justify-center mb-4">
            <img src={navlogo} alt="Funiro" className="w-16 h-16 rounded-full shadow-lg" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-wide mb-2">My Orders</h1>
          <p className="text-lg opacity-90">
            <Link to="/" className="hover:text-[#d4af37] transition">Home</Link> &gt; Orders
          </p>
        </div>
      </div>

      {/* ===== BODY SECTION ===== */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-10 py-12">
        {user ? (
          <>
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold mb-2">
                Welcome, <span className="text-[#d4af37]">{user?.displayName || "User"}</span>
              </h2>
              <p className="text-gray-600 text-lg">Here are all your recent orders 🛍️</p>
            </div>

            {loading ? (
              <div className="flex justify-center items-center h-[40vh]">
                <Spin size="large" />
              </div>
            ) : orders.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="group border border-gray-200 rounded-2xl bg-white shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden"
                  >
                    <div className="p-5 flex flex-col justify-between h-full">
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <h2 className="text-lg font-semibold text-gray-800">
                            <Package className="inline-block mr-2 text-[#d4af37]" size={18} />
                            Order #{order.id.slice(0, 6)}
                          </h2>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              order.Status === "Delivered"
                                ? "bg-green-100 text-green-600"
                                : "bg-yellow-100 text-yellow-600"
                            }`}
                          >
                            {order.Status || "Pending"}
                          </span>
                        </div>

                        <p className="text-gray-600 mb-2 flex items-center">
                          <ShoppingBag size={16} className="mr-2 text-gray-400" />{" "}
                          {order.totalQuantity} items
                        </p>

                        <p className="text-gray-600 mb-2 flex items-center">
                          <IndianRupee size={16} className="mr-2 text-gray-400" />{" "}
                          {order.totalPrice}
                        </p>

                        <p className="text-gray-600 flex items-center">
                          <Truck size={16} className="mr-2 text-gray-400" />{" "}
                          {order.deliveryAddress || "Address not available"}
                        </p>
                      </div>

                      <Button
                        onClick={() => handleViewOrderDetails(order.id)}
                        className="mt-6 w-full py-2 text-base font-medium border-none rounded-lg bg-[#d4af37] text-black hover:bg-[#b8962d] transition-all duration-300"
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex justify-center items-center h-[40vh]">
                <Empty description="No Orders Found" />
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-16">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              Please log in to see your orders.
            </h2>
            <Button
              type="primary"
              size="large"
              onClick={() => navigate("/auth/login")}
              className="bg-[#d4af37] hover:bg-[#b8962d] border-none text-black"
            >
              Go to Login
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
