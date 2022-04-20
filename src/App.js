import Products from "./pages/Products";
import ProductsByCategory from "./pages/Products/ProductsByCategory";
import ProductDetails from "./pages/Products/ProductDetails";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import "./index.css";
import Dashboard from "./pages/Admin/Dashboard";
import InputProducts from "./pages/Admin/Products/InputProducts";
import ProductsAdmin from "./pages/Admin/Products";
import ProductDetailsAdmin from "./pages/Admin/Products/ProductDetails";
import SalesReport from "./pages/Admin/Sales_Report";
import ReportDetails from "./pages/Admin/Sales_Report/ReportDetails";

function App() {
  const isAdmin = 1;

  return (
    <div>
      <Router>
        {isAdmin == 0 ? <Navigation /> : <Dashboard />}
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
