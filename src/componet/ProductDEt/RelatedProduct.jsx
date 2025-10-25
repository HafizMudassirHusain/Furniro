import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Spin, Rate } from "antd";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

export default function RelatedProduct({ cate }) {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const carouselRef = useRef(null);

  useEffect(() => {
    if (!cate) return;
    setIsLoading(true);
    fetch(`https://dummyjson.com/products/category/${cate}?limit=6`)
      .then((res) => res.json())
      .then((res) => {
        setProducts(res.products || []);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, [cate]);

  const scroll = (direction) => {
    if (!carouselRef.current) return;
    const scrollAmount = direction === "left" ? -350 : 350;
    carouselRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Title */}
      <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
        Related Products
      </h2>

      {/* Arrows */}
      <button
        onClick={() => scroll("left")}
        className="hidden md:flex absolute left-4 top-[45%] z-10 bg-yellow-500 hover:bg-yellow-600 text-white p-3 rounded-full shadow-lg transition-all duration-300"
      >
        <FaArrowLeft />
      </button>
      <button
        onClick={() => scroll("right")}
        className="hidden md:flex absolute right-4 top-[45%] z-10 bg-yellow-500 hover:bg-yellow-600 text-white p-3 rounded-full shadow-lg transition-all duration-300"
      >
        <FaArrowRight />
      </button>

      {/* Products Carousel */}
      <motion.div
        ref={carouselRef}
        className="flex gap-6 overflow-x-auto pb-4 px-4 snap-x snap-mandatory scroll-smooth scrollbar-hide"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {products.map((item) => (
          <motion.div
            key={item.id}
            onClick={() => navigate(`/product/${item.id}`)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="min-w-[240px] max-w-[260px] bg-white rounded-xl shadow-md cursor-pointer snap-center overflow-hidden hover:shadow-xl transition-all duration-300"
          >
            <div className="relative w-full h-52 overflow-hidden">
              <img
                src={item.thumbnail}
                alt={item.title}
                className="object-cover w-full h-full hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3 bg-yellow-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                {item.category}
              </div>
            </div>

            <div className="p-4">
              <h3 className="text-gray-900 font-semibold text-lg truncate">
                {item.title}
              </h3>
              <p className="text-gray-500 text-sm line-clamp-2 mt-1">
                {item.description}
              </p>
              <div className="flex items-center justify-between mt-3">
                <span className="text-yellow-600 font-bold text-lg">
                  ${item.price}
                </span>
                <Rate
                  disabled
                  defaultValue={item.rating || 4}
                  className="text-yellow-500 text-sm"
                />
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Show More Button */}
      <div className="flex justify-center mt-10">
        <button
          onClick={() => navigate("/products")}
          className="border-2 border-yellow-500 text-yellow-600 font-semibold py-2 px-8 rounded-full hover:bg-yellow-500 hover:text-white transition-all duration-300"
        >
          Show More
        </button>
      </div>
    </div>
  );
}
