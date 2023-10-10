// Router Dom Imports
import { BrowserRouter, Route, Routes } from 'react-router-dom';

// Component Imports
import Navbar from '../components/Navbar/Navbar';
import SignUp from '../pages/auth/signup/SignUp';
import SignIn from '../pages/auth/signin/SignIn';
import DashBoard from '../pages/dashboard/Dashboard';
// import ForgotPassword from '../pages/auth/forgotPassword/ForgotPassword';
import { useEffect } from 'react';
import Cookies from 'js-cookie';
import ExploreShop from '../pages/exploreShop/ExploreShop';
import ProductDetails from '../pages/productDetails/ProductDetails';
import Cart from '../pages/cart/Cart';

const Router = () => {
  const authState = Cookies.get('authState');
  useEffect(() => {
  },[authState]);

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<DashBoard />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/explore-shop/:categorizeBy/:categoryName" element={<ExploreShop />} />
        <Route path="/product/:productId" element={<ProductDetails />} />
        <Route path="/view-cart" element={<Cart />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
