import Products from "./pages/Products";
import ProductsByCategory from "./pages/Products/productsByCategory";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import "./index.css";

function App() {
  return (
    <div>
      <Router>
        <Navigation />
        <Routes>
          <Route path="/products" element={<Products />} />
          <Route
            path="/products/category/:category"
            element={<ProductsByCategory />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
