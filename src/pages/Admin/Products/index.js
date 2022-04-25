import React from "react";
import ProductCard from "./components/ProductCard";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "../../../utils/axios";
import { Box, Paper, Typography, Button } from "@mui/material";
import SearchBar from "../../Products/components/SearchBar";
import Sort from "../../Products/components/Sort";
import PaginationHandler from "../../Products/components/PaginationHandler";

function ProductsAdmin() {
  const [sortProperty, setSortProperty] = useState({ sortBy: "", order: "" });
  const [pagination, setPagination] = useState({
    page: 1,
    lastPage: 0,
    offSet: 0,
    itemsPerPage: 8,
  });
  const [queryPagination, setQueryPagination] = useState({
    page: 1,
    lastPage: 0,
    offSet: 0,
    itemsPerPage: 8,
  });
  const [searchProducts, setSearchProducts] = useState([]);
  const params = useParams();

  //Fetch Products
  const fetchProducts = async () => {
    try {
      const res = await axios.get(`/products`, {
        params: {
          sortBy: sortProperty.sortBy,
          order: sortProperty.order,
          offSet: queryPagination.offSet,
          limit: queryPagination.itemsPerPage,
        },
      });
      const { data } = res;
      setSearchProducts(data.result);
      setPagination({
        ...queryPagination,
        lastPage: Math.ceil(data.total / queryPagination.itemsPerPage),
      });
    } catch (error) {
      console.log(error.message);
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
    setSearchProducts(data);
  };

  //Render Products list
  const renderProducts = () => {
    return searchProducts.map((product) => (
      <ProductCard key={product.id} product={product} />
    ));
  };

  return (
    <Box display="flex" justifyContent="center" ml="240px">
      <Paper
        elevation={3}
        sx={{
          width: "80%",
          paddingTop: "25px",
        }}
      >
        <Box display="flex" justifyContent="center">
          <Button
            href="/admin/products/input"
            variant="contained"
            size="small"
            color="warning"
            // color="warning"
            sx={{ width: "120px", color: "white", backgroundColor: "#ff5252" }}
          >
            Add Product
          </Button>
        </Box>
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
        <Box>
          <PaginationHandler
            pagination={pagination}
            setPagination={setPagination}
            setQueryPagination={setQueryPagination}
          />
        </Box>
      </Paper>
    </Box>
  );
}

export default ProductsAdmin;
