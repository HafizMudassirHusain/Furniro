import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Avatar, Badge, Dropdown, Modal, Button } from "antd";
import { Menu, X, ShoppingCart} from "lucide-react";
import navlogo from "../assets/navLogo.png";
import { CartContext } from "../context/CartContext";
import { FirebaseContext } from "../context/FirebaseContext";
import Carts from "../pages/Cart";
import { auth, googleProvider, signInWithPopup, signOut } from "../pages/firebase";

export default function Header() {
  const { cartItems } = useContext(CartContext);
  const { user, setUser } = useContext(FirebaseContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));

    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const loggedUser = result.user;
      setUser(loggedUser);
      localStorage.setItem("user", JSON.stringify(loggedUser));
    } catch (error) {
      alert("Login failed. Try again.");
      console.error(error);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
    localStorage.removeItem("user");
    navigate("/");
  };

  const menuItems = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: "Orders", path: "/orders" },
    { name: "Contact", path: "/contact" },
  ];

  const userMenu = {
    items: [
      { key: "1", label: <Link to="/profile">Profile</Link> },
      { key: "2", label: <span onClick={handleLogout}>Logout</span> },
    ],
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "backdrop-blur-md bg-white/70 shadow-lg"
          : "bg-white/90 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center space-x-2 text-xl font-semibold text-gray-800"
          >
            <img src={navlogo} alt="logo" className="w-10 h-10 rounded-full" />
            <span className="font-bold tracking-wide">ECOM</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="text-gray-600 hover:text-gray-900 transition font-medium"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Right Section */}
          <div className="hidden md:flex items-center space-x-4">
            {!user ? (
              <>
                <Button
                  onClick={handleGoogleLogin}
                  className="bg-gradient-to-r from-orange-400 to-orange-500 text-white px-4 py-1 rounded-md hover:from-orange-500 hover:to-orange-600 transition"
                >
                  Sign in with Google
                </Button>
              </>
            ) : (
              <Dropdown menu={userMenu} placement="bottomRight" arrow>
                <Avatar
                  src={user.photoURL}
                  size="large"
                  className="cursor-pointer border border-gray-300"
                />
              </Dropdown>
            )}

            {/* Cart */}
            <button
              onClick={() => setIsCartModalOpen(true)}
              className="relative text-gray-700 hover:text-orange-500 transition"
            >
              <Badge count={cartItems.length} size="small">
                <ShoppingCart className="h-6 w-6" />
              </Badge>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-gray-700 rounded-md hover:bg-gray-100"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`fixed top-16 left-0 w-full bg-white/95 backdrop-blur-md shadow-md transform transition-all duration-300 ${
          isMenuOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
        } md:hidden`}
      >
        <div className="flex flex-col px-6 py-4 space-y-3">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className="text-gray-700 font-medium hover:text-orange-500 transition"
              onClick={() => setIsMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}

          <div className="pt-4 border-t border-gray-200 flex items-center justify-between">
            {!user ? (
              <Button
                onClick={handleGoogleLogin}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white rounded-md"
              >
                Continue with Google
              </Button>
            ) : (
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-2">
                  <Avatar src={user.photoURL} />
                  <span className="text-gray-700 font-medium">
                    {user.displayName}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="text-sm text-red-500 hover:underline"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Cart Modal */}
      <Modal
        title="🛒 Your Cart"
        open={isCartModalOpen}
        onCancel={() => setIsCartModalOpen(false)}
        footer={[
          <Button key="cart" type="primary" onClick={() => navigate("/cart")}>
            Go to Cart
          </Button>,
          <Button key="close" onClick={() => setIsCartModalOpen(false)}>
            Close
          </Button>,
        ]}
        width={750}
        className="rounded-xl"
      >
        <div className="max-h-[60vh] overflow-y-auto rounded-lg bg-gray-50 p-3">
          <Carts isModal={true} />
        </div>
      </Modal>
    </nav>
  );
}
