import React from "react";
import ProductCard from "./components/ProductCard";
import { useState, useEffect } from "react";
import axios from "../../utils/axios.js";
import { Box, Paper, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import Filter from "./components/Filter";
import SearchBar from "./components/SearchBar";
import Sort from "./components/Sort";

function ProductsByCategory() {
  const [sortProperty, setSortProperty] = useState({ sortBy: "", order: "" });
  const [products, setProducts] = useState([]);
  const params = useParams();

  //Fetch Products by Category
  const fetchProducts = async () => {
    try {
      const res = await axios.get(`/products/category/${params.category}`, {
        params: { sortBy: sortProperty.sortBy, order: sortProperty.order },
      });
      const { data } = res;
      setProducts(data[0]);
    } catch (error) {
      console.log(alert(error.message));
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [sortProperty]);

  const sortProducts = (value) => {
    switch (value) {
      case "Asc":
        setSortProperty({ sortBy: "productName", order: value });
        break;
      case "Desc":
        setSortProperty({ sortBy: "productName", order: value });
        break;
      case "LowToHi":
        setSortProperty({ sortBy: "price", order: "Asc" });
        break;
      case "HiToLow":
        setSortProperty({ sortBy: "price", order: "Desc" });
        break;
    }
  };

  //Get Data From Child Com
  const handleGetChildData = (data) => {
    setProducts(data);
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
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            margin: "20px 45px 0 45px",
          }}
        >
          <Typography variant="h5">{params.category}</Typography>
          <Sort sortProducts={sortProducts} />
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
