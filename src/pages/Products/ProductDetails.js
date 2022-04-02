import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "../../utils/axios";
import { Box, Typography, Button } from "@mui/material";
import { borderBottom } from "@mui/system";

function ProductDetails() {
  const [product, setProduct] = useState({ price: "" });
  const params = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`/products/${params.id}`);
        const { data } = res;
        setProduct(data[0][0]);
      } catch (error) {
        console.log(alert(error.message));
      }
    };
    fetchProduct();
  }, []);

  const type = product.isLiquid ? "ml" : "mg";

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "start",
        mt: "20px",
      }}
    >
      <img src={product.productPhoto} alt="Gambar Obat" width={320} />
      <Box padding="24px 0 0 64px" sx={{ width: "40%" }}>
        <Typography variant="h4" fontWeight={600}>
          {product.productName} {product.dose}
          {type}
        </Typography>
        <Typography variant="h5" sx={{ mb: "24px" }}>
          Rp{product.price.toLocaleString()}
        </Typography>
        <Box sx={{ mb: "12px", borderBottom: "1px solid" }}>
          <Button
            variant="contained"
            color="primary"
            sx={{
              color: "white",
              mb: "20px",
            }}
          >
            Add To Cart
          </Button>
        </Box>
        <Box>
          <Typography variant="h5" mb="8px">
            Category
          </Typography>
          <Typography variant="body2" sx={{ fontSize: "18px" }}>
            {product.description}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default ProductDetails;
