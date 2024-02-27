import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import Login from "./components/Pages/Login/Login";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Outlet,
} from "react-router-dom";
import Main from "./components/Pages/Main/Main";
import Register from "./components/Pages/Register/Register";
import NotFound from "./components/Pages/NotFound/NotFound";
import { useState } from "react";
import UserContext from "./context/UserContext";
import Manufactuers from "./components/Pages/Manufactuers/Manufactuers";
import AddManufactuer from "./components/Pages/Manufactuers/AddManufactuer/AddManufactuer";
import ManufactuerDetails from "./components/Pages/Manufactuers/ManufactuerDetails/ManufactuerDetails";
import EditManufactuer from "./components/Pages/Manufactuers/EditManufactuer/EditManufactuer";
import Products from "./components/Pages/Products/Products";
import AddProduct from "./components/Pages/Products/AddProduct/AddProduct";
import ProductDetails from "./components/Pages/Products/ProductDetails/ProductDetails";
import EditProduct from "./components/Pages/Products/EditProduct/EditProduct";
import Wishlist from "./components/Pages/Wishlist/Wishlist";
import Cart from "./components/Pages/Cart/Cart";
import Result from "./components/Pages/Result/Result";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Outlet />}>
      <Route index element={<Main />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/manufacturers" element={<Manufactuers />} />
      <Route
        path="/manufacturers/add-new-manufactuer"
        element={<AddManufactuer />}
      />
      <Route path="/manufacturers/:id" element={<ManufactuerDetails />} />
      <Route path="/manufacturers/:id/edit" element={<EditManufactuer />} />
      <Route path="/products" element={<Products />} />
      <Route path="/products/add-new-product" element={<AddProduct />} />
      <Route path="/products/:id" element={<ProductDetails />} />
      <Route path="/products/:id/edit" element={<EditProduct />} />
      <Route path="/wishlist" element={<Wishlist />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/obrana" element={<Result />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

export default function App() {
  const [userCart, setUserCart] = useState({
    userRole: "",
    name: "",
    cart: [],
  });

  return (
    <UserContext.Provider value={{ userCart, setUserCart }}>
      <RouterProvider router={router} />
    </UserContext.Provider>
  );
}
