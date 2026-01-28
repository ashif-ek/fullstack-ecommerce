import Footer from "../../../components/footer";
import Hero from "../../../components/hero";
import Navbar from "../../../components/navbar";
import TopSellingProducts from "./TopSellingProducts";
// import Carts from "./carts";
// import Checkout from "./checkout";
// import Orders from "./orders";
// import Products from "./products";
// import Whishlist from "./whishlist";

export default function Home() {
  return (
    <>
    <Navbar/>
    <Hero/>
    {/* <Carts/>
    <Orders/>
    <Products/>
    <Whishlist/> */}
    {/* <Checkout/> */}
  <div className="bg-black text-white">
        <TopSellingProducts />
      </div>

    <Footer/>


      
    </>
  )
}
