import React from "react";
import ProductCard from "./components/ProductCard";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "../../utils/axios.js";
import { Box, Paper, Typography } from "@mui/material";
import SearchBar from "./components/SearchBar";
import Filter from "./components/Filter";
import Sort from "./components/Sort";

function Products() {
  const [sortProperty, setSortProperty] = useState({ sortBy: "", order: "" });
  const [searchProducts, setSearchProducts] = useState([]);
  const params = useParams();

  //Fetch All Products
  const fetchProducts = async () => {
    try {
      const res = await axios.get(`/products`, {
        params: { sortBy: sortProperty.sortBy, order: sortProperty.order },
      });
      const { data } = res;
      // setProducts(data[0]);
      setSearchProducts(data[0]);
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
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            margin: "20px 45px 0 45px",
          }}
        >
          <Typography variant="h5">All Medicines</Typography>
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

export default Products;
