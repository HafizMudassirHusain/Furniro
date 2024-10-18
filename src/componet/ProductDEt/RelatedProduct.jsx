import { Button, Row, Spin } from "antd";
import { useEffect, useState } from "react";
import ProductCard from "../ProductCard";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";


export default function RelatedProduct({cate}){
    const [product, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
  
    // console.log("related products =>", cate)

    useEffect(() => {
        setIsLoading(true); // Set loading to true when category changes
        fetch(`https://dummyjson.com/products/category/${cate}?limit=4`)
          .then((res) => res.json())
          .then((res) => {
            setProducts(res.products);
            setIsLoading(false); // Turn off loading after products are fetched
          })
          .catch((error) => {
            console.error("Error fetching related products:", error);
            setIsLoading(false);
          });
      }, [cate]); // Add cate as a dependency
      
    return(
      <>
      <Link to={`/product/${product.id}`}>
        <div className="container p-2 m-auto ">
            <h1 className="text-4xl text-center font-bold mt-14 mb-8">Related Products</h1>
               <div className="m-4">
       {
        isLoading ? <Spin size="large" fullscreen={true} percent={"auto"}  />
        : <Row gutter={16} >
          {product.map((data) => (
            <ProductCard key={data.id} item={data} />
          ))}
        </Row>
       }
             

        </div>
        <Link to={'/products'} className="w-[20vw] my-10 block mx-[40%] text-md py-3 
               rounded-none font-semibold text-center" 
               style={{border:"2px solid #c7ad5a",outline:"none",color:"#c7ad5a"}}
                >show more</Link >
        </div>
      </Link>
      </>
    )
}


