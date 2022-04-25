import React from "react";
import ProductCard from "./components/ProductCard";
import { useState, useEffect } from "react";
import axios from "../../utils/axios.js";
import { Box, Paper, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import Filter from "./components/Filter";
import SearchBar from "./components/SearchBar";
import Sort from "./components/Sort";
import PaginationHandler from "./components/PaginationHandler";

function ProductsByCategory() {
  const [sortProperty, setSortProperty] = useState({ sortBy: "", order: "" });
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    lastPage: 0,
    offSet: 0,
    itemsPerPage: 10,
  });
  const [queryPagination, setQueryPagination] = useState({
    page: 1,
    lastPage: 0,
    offSet: 0,
    itemsPerPage: 10,
  });
  const params = useParams();
  const selectedCategory = params.category;
  console.log(selectedCategory);
  //Fetch Products by Category
  const fetchProducts = async () => {
    try {
      const res = await axios.get(`/products/category/${params.category}`, {
        params: {
          sortBy: sortProperty.sortBy,
          order: sortProperty.order,
          offSet: queryPagination.offSet,
          limit: queryPagination.itemsPerPage,
        },
      });
      const { data } = res;
      setProducts(data.result);
      setPagination({
        ...queryPagination,
        lastPage: Math.ceil(data.total / queryPagination.itemsPerPage),
      });
    } catch (error) {
      console.log(alert(error.message));
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [sortProperty, queryPagination]);

  const sortProducts = (value) => {
    switch (value) {
      case "Asc":
        setSortProperty({ sortBy: "productName", order: value });
        break;
      case "Desc":
        setSortProperty({ sortBy: "productName", order: value });
        break;
      case "LowToHi":
        setSortProperty({ sortBy: "priceStrip", order: "Asc" });
        break;
      case "HiToLow":
        setSortProperty({ sortBy: "priceStrip", order: "Desc" });
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
    <Box>
      <Box
        sx={{ backgroundColor: "#d5d5d5", width: "100%", height: "72px" }}
      ></Box>
      <Box display="flex" justifyContent="center" mt="-36px" pb="24px">
        {/* ProductManager */}

        <Box
          sx={{
            borderRadius: "5px",
            m: "160px 12px 0 0",
            backgroundColor: "white",
            height: "240px",
            width: "160px",
            padding: "12px",
            boxShadow: "0 1px 12px #aeafaf",
          }}
        >
          <Filter selectedCategory={selectedCategory} />
          <Sort sortProducts={sortProducts} />
        </Box>
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
          <Box>
            <PaginationHandler
              pagination={pagination}
              setPagination={setPagination}
              setQueryPagination={setQueryPagination}
            />
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}

export default ProductsByCategory;
