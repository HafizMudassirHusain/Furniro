import { useEffect, useState } from "react";
import ProductCard from "../componet/ProductCard";
import { Link } from "react-router-dom";
import { Button, Pagination, Row , Select, Spin} from "antd";
import producthero from '../assets/producthero1.1.jpg';
import '../componet/ProductsComponent/ProductCom.css'
import Banner from "../componet/ProductsComponent/Banner";
import navlogo from '../assets/navLogo.png';
import { Search } from "lucide-react";

function Product(){
    const [product, setProducts] = useState([]);
    const [search, setsearch] = useState("");
    const [category, setCategory] = useState([]);
    const [skip, setskip] = useState(0);
    const [specificItem, setspecificItem] = useState("");
    const [limit, setlimit] = useState(20);
    const [total, setTotal] = useState(20);
    const [isLoding, setisLoding] = useState(false);
   console.log(isLoding)
    useEffect(()=>{
      fetch('https://dummyjson.com/products/categories')
         .then(res => res.json())
         .then(res => setCategory(res));
    },[])
   
useEffect(()=>{
    fetch(`https://dummyjson.com/products?limit=20&skip=${skip}`)
    .then(res => res.json())
     .then(res =>{ 
  setProducts(res.products);
  setTotal(res.total);
  setisLoding(true);
});
},[skip]);

    const filtered = product.filter((data)=> 
    data.title.toLowerCase().includes(search.toLowerCase()) &&
    (specificItem.toLowerCase() == "" || 
    data.category.toLowerCase().includes(specificItem.toLowerCase()))
    )

    return(
      <>
        <div style={{backgroundImage:
        `url(${producthero})`,
         height: "50vh",
        //  objectFit:"cover",
        //  marginTop:"-100px",
         backgroundSize: "cover",
         backgroundRepeat: "no-repeat",}}
         className="shop-hero h-[40vh] ">
          <div className="white h-full ">
           <div className="h-full text-center flex flex-col justify-center items-center">
           <div className='h-[7vh] w-[7vw] flex justify-center items-center'>
           <img src={navlogo} alt="Furnios" className='w-[100%]' /></div>
            <h1 className="font-semibold text-5xl">Shop</h1>
            <div className="my-4 px-4 text-xl">
            <Link to={'/'} className="font-semibold">{"Home > "}</Link> <Link> Shop</Link>
            </div>
           </div>
          </div>
         </div>
         
        <div className="container p-5 m-auto ">
        <div className="container mx-auto w-[80vw] flex justify-around items-center my-10 h-16">

        <div className=" md:block flex-1 max-w-md mx-4">
            <div className="relative">
              <input
                type="text"
                onChange={(e)=> setsearch(e.target.value)}
                placeholder="Search products..."
                className="w-full bg-gray-100 rounded-md py-2 px-4 pl-10 
                focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5  text-gray-400 bg-none" />
            </div>
          </div>

         
        <Select showSearch placeholder="Select Category" optionFilterProp="label"
            className="options w-1/3 h-10 "
            onChange={(e)=> setspecificItem(e)}
              // onSearch={onSearch}
              filterOption={(input, option) =>
                (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
                    }
              options={category.map((data)=>{
                 return {label: data.name, value : data.slug};
                })} />

        <Button className="p-4">Search</Button>
      
        </div>
  
        <Row gutter={16} >
          {!isLoding ? <Spin size="large" fullscreen={true} percent={"auto"}  />
            :
          filtered.map((data) => (
            <ProductCard key={data.id} item={data} />
          ))
          }
        </Row>
        <div className="m-4 flex justify-center items-center">
        <Pagination className="mt-8"
          onChange={(num)=>{
             setskip((num - 1) * 20)
          }}
      defaultCurrent={1}
      pageSize={20}
      total={total} />
        </div>
        <Banner backColor={"#f5d776"} />
      </div>
      </>
    )
   }
   export default Product;