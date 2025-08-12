import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from "./global/header/Header";
import Login from './global/login/Login';
import Dashboard from './dashboard/Dashboard';
import AddBrand from './dashboard/brand/add-brand/AddBrand';
import ViewBrand from './dashboard/brand/brand-list/ViewBrand';
import PrivateRouter from './privateRouter/PrivateRouter';
import CategoryList from './dashboard/category/category-list/CategoryList';
import AddCategory from './dashboard/category/add-category/AddCategory';
import AddProduct from './dashboard/product/add-product/AddProduct';
import ProductList from './dashboard/product/product-list/ProductList';
import AddSubCategory from './dashboard/subCategory/add-subCategory/AddSubCategory';
import SubCategoryList from './dashboard/subCategory/list-subCategory/SubCategoryLit';
import Home from './home/Home';
import SingleProduct from "./home/single-product/SingleProduct";
import Footer from "./home/footer/Footer";
import CatProduct from "./global/cat_product/CatProduct";
import SubCat from "./global/cat_product/SubCat";
import Shop from "./shop/Shop";
import About from "./about/About";
import Contact from "./contact/Contact";
import Cart from "./global/cart/Cart";
import Wishlist from "./global/wishlist/Wishlist";
import ForgetPwd from "./global/forgetPassword/ForgetPwd";
import UpdatePwd from "./global/forgetPassword/UpdatePwd";
import CheckOut from "./global/checkout/CheckOut";
import Receipt from "./global/receipt/Receipt";
function App() {
  const location = useLocation();
  return (
    <>

      {!location.pathname.startsWith('/dashboard') && <Header />}
      <Routes>
        <Route path='/home' element={<Home/>}/>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<PrivateRouter />}>
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/dashboard/add-brand' element={<AddBrand />} />
          <Route path='/dashboard/brand-list' element={<ViewBrand />} />
          <Route path='/dashboard/add-category' element={<AddCategory />} />
          <Route path='/dashboard/category-list' element={<CategoryList />} />
          <Route path='/dashboard/add-product' element={<AddProduct/>}/>
          <Route path='/dashboard/product-list' element={<ProductList/>}/>
          <Route path='/dashboard/category/add-sub-category' element={<AddSubCategory/>}/>
          <Route path='/dashboard/category/sub-category-list' element={<SubCategoryList/>}/>
        </Route>
        <Route path='/product/:id' element={<SingleProduct/>}/>
        <Route path="/products/category/:id" element={<CatProduct />} />
        <Route path="/products/sub-category/:id" element={<SubCat />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/forget-password" element={<ForgetPwd />} />
        <Route path="/update-password" element={<UpdatePwd />} />
        <Route path="/checkout" element={<CheckOut />} />
        <Route path="/receipt" element={<Receipt/>}/>
      </Routes>
      <ToastContainer position='bottom-right' autoClose={3000}/>
      {!location.pathname.startsWith('/dashboard') && <Footer />}
    </>
  );
}

export default App;
