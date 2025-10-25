import React, { useEffect, useState } from "react";
import { Button, Modal, Form, Input } from "antd";
import { auth, googleProvider } from "../pages/firebase";
import { signInWithPopup } from "firebase/auth";

function Modals({
  isModalOpen,
  handleOk,
  handleCancel,
  checkOutOrder,
}) {
  const [continueAsGuest, setContinueAsGuest] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    setContinueAsGuest(false);
    setIsLogin(!!auth.currentUser);
  }, []);

  // Google sign-in
  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      setIsLogin(true);
    } catch (error) {
      console.error("Google Sign-in failed:", error.message);
    }
  };

  return (
    <Modal
      title={<span className="text-[#d4af37] font-semibold">Proceed to Checkout</span>}
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={null}
      centered
      width="90%"
      className="max-w-[600px]"
    >
      {/* When user is not logged in and not continuing as guest */}
      {!isLogin && !continueAsGuest && (
        <div className="flex flex-col items-center text-center p-4 space-y-4">
          <p className="text-lg font-medium text-gray-700">
            Please sign in to save your order history
          </p>

          <Button
            onClick={handleGoogleLogin}
            className="w-4/5 py-5 border border-[#d4af37] text-[#d4af37] font-medium rounded-md hover:bg-[#d4af37] hover:text-white transition-all"
          >
            Continue with Google
          </Button>

          <p className="text-gray-500">— OR —</p>

          <Button
            onClick={() => setContinueAsGuest(true)}
            className="w-4/5 py-5 border border-[#d4af37] text-[#d4af37] font-medium rounded-md hover:bg-[#d4af37] hover:text-white transition-all"
          >
            Continue as Guest
          </Button>
        </div>
      )}

      {/* Guest checkout form */}
      {!isLogin && continueAsGuest && (
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Guest Checkout
          </h2>

          <Form layout="vertical" onFinish={checkOutOrder}>
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: "Please enter your name" }]}
            >
              <Input className="p-3 rounded-md border border-gray-300 focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37]" />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: "Please enter your email" }]}
            >
              <Input className="p-3 rounded-md border border-gray-300 focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37]" />
            </Form.Item>

            <Form.Item
              label="Phone Number"
              name="number"
              rules={[{ required: true, message: "Please enter your phone number" }]}
            >
              <Input className="p-3 rounded-md border border-gray-300 focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37]" />
            </Form.Item>

            <Form.Item
              label="Address"
              name="address"
              rules={[{ required: true, message: "Please enter your address" }]}
            >
              <Input className="p-3 rounded-md border border-gray-300 focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37]" />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="w-full bg-[#d4af37] border-none py-4 text-white font-medium rounded-md hover:bg-[#c7a133] transition-all"
              >
                Submit Order
              </Button>
            </Form.Item>
          </Form>
        </div>
      )}

      {/* Already logged-in user (optional future state) */}
      {isLogin && (
        <div className="text-center py-6">
          <h3 className="text-lg font-semibold text-gray-700">
            You’re already logged in!
          </h3>
          <Button
            onClick={handleOk}
            className="mt-4 bg-[#d4af37] text-white font-medium px-6 py-3 rounded-md hover:bg-[#c7a133] transition-all"
          >
            Continue to Checkout
          </Button>
        </div>
      )}
    </Modal>
  );
}

export default Modals;
