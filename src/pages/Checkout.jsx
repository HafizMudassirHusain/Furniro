import { useState, useContext } from "react";
import { Form, Input, Button, message, Modal } from "antd";
import { auth, googleProvider } from "./firebase";
import { signInWithPopup } from "firebase/auth";
import { CartContext } from "../context/CartContext";
import { addDoc, collection } from "firebase/firestore";
import { db } from "./firebase";
import { Link, useNavigate } from "react-router-dom";
import producthero from "../assets/producthero1.1.jpg";
import Banner from "../componet/ProductsComponent/Banner";
import { CiCircleFilled } from "@ant-design/icons";
import { FirebaseContext } from "../context/FirebaseContext";
import navlogo from "../assets/navLogo.png";
import jsPDF from "jspdf";

function Checkout() {
  const { cartItems, clearCart } = useContext(CartContext);
  const [isLoading, setIsLoading] = useState(false);
  const [continueAsGuest, setContinueAsGuest] = useState(false);
  const [isConfirmationVisible, setIsConfirmationVisible] = useState(false);
  const { user, setUser } = useContext(FirebaseContext);
  const navigate = useNavigate();

  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );

  const WHATSAPP_NUMBER = "923442241275";

  const checkOutOrder = async (values) => {
    setIsLoading(true);
    const currentDateTime = new Date();
    const formattedDate = `${String(currentDateTime.getDate()).padStart(
      2,
      "0"
    )}/${String(currentDateTime.getMonth() + 1).padStart(
      2,
      "0"
    )}/${currentDateTime.getFullYear()}`;
    const formattedTime = `${String(currentDateTime.getHours()).padStart(
      2,
      "0"
    )}:${String(currentDateTime.getMinutes()).padStart(2, "0")}`;
    const currentDay = currentDateTime.toLocaleString("en-US", {
      weekday: "long",
    });

    const checkOutObj = {
      ...values,
      totalPrice,
      totalQuantity,
      Status: "pending",
      date: formattedDate,
      time: formattedTime,
      day: currentDay,
      user: auth.currentUser ? auth.currentUser.uid : "guest",
      items: cartItems.map((data) => ({
        title: data.title,
        price: data.price,
        quantity: data.quantity,
        image: data.thumbnail,
      })),
    };

    try {
      await addDoc(collection(db, "orders"), checkOutObj);
      message.success("Your order is placed!");
      setIsConfirmationVisible(true);

      generateInvoice(values, checkOutObj);

      const encodedOrderDetails = encodeURIComponent(
        `Order Details:\nName: ${values.name}\nEmail: ${values.email}\nPhone: ${values.number}\nAddress: ${values.address}\nTotal Items: ${totalQuantity}\nTotal Price: $${Math.floor(
          totalPrice
        )}\nItems: ${cartItems
          .map((item) => `(${item.quantity}) ${item.title} - $${item.price}`)
          .join(", ")}`
      );

      window.open(
        `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedOrderDetails}`
      );

      clearCart();
      navigate(user ? "/orders" : "/");
    } catch (error) {
      message.error("Order placement failed: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const generateInvoice = (values, orderDetails) => {
    const doc = new jsPDF();
    doc.text("Invoice", 10, 10);
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
      doc.text(
        `(${item.quantity}) ${item.title} - $${item.price}`,
        10,
        110 + index * 10
      );
    });
    doc.save("invoice.pdf");
  };

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      message.success(`Welcome, ${result.user.displayName}`);
      setUser(result.user);
    } catch (error) {
      message.error(`Google Sign-In failed: ${error.message}`);
    }
  };

  return (
    <div className="checkout-page">
      {/* 🟡 Hero */}
      <div
        style={{
          backgroundImage: `url(${producthero})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
        className="h-[40vh] md:h-[50vh] relative"
      >
        <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center text-white text-center">
          <img src={navlogo} alt="Logo" className="w-24 md:w-32 mb-3" />
          <h1 className="font-semibold text-4xl md:text-6xl mb-2">Checkout</h1>
          <p className="text-lg md:text-xl">
            <Link to="/" className="text-[#d4af37] font-semibold">
              Home &gt;
            </Link>{" "}
            Checkout
          </p>
        </div>
      </div>

      {/* 🟡 Sign-in or Guest */}
      {!user && !continueAsGuest && (
        <div className="flex flex-col items-center w-[90%] md:w-[60%] lg:w-[40%] mt-12 shadow-lg rounded-xl p-6 mx-auto text-center border border-[#d4af37]">
          <p className="text-xl mb-4 font-medium text-gray-700">
            Please sign up to save your order history
          </p>
          <Button
            onClick={signInWithGoogle}
            className="mt-4 py-5 px-8 rounded-md border border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37] hover:text-white transition-all"
          >
            Continue with Google
          </Button>
          <p className="text-md m-5 text-gray-500">— OR —</p>
          <Button
            onClick={() => setContinueAsGuest(true)}
            className="py-5 px-8 rounded-md border border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37] hover:text-white transition-all"
          >
            Continue as Guest
          </Button>
        </div>
      )}

      {/* 🟡 Checkout Form + Summary */}
      {(user || continueAsGuest) && (
        <div className="w-[95%] mx-auto my-10 flex flex-col lg:flex-row gap-10">
          {/* Form Section */}
          <div className="w-full lg:w-1/2 bg-white shadow-md p-6 rounded-xl border border-gray-200">
            <Form layout="vertical" onFinish={checkOutOrder}>
              <h1 className="text-3xl font-semibold mb-6 text-gray-700">
                Billing Details
              </h1>
              {["name", "email", "number", "address"].map((field, i) => (
                <Form.Item
                  key={i}
                  label={field.charAt(0).toUpperCase() + field.slice(1)}
                  name={field}
                  rules={[{ required: true, message: `Enter your ${field}` }]}
                >
                  <Input
                    className="p-4 rounded-md border border-gray-300 focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37]"
                    placeholder={`Enter your ${field}`}
                  />
                </Form.Item>
              ))}

              <Button
                type="primary"
                htmlType="submit"
                loading={isLoading}
                className="bg-[#d4af37] border-none px-6 py-5 rounded-md text-white font-medium hover:bg-[#c7a133] transition-all"
              >
                Submit Order
              </Button>
            </Form>
          </div>

          {/* Summary Section */}
          <div className="w-full lg:w-2/5 bg-[#faf9f6] border border-[#e8e6e3] shadow-md rounded-xl p-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-700">
              Order Summary
            </h2>
            <table className="w-full mb-4">
              <tbody>
                <tr>
                  <td className="text-gray-600">Total Items:</td>
                  <td className="text-right font-medium">{totalQuantity}</td>
                </tr>
                <tr>
                  <td className="text-gray-600 pt-3">Total Price:</td>
                  <td
                    className="text-right text-xl font-bold pt-3"
                    style={{ color: "#d4af37" }}
                  >
                    Rs. ${Math.floor(totalPrice)}
                  </td>
                </tr>
              </tbody>
            </table>

            <div className="mt-4 text-gray-700">
              <h3 className="font-semibold flex items-center gap-2">
                <CiCircleFilled /> Direct Bank Transfer
              </h3>
              <p className="text-sm mt-1">
                Make your payment directly into the bank account. Use your order
                ID as reference. Order will be shipped once funds are received.
              </p>

              <div className="my-3">
                <label className="flex items-center gap-2">
                  <input type="radio" name="bank" /> Direct Bank Transfer
                </label>
                <label className="flex items-center gap-2 mt-1">
                  <input type="radio" name="bank" /> EasyPaisa / JazzCash
                </label>
              </div>

              <p className="text-xs mt-2 text-gray-600">
                Your personal data will be used to process your order and support
                your experience as described in our{" "}
                <strong>privacy policy</strong>.
              </p>

              <Button className="mt-6 w-full border border-[#d4af37] text-[#d4af37] py-4 rounded-md hover:bg-[#d4af37] hover:text-white transition-all">
                Place Order
              </Button>
            </div>
          </div>
        </div>
      )}

      <Banner backColor={"#d4af37"} />

      {/* Modal */}
      <Modal
        title={<span style={{ color: "#d4af37" }}>Order Confirmation</span>}
        open={isConfirmationVisible}
        onOk={() => setIsConfirmationVisible(false)}
        okText="OK"
        cancelButtonProps={{ style: { display: "none" } }}
      >
        <p>Your order has been successfully placed!</p>
        <p>We’ve sent your order details to WhatsApp.</p>
      </Modal>
    </div>
  );
}

export default Checkout;
