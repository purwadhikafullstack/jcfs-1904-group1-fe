import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Navigation from "./components/Navigation";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Products from "./pages/Products";
import { useDispatch, useSelector } from "react-redux";
import ProductsByCategory from "./pages/Products/ProductsByCategory";
import ProductDetails from "./pages/Products/ProductDetails";
import Carts from "./pages/Carts";
import Transactions from "./pages/Transactions";
import TransactionDetails from "./pages/TransactionDetails";
import TrnDetailsCustom from "./pages/TrnDetailsCustom";
import TrnsHistory from "./pages/Admin/TrnsHistory";
import EditProfilePhoto from "./pages/EditProfilePhoto";

import { keepLoginAction } from "./store/actions/index";
import "./index.css";
import Dashboard from "./pages/Admin/Dashboard";
import InputProducts from "./pages/Admin/Products/InputProducts";
import ProductsAdmin from "./pages/Admin/Products";
import ProductDetailsAdmin from "./pages/Admin/Products/ProductDetails";
import SalesReport from "./pages/Admin/Sales_Report";
import ReportDetails from "./pages/Admin/Sales_Report/ReportDetails";
import ProductsSalesReport from "./pages/Admin/Sales_Report/ProductsSalesReport";
import Stocks from "./pages/Admin/Stocks";
import Orders from "./pages/Admin/Orders";
import DetailTransaction from "./pages/Admin/DetailTransaction";
import Prescription from "./pages/Prescription";
import CustomOrderDetail from "./pages/Admin/DetailTransaction/CustomOrderDetail";
import CartsAdmin from "./pages/Admin/Carts";
import CartDetails from "./pages/Admin/Carts/CartDetails";

function App() {
  const [isStorageChecked, setIsStorageChecked] = useState(false);
  const dispatch = useDispatch();
  const isAdmin = useSelector((state) => state.auth.isAdmin);

  useEffect(() => {
    const usersLocalStorage = localStorage.getItem("userData");

    if (usersLocalStorage) {
      const userData = JSON.parse(usersLocalStorage);
      const { user, token } = userData;
      dispatch(keepLoginAction({ user, token }));
    }

    setIsStorageChecked(true);
  }, []);

  if (isStorageChecked) {
    // ADMIN PAGE
    if (isAdmin) {
      return (
        <div className="App">
          <Router>
            <Dashboard />
            <Routes>
              <Route path="login" element={<Login />} />

              <Route path="/admin/products" element={<ProductsAdmin />} />
              <Route path="/admin/stocks" element={<Stocks />} />
              <Route path="/admin/products/input" element={<InputProducts />} />
              <Route
                path="/admin/products/:category/:id"
                element={<ProductDetailsAdmin />}
              />
              <Route path="/admin/sales-report" element={<SalesReport />} />
              <Route
                path="/admin/sales-report/details"
                element={<ReportDetails />}
              />
              <Route
                path="/admin/sales-report/products"
                element={<ProductsSalesReport />}
              />
              <Route path="/admin/orders" element={<Orders />} />
              <Route
                path="/admin/transactions-history"
                element={<TrnsHistory />}
              />
              <Route
                path="/admin/detail-transaction/:transactionId"
                element={<DetailTransaction />}
              />
              <Route
                path="/admin/detail-transaction/custom/:transactionId"
                element={<CustomOrderDetail />}
              />
              <Route path="/admin/carts" element={<CartsAdmin />} />
              <Route
                path="/admin/carts/details/:userId/:transactionId"
                element={<CartDetails />}
              />

              {/* <Route path="/products" element={<Products />} /> */}
            </Routes>
          </Router>
        </div>
      );
    } else {
      // USER PAGE
      return (
        <div className="App">
          <Router>
            <Navigation />
            <Routes>
              <Route path="" element={<Products />} />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="profile" element={<Profile />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="forgot-password" element={<ForgotPassword />} />
              <Route path="reset-password/:token" element={<ResetPassword />} />
              <Route path="/products" element={<Products />} />
              <Route path="/carts/:userId" element={<Carts />} />
              <Route path="/transactions/:userId" element={<Transactions />} />
              <Route path="/prescription/:userId" element={<Prescription />} />
              <Route
                path="/profile/edit-photo/:userId"
                element={<EditProfilePhoto />}
              />
              <Route
                path="/transactions/details/custom/:transactionId"
                element={<TrnDetailsCustom />}
              />
              <Route
                path="/transactions/details/:transactionId"
                element={<TransactionDetails />}
              />

              <Route
                path="/products/category/:category"
                element={<ProductsByCategory />}
              />
              <Route
                path="/products/:category/:id"
                element={<ProductDetails />}
              />
            </Routes>
          </Router>
        </div>
      );
    }
  } else {
    return <h1>Loading...</h1>;
  }
}

export default App;
