import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Button, Image } from "antd";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  PlusOutlined,
  MinusOutlined,
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import Banner from "../componet/ProductsComponent/Banner";
import producthero from "../assets/producthero1.1.jpg";
import navlogo from "../assets/navLogo.png";

function Carts() {
  const { cartItems, updateToCart, removeCart } = useContext(CartContext);
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );

  const navigate = useNavigate();
  const goToCheckout = () => navigate("/checkout");

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
            Your Cart
          </h1>
          <div className="text-lg sm:text-xl text-[#d4af37]">
            <Link to="/" className="hover:text-white transition">
              Home
            </Link>{" "}
            &gt; Cart
          </div>
        </div>
      </div>

      {/* 🌟 Cart Content */}
      <div className="container mx-auto p-5 md:p-10">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* 🛒 Cart Table */}
          <div className="flex-1 bg-white rounded-2xl shadow-lg p-4 sm:p-6 border border-[#f7e7b3]">
            {cartItems.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full text-center border-collapse">
                  <thead className="bg-[#fff9e5] text-[#444] border-b border-[#f4e1a1]">
                    <tr>
                      <th className="p-3 text-sm sm:text-base">Image</th>
                      <th className="p-3 text-sm sm:text-base text-left">
                        Product
                      </th>
                      <th className="p-3 text-sm sm:text-base">Price</th>
                      <th className="p-3 text-sm sm:text-base">Quantity</th>
                      <th className="p-3 text-sm sm:text-base">Subtotal</th>
                      <th className="p-3 text-sm sm:text-base">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((data) => (
                      <tr
                        key={data.id}
                        className="hover:bg-[#fff6da] transition border-b border-[#f9efc8]"
                      >
                        <td className="p-3">
                          <Image
                            src={data.thumbnail}
                            alt={data.title}
                            width={90}
                            height={90}
                            className="rounded-md shadow-sm"
                          />
                        </td>
                        <td className="p-3 text-left font-medium text-gray-700">
                          {data.title}
                        </td>
                        <td className="p-3 text-[#d4af37] font-semibold">
                          Rs. {data.price}
                        </td>
                        <td className="p-3">
                          <div className="flex justify-center items-center gap-2">
                            <Button
                              icon={<MinusOutlined />}
                              onClick={() =>
                                data.quantity <= 1
                                  ? removeCart(data.id)
                                  : updateToCart(data.id, "minus")
                              }
                              className="!border-[#d4af37] hover:!bg-[#d4af37] hover:!text-white"
                            />
                            <span className="px-3 font-semibold">
                              {data.quantity}
                            </span>
                            <Button
                              icon={<PlusOutlined />}
                              onClick={() => updateToCart(data.id, "plus")}
                              className="!border-[#d4af37] hover:!bg-[#d4af37] hover:!text-white"
                            />
                          </div>
                        </td>
                        <td className="p-3 font-semibold text-gray-800">
                          Rs. {Math.floor(data.quantity * data.price)}
                        </td>
                        <td className="p-3">
                          <Button
                            danger
                            type="primary"
                            icon={<CloseCircleOutlined />}
                            onClick={() => removeCart(data.id)}
                            className="hover:!bg-red-600"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="text-xl font-semibold text-gray-600">
                  Your cart is empty 🛍️
                </p>
                <Link to="/" className="text-[#d4af37] hover:underline mt-2 inline-block">
                  Continue Shopping
                </Link>
              </div>
            )}
          </div>

          {/* 💰 Total Summary Box */}
          <div className="w-full lg:w-[30%] bg-white shadow-lg rounded-2xl border border-[#f7e7b3] p-6 flex flex-col justify-between">
            <h1 className="text-2xl font-bold mb-4 text-[#d4af37] border-b border-[#f1dca7] pb-2 text-center">
              Cart Summary
            </h1>
            <div className="flex justify-between text-gray-700 mb-3">
              <span>Total Items:</span>
              <span className="font-semibold">{totalQuantity}</span>
            </div>
            <div className="flex justify-between text-gray-700 mb-6">
              <span>Total Price:</span>
              <span className="font-semibold text-[#d4af37] text-lg">
                Rs. {Math.floor(totalPrice)}
              </span>
            </div>
            <Button
              type="default"
              icon={<CheckCircleOutlined />}
              onClick={goToCheckout}
              className="!bg-[#d4af37] !text-white hover:!bg-[#c19f2c] transition-all rounded-full py-5 text-lg font-semibold"
            >
              Proceed to Checkout
            </Button>
          </div>
        </div>

        {/* 🖼 Banner */}
        <div className="mt-10">
          <Banner backColor={"#fff9e5"} />
        </div>
      </div>
    </>
  );
}

export default Carts;
