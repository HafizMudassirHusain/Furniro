import { useContext, useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import RelatedProduct from "../componet/ProductDEt/RelatedProduct";
import { motion } from "framer-motion";
import { Spin, Rate, Image } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";

function ProductDetail() {
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const { addToCart, isItemAdded } = useContext(CartContext);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    fetch(`https://dummyjson.com/products/${id}`)
      .then((res) => res.json())
      .then((res) => {
        setProduct(res);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[80vh] bg-gray-50">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <section className="text-gray-700 body-font overflow-hidden bg-gray-50 min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-yellow-100/50 py-4 px-6 md:px-16 flex justify-between items-center border-b border-yellow-200">
        <div className="flex items-center text-sm md:text-base text-gray-600">
          <Link to="/" className="hover:text-yellow-600">Home</Link>
          <span className="mx-2">{">"}</span>
          <Link to="/products" className="hover:text-yellow-600">Shop</Link>
          <span className="mx-2">{">"}</span>
          <span className="font-semibold text-gray-900">{product.title}</span>
        </div>
      </div>

      {/* Product Section */}
      <div className="container mx-auto px-6 md:px-16 py-16">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Product Image Gallery */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:w-1/2 w-full"
          >
            <div className="rounded-2xl overflow-hidden shadow-lg bg-white p-3">
              <Image.PreviewGroup>
                <Image
                  src={product.thumbnail}
                  alt={product.title}
                  className="rounded-xl object-cover w-full max-h-[550px]"
                />
                <div className="grid grid-cols-4 gap-2 mt-4">
                  {product.images?.slice(0, 4).map((img, i) => (
                    <Image
                      key={i}
                      src={img}
                      className="rounded-md hover:opacity-80 cursor-pointer object-cover h-[80px]"
                      alt={`${product.title} ${i}`}
                    />
                  ))}
                </div>
              </Image.PreviewGroup>
            </div>
          </motion.div>

          {/* Product Details */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:w-1/2 w-full flex flex-col justify-center"
          >
            <h2 className="text-sm uppercase tracking-wider text-gray-500 mb-2">
              {product.category}
            </h2>
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-3">
              {product.title}
            </h1>

            <div className="flex items-center mb-4">
              <Rate disabled defaultValue={product.rating || 4} className="text-yellow-500 text-lg" />
              <span className="ml-3 text-gray-500 text-sm">
                ({product.rating || 4.5} / 5)
              </span>
            </div>

            <p className="text-gray-600 leading-relaxed mb-6 text-justify">
              {product.description}
            </p>

            {/* Price + Add to Cart */}
            <div className="flex items-center justify-between mt-6">
              <span className="text-4xl font-bold text-yellow-600">
                ${product.price}
              </span>

              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => addToCart(product)}
                className={`flex items-center gap-2 px-8 py-3 rounded-full text-white font-semibold shadow-md transition-all duration-300 
                  ${isItemAdded(product.id)
                    ? "bg-green-500 hover:bg-green-600"
                    : "bg-yellow-500 hover:bg-yellow-600"
                  }`}
              >
                <ShoppingCartOutlined />
                {isItemAdded(product.id)
                  ? `Added (${isItemAdded(product.id).quantity})`
                  : "Add to Cart"}
              </motion.button>
            </div>

            {/* Additional Info */}
            <div className="mt-10 border-t pt-6 text-sm text-gray-500 space-y-2">
              <p><span className="font-medium text-gray-800">Brand:</span> {product.brand || "N/A"}</p>
              <p><span className="font-medium text-gray-800">Stock:</span> {product.stock || 10} available</p>
              <p><span className="font-medium text-gray-800">SKU:</span> #{product.id}</p>
              <p><span className="font-medium text-gray-800">Warranty:</span> 1 Year Standard Warranty</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Related Products Section */}
      <div className="bg-white py-16 border-t border-gray-200">
        <div className="container mx-auto px-6 md:px-16">
          <h2 className="text-3xl font-bold mb-10 text-center text-gray-900">
            You May Also Like
          </h2>
          <RelatedProduct cate={product.category} />
        </div>
      </div>
    </section>
  );
}

export default ProductDetail;
