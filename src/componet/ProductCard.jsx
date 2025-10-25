import { Col } from "antd";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

function ProductCard({ item }) {
  const { isItemAdded, addToCart } = useContext(CartContext);
  const isAdded = isItemAdded(item.id);
  const navigate = useNavigate();

  return (
    <Col xs={24} sm={12} md={8} lg={6} className="mb-8 flex justify-center">
      <motion.div
        whileHover={{ y: -6 }}
        transition={{ duration: 0.3 }}
        className="relative group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer w-[280px]"
        onClick={() => navigate(`/product/${item.id}`)}
      >
        {/* Image Section */}
        <div className="relative w-full aspect-[4/5] overflow-hidden bg-gray-50">
          <motion.img
            src={item.thumbnail}
            alt={item.title}
            className="w-full h-full object-contain transition-transform duration-700 ease-out group-hover:scale-105"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

          {/* Add to Cart Button */}
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={(e) => {
              e.stopPropagation();
              addToCart(item);
            }}
            className={`absolute bottom-[-60px] left-1/2 -translate-x-1/2 px-6 py-3 rounded-full font-semibold text-white 
              ${isAdded ? "bg-green-500" : "bg-yellow-500 hover:bg-yellow-600"} 
              shadow-lg transition-all duration-500 group-hover:bottom-5`}
          >
            {isAdded ? "Added" : (
              <span className="flex items-center gap-2">
                <ShoppingCartOutlined /> Add to Cart
              </span>
            )}
          </motion.button>
        </div>

        {/* Product Info */}
        <div className="p-5 text-center bg-white">
          <h2 className="font-semibold text-gray-800 text-lg mb-1 truncate group-hover:text-yellow-600 transition-colors">
            {item.title}
          </h2>
          <p className="text-gray-500 text-sm mb-2 truncate">{item.brand}</p>
          <p className="text-yellow-600 font-bold text-xl">${item.price}</p>
        </div>
      </motion.div>
    </Col>
  );
}

export default ProductCard;
