import { Col, Image } from "antd";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { ShoppingCartOutlined } from "@ant-design/icons";

function ProductCard({item}){
 const {isItemAdded} = useContext(CartContext);
 const isAdded = isItemAdded(item.id) ? true : false
    return(
        <Col sm={24} md={12} lg={8} xl={6}>
          <Link to={`/product/${item.id}`}>
        <div className="my-2 border hover:opacity-75 cursor-pointer flex flex-col items-center justify-center ">
          {
            isAdded && (
              <ShoppingCartOutlined className="absolute top-5 left-5  text-black text-2xl" />
            )
          }
          <Image preview={false} src={item.thumbnail} height={300}  />
          <div className="flex flex-col justify-between p-3 w-full bg-slate-100">
            <h1 className="font-bold text-xl">{item.title}</h1>
            <h1 className="font-semibold text-gray-400">{item.brand}</h1>
            <h1 className="font-bold text-xl">Rp ${item.price}</h1>
          </div>
        </div>
          </Link>
      </Col>
    )
   }
   export default ProductCard;