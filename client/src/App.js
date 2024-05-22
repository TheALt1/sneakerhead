
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./components/Home/Home";
import Category from "./components/Category/Category";
import SingleProduct from "./components/SingleProduct/SingleProduct";
import Newsletter from "./components/Footer/Newsletter/Newsletter";
import AppContext from "./utils/context";
import Cart from "./components/Cart/Cart";
import Success from "./components/checkout/Success";
import Failed from "./components/checkout/Failed";
import Shipping from "./components/checkout/Shipping";
import LoginForm from "./components/UserAuth/LoginForm";
import useOrders from "./components/Orders/useOrders";
import Orders from "./components/Orders";
import SignUp from "./components/UserAuth/Register";
import NotFound from "./components/NotFound/NotFound";
import Logout from "./components/UserAuth/Logout";
import ResetPassword from "./components/UserAuth/ResetPassword";
import About from "./components/misc/About";
import Wishlist from "./components/Wishlist";
import ForgotPassword from "./components/UserAuth/ForgotPassword";
import useWishlist from "./components/Wishlist/useWishlist";
import { ToastContainer } from "react-toastify";
import { Protector, userData, ProtectorProp } from "./utils/helpers";
function App() {
  const { username, jwt } = userData();
  const isLoggedIn = !!jwt;
  const { orders, setIsNewOrdersAdded } = useOrders(jwt);
  const { wishlist} = useWishlist(jwt);
  console.log(wishlist);
    return (
        <BrowserRouter>
        <AppContext>
          <Header />
          <Routes>
             <Route path="/" element={ <Home />}/>
            <Route path="/category/:slug" element={<Category />}/>
            <Route path="/product/:slug" element={<SingleProduct />}/>
            <Route path="/cart/" element={<Cart />}/>
            <Route path="/Success/" element={<Protector Component={Success} />}/>
            <Route path="/Failed/" element={<Protector Component={Failed} />}/>
            <Route path="/Shipping/" element={<Protector Component={Shipping }/>}/>
            <Route path="/Login/" element={<LoginForm />}/>
            <Route path="/SignUp/" element={<SignUp />}/>
            <Route path="/Logout/" element={<Logout />}/>
            <Route path="/About/" element={<About />}/>
            <Route path="/Wishlist/" element={<ProtectorProp Component={<Wishlist wishlist={wishlist}/>}  />}/>
            <Route path="/orders/" element={<ProtectorProp Component={<Orders orders={orders}/>}/> }/>
            <Route path="/resetpassword/" element={<ResetPassword />}/>
            <Route path="/forgotpassword/" element={<ForgotPassword />}/>
            <Route Component={NotFound} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <ToastContainer />
          <Newsletter />
          <Footer />
        </AppContext>
        </BrowserRouter>
    )
}

export default App;
