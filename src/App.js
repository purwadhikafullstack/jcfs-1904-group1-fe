import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import { useEffect, useState } from "react";
import Navigation from "./components/Navigation";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";
import ForgotPassword from "./pages/ForgotPassword";
import Products from "./pages/Products"
import { useDispatch } from "react-redux";
import ProductsByCategory from "./pages/Products/ProductsByCategory";
import ProductDetails from "./pages/Products/ProductDetails";

import { keepLoginAction } from "./store/actions/index";

function App() {
  const [isStorageChecked, setIsStorageChecked] = useState(false);
  const dispatch = useDispatch();

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
          <Route path="/products/:category/:id" element={<ProductDetails />} />
          </Routes>
        </Router>
      </div>
    );
  } else {
    return <h1>Loading...</h1>;
  }
}

export default App;
