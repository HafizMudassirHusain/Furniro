import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Row, Spin } from "antd";

import Hero from "../componet/Hero";
import HeroLower from "../componet/HomeComponent/HeroLower";
import Carousels from "../componet/HomeComponent/Carousels";
import ImageGallery from "../componet/HomeComponent/Gallery";
import ProductCard from "../componet/ProductCard";

function Home() {
  const [product, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("https://dummyjson.com/products?limit=12")
      .then((res) => res.json())
      .then((res) => {
        setProducts(res.products);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="container mx-auto p-4 md:p-8">
      {/* Hero Section */}
      <Hero />
      <HeroLower />

      {/* Product Section */}
    <div className="container mx-auto py-12">
  <h1 className="text-center text-4xl font-bold mb-10 text-gray-800">
    Our Products
  </h1>
  {isLoading ? (
    <Spin size="large" fullscreen />
  ) : (
    <Row gutter={[24, 24]}>
      {product.map((data) => (
        <ProductCard key={data.id} item={data} />
      ))}
    </Row>
  )}
  <div className="flex justify-center mt-10">
    <Link to="/products">
      <Button
        style={{
          border: "1px solid rgb(191, 155, 14)",
          color: "rgb(191, 155, 14)",
        }}
        className="px-10 py-6 font-semibold rounded-full hover:bg-yellow-500 hover:text-white transition-all duration-300"
      >
        Show More
      </Button>
    </Link>
  </div>
</div>


      {/* Other Sections */}
      <Carousels />
      <ImageGallery />
    </div>
  );
}

export default Home;
