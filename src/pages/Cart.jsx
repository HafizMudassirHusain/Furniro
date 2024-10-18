import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { Button, Image } from "antd";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import Banner from "../componet/ProductsComponent/Banner";
import producthero from '../assets/producthero1.1.jpg';
import navlogo from '../assets/navLogo.png';


function Carts() {
  const { cartItems, updateToCart, removeCart } = useContext(CartContext);
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce((sum, item) => sum + item.quantity * item.price, 0);

  const navigate = useNavigate();

  const goToCheckout = () => {
    navigate("/checkout"); // Redirect to the Checkout page
  };

  return (
    <>
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
            <h1 className="font-semibold text-5xl tracking-wider">Cart</h1>
            <div className="my-4 px-4 text-xl">
            <Link to={'/'} className="font-semibold">{"Home > "}</Link> <Link> Cart</Link>
            </div>
           </div>
          </div>

         </div>


    <div className="container mx-auto p-10">
      <div className="flex flex-col lg:flex-row">
        <div className="flex flex-col w-full lg:w-[70vw]">
          {cartItems.length > 0 ? (
            <div className="flex items-center border shadow p-4 m-1">
              <table className="w-full text-center">
                <thead className="h-[7vh]" style={{ background: "#faf1d4" }}>
                  <tr>
                    <th></th>
                    <th className="w-[10vw]">Product</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Subtotal</th>
                    <th>Options</th>
                  </tr>
                </thead>
                {cartItems.map((data) => (
                  <tbody key={data.id}>
                    <tr>
                      <td>
                        <Image src={data.thumbnail} height={100} width={100} />
                      </td>
                      <td>
                        <h1 className="text-blue-300 w-[10vw]">{data.title}</h1>
                      </td>
                      <td>
                        <h1>${data.price}</h1>
                      </td>
                      <td>
                        <Button>{data.quantity}</Button>
                      </td>
                      <td>
                        <h1 className="text-2xl font-semibold">
                          ${Math.floor(data.quantity * data.price)}
                        </h1>
                      </td>
                      <td>
                        <Button onClick={() => updateToCart(data.id, "plus")}>Plus</Button>
                        <Button onClick={() => data.quantity <= 1 ? removeCart(data.id) : updateToCart(data.id, "minus")}>
                          {data.quantity <= 1 ? <CloseCircleOutlined /> : "Minus"}
                        </Button>
                      </td>
                    </tr>
                  </tbody>
                ))}
              </table>
            </div>
          ) : (
            <p className="text-center text-xl">Your cart is empty</p>
          )}
        </div>

        {/* Total Cart Section */}
        <div className="flex flex-col m-5 text-center w-full lg:w-[30vw] h-auto lg:h-[35vh]" style={{ background: "#faf1d4" }}>
          <h1 className="text-2xl font-bold mt-5 mb-5">Total Cart</h1>
          <div className="flex-grow flex justify-center items-center">
            <h1 className="text-md mx-5">Total Items</h1>
            <h1 className="text-md font-bold text-gray-300">{totalQuantity}</h1>
          </div>
          <div className="flex-grow flex justify-center items-center">
            <h1 className="text-md mx-5">Total</h1>
            <h1 className="text-xl font-bold" style={{ color: "#edc43e" }}>
              ${Math.floor(totalPrice)}
            </h1>
          </div>
          <div className="flex-grow flex justify-center mb-5 items-center">
            <Button className="p-5 border border-black" onClick={goToCheckout} icon={<CheckCircleOutlined />}>
              Proceed to Checkout
            </Button>
          </div>
        </div>
      </div>

      <Banner backColor={"#faf1d4"} />
    </div>
    </>
  );
}

export default Carts;
