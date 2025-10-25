import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Pagination, Row, Select, Spin } from "antd";
import { Search } from "lucide-react";
import ProductCard from "../componet/ProductCard";
import producthero from "../assets/producthero1.1.jpg";
import navlogo from "../assets/navLogo.png";
import Banner from "../componet/ProductsComponent/Banner";
import "../componet/ProductsComponent/ProductCom.css";

function Product() {
  const [product, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState([]);
  const [skip, setSkip] = useState(0);
  const [specificItem, setSpecificItem] = useState("");
  const [total, setTotal] = useState(20);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://dummyjson.com/products/categories")
      .then((res) => res.json())
      .then((res) => setCategory(res));
  }, []);

  useEffect(() => {
    setLoading(true);
    fetch(`https://dummyjson.com/products?limit=20&skip=${skip}`)
      .then((res) => res.json())
      .then((res) => {
        setProducts(res.products);
        setTotal(res.total);
        setTimeout(() => setLoading(false), 600); // smooth transition
      });
  }, [skip]);

  const filtered = product.filter(
    (data) =>
      data.title.toLowerCase().includes(search.toLowerCase()) &&
      (specificItem === "" ||
        data.category.toLowerCase().includes(specificItem.toLowerCase()))
  );

  return (
    <>
      {/* Hero Section */}
      <div
        style={{
          backgroundImage: `url(${producthero})`,
          height: "50vh",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
        className="relative flex items-center justify-center text-white text-center"
      >
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10">
          <div className="flex justify-center mb-4">
            <img src={navlogo} alt="Furnios" className="w-[80px]" />
          </div>
          <h1 className="text-5xl font-bold drop-shadow-md">Shop</h1>
          <div className="mt-3 text-lg">
            <Link to="/" className="font-medium text-yellow-400 hover:underline">
              Home
            </Link>{" "}
            <span className="mx-1 text-gray-200">{">"}</span>
            <span className="text-gray-100">Shop</span>
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <div className="w-[90%] lg:w-[80%] mx-auto mt-10 mb-6 sticky top-0 z-40 bg-white/70 backdrop-blur-md rounded-xl p-5 shadow-sm border border-gray-100">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Search Bar */}
          <div className="relative w-full md:w-1/2">
            <input
              type="text"
              placeholder="Search for products..."
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-gray-100 rounded-full py-2.5 pl-10 pr-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 shadow-sm"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>

          {/* Category Filter */}
          <Select
            showSearch
            placeholder="Select category"
            optionFilterProp="label"
            className="w-full md:w-1/4 h-10 rounded-full"
            onChange={(e) => setSpecificItem(e)}
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            options={category.map((data) => ({
              label: data.name || data,
              value: data.slug || data,
            }))}
          />

          {/* Filter Button */}
          <Button
            type="primary"
            className="bg-yellow-500 hover:bg-yellow-600 border-none px-8 py-2 rounded-full text-white font-semibold transition-all shadow-sm"
          >
            Filter
          </Button>
        </div>
      </div>

      {/* Product Grid */}
      <div className="w-[90%] lg:w-[80%] mx-auto min-h-[60vh]">
        {loading ? (
          <div className="flex justify-center items-center h-[50vh]">
            <Spin size="large" />
          </div>
        ) : filtered.length > 0 ? (
          <Row gutter={[24, 24]}>
            {filtered.map((data) => (
              <ProductCard key={data.id} item={data} />
            ))}
          </Row>
        ) : (
          <div className="text-center py-16 text-gray-500 text-lg">
            No products found.
          </div>
        )}

        {/* Pagination */}
        <div className="flex justify-center mt-10">
          <Pagination
            onChange={(num) => setSkip((num - 1) * 20)}
            defaultCurrent={1}
            pageSize={20}
            total={total}
            showSizeChanger={false}
          />
        </div>
      </div>

      {/* Bottom Banner */}
      <Banner backColor={"#f5d776"} />
    </>
  );
}

export default Product;
