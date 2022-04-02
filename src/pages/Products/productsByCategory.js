import React from "react";
import ProductCard from "./components/ProductCard";
import { useState, useEffect } from "react";
import axios from "../../utils/axios.js";
import { Box, Paper, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import Filter from "./components/Filter";
import SearchBar from "./components/SearchBar";

function ProductsByCategory() {
  const [products, setProducts] = useState([]);
  const params = useParams();

  //Fetch Products by Category
  const fetchProducts = async () => {
    try {
      const res = await axios.get(`/products/category/${params.category}`);
      const { data } = res;
      setProducts(data[0]);
    } catch (error) {
      console.log(alert(error.message));
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  //Get Data From Child Com
  const handleGetChildData = (data) => {
    setProducts(data);
    console.log(data);
  };

  const renderProducts = () => {
    return products.map((product) => (
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
        <Box sx={{ margin: "20px 0 0 45px" }}>
          <Typography variant="h5">{params.category}</Typography>
        </Box>
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

export default ProductsByCategory;
