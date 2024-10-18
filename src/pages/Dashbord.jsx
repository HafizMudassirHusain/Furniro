import { Outlet } from "react-router";
import Header from "../componet/Header";
import Footer from '../componet/Footer' ;

function Dashbord(){
    return(
      <div>
        <Header />
        <Outlet />

        <Footer />
      </div>
    )
   }
   export default Dashbord;