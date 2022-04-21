import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Navigation from "./components/Navigation";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import ForgotPassword from "./pages/ForgotPassword";
import Products from "./pages/Products";
import { useDispatch, useSelector } from "react-redux";
import ProductsByCategory from "./pages/Products/ProductsByCategory";
import ProductDetails from "./pages/Products/ProductDetails";
import { keepLoginAction } from "./store/actions/index";
import "./index.css";
import Dashboard from "./pages/Admin/Dashboard";
import InputProducts from "./pages/Admin/Products/InputProducts";
import ProductsAdmin from "./pages/Admin/Products";
import ProductDetailsAdmin from "./pages/Admin/Products/ProductDetails";
import SalesReport from "./pages/Admin/Sales_Report";
import ReportDetails from "./pages/Admin/Sales_Report/ReportDetails";

function App() {
  const [isStorageChecked, setIsStorageChecked] = useState(false);
  const dispatch = useDispatch();
  const isAdmin = useSelector((state) => state.auth.isAdmin);

  useEffect(() => {
    const usersLocalStorage = localStorage.getItem("userData");

    if (usersLocalStorage) {
      const userData = JSON.parse(usersLocalStorage);
      const { id, username, isAdmin } = userData;
      dispatch(keepLoginAction({ id, username, isAdmin }));
    }

    setIsStorageChecked(true);
  }, []);

  if (isStorageChecked) {
    if (isAdmin) {
      return (
        <div className="App">
          <Router>
            <Dashboard />
            <Routes>
              <Route path="/admin/products" element={<ProductsAdmin />} />
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

              <Route path="/products" element={<Products />} />
            </Routes>
          </Router>
        </div>
      );
    } else {
      return (
        <div className="App">
          <Router>
            <Navigation />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="profile" element={<Profile />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="forgot-password" element={<ForgotPassword />} />
              <Route path="/products" element={<Products />} />
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
