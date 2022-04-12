import Products from "./pages/Products";
import ProductsByCategory from "./pages/Products/ProductsByCategory";
import ProductDetails from "./pages/Products/ProductDetails";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import "./index.css";
import Dashboard from "./pages/Admin/Dashboard";
import InputProducts from "./pages/Admin/Dashboard/Products/InputProducts";

function App() {
  return (
    <div>
      <Router>
        <Navigation />
        <Routes>
          <Route path="/admin" element={<Dashboard />} />
          <Route path="/admin/products/input" element={<InputProducts />} />

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
}

export default App;
