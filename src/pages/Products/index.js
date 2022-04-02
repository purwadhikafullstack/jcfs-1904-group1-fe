import React from "react";
import ProductCard from "./components/ProductCard";
import { useState, useEffect } from "react";
import axios from "../../utils/axios.js";
import { Box, Paper } from "@mui/material";
import SearchBar from "./components/SearchBar";
import Filter from "./components/Filter";

function Products() {
  const [products, setProducts] = useState([]);
  const [searchProducts, setSearchProducts] = useState([]);

  //Fetch All Products
  const fetchProducts = async () => {
    try {
      const res = await axios.get(`/products`);
      const { data } = res;
      setProducts(data[0]);
      setSearchProducts(data[0]);
    } catch (error) {
      console.log(alert(error.message));
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  //Get Data From Child Com
  const handleGetChildData = (data) => {
    setSearchProducts(data);
  };

  //Render Products list
  const renderProducts = () => {
    return searchProducts.map((product) => (
      <ProductCard key={product.id} product={product} />
    ));
  };

  return (
    <Box display="flex" justifyContent="center">
      {/* ProductManager */}
      <Filter />
      <Paper
        elevation={3}
        sx={{
          width: "80%",
          paddingTop: "25px",
        }}
      >
        {/* SearchBar */}
        <SearchBar handleGetChildData={handleGetChildData} />

        {/* productCard */}
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "flex-start",
          }}
        >
          {renderProducts()}
        </Box>
      </Paper>
    </Box>
  );
}

export default Products;
