
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter, Send } from "lucide-react";
import navlogo from "../assets/navLogo.png";

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 text-gray-700">
      {/* ======= TOP SECTION ======= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
        
        {/* Brand Info */}
        <div className="flex flex-col items-start">
          <div className="flex items-center space-x-2 mb-3">
            <img
              src={navlogo}
              alt="Website Logo"
              className="w-10 h-10 rounded-full"
            />
            <h2 className="text-2xl font-bold text-gray-800">Funiro</h2>
          </div>
          <p className="text-sm text-gray-500 leading-relaxed mb-4">
            Making furniture shopping simple, smart, and stylish.
          </p>

          {/* Contact Info */}
          <div className="space-y-3 text-sm text-gray-600">
            <p className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-orange-500" /> Karachi, Pakistan
            </p>
            <p className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-orange-500" /> +92 312 345 6789
            </p>
            <p className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-orange-500" /> support@funiro.com
            </p>
          </div>
        </div>

        {/* Website Pages */}
        <div className="flex flex-col">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">Website Pages</h3>
          <ul className="space-y-3 text-sm">
            {[
              { name: "Home", path: "/" },
              { name: "Shop", path: "/products" },
              { name: "Orders", path: "/orders" },
              { name: "Contact", path: "/contact" },
              { name: "Checkout", path: "/checkout" },
            ].map((link, i) => (
              <li key={i}>
                <Link
                  to={link.path}
                  className="hover:text-orange-500 transition duration-200"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Help Section */}
        <div className="flex flex-col">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">Help</h3>
          <ul className="space-y-3 text-sm">
            {[
              { name: "Payment", path: "/payment" },
              { name: "Returns", path: "/returns" },
              { name: "Privacy Policy", path: "/privacy-policy" },
            ].map((link, i) => (
              <li key={i}>
                <Link
                  to={link.path}
                  className="hover:text-orange-500 transition duration-200"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter */}
        <div className="flex flex-col">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">Newsletter</h3>
          <p className="text-sm text-gray-500 mb-4">
            Subscribe to get exclusive offers & updates.
          </p>

          <div className="flex items-center w-full">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-3 py-2 rounded-l-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 text-sm"
            />
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-r-lg transition">
              <Send className="w-4 h-4" />
            </button>
          </div>

          {/* Social Icons */}
          <div className="flex space-x-4 mt-6 text-gray-500">
            {[Facebook, Instagram, Twitter].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="hover:text-orange-500 transition transform hover:scale-110"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ======= BOTTOM SECTION ======= */}
      <div className="border-t border-gray-200 bg-white/70 backdrop-blur-sm py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500 gap-3 text-center md:text-left">
          <p>© {new Date().getFullYear()} Funiro. All rights reserved.</p>
          <p>
            Built with ❤️ by{" "}
            <a
              href="https://github.com/hafizmudassirhusain"
              target="_blank"
              rel="noreferrer"
              className="text-orange-500 hover:underline"
            >
              HMH
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
