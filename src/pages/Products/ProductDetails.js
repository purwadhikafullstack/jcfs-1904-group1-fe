import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "../../utils/axios";
import { Box, Typography, Button } from "@mui/material";
import ProductCard from "./components/ProductCard";

function ProductDetails() {
  const userId = useSelector((state) => state.auth.id);
  const [product, setProduct] = useState({ priceStrip: "", name: "" });
  const [similarProducts, setSimilarProducts] = useState([]);
  const params = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(
          `/products/${params.category}/${params.id}`
        );
        const { data } = res;
        setProduct(data.result[0]);
        setSimilarProducts(data.resultSimilar);
      } catch (error) {
        console.log(alert(error.message));
      }
    };
    fetchProduct();
  }, []);

  const postCart = async () => {
    try {
      const response = axios.post(`/carts`, {
        user_id: userId,
        qty: 1,
        product_id: product.id,
      });
    } catch (error) {}
  };

  const onAddToCartClick = () => {
    postCart();
    alert("Added to cart");
  };

  const type = product.isLiquid ? "ml" : "mg";

  const renderProducts = () => {
    return similarProducts.map((product) => (
      <ProductCard key={product.id} product={product} />
    ));
  };

  return (
    <Box sx={{ padding: "0 24px 0 24px" }}>
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
            Rp{product.priceStrip.toLocaleString("id")}
          </Typography>
          <Box sx={{ mb: "12px", borderBottom: "1px solid" }}>
            <Button
              variant="contained"
              color="warning"
              sx={{
                color: "white",
                mb: "20px",
              }}
              onClick={onAddToCartClick}
            >
              Add To Cart
            </Button>
          </Box>
          <Box>
            <Box paddingBottom="12px" borderBottom={1} mb="20px">
              <Typography variant="h5" mb="4px">
                Category
              </Typography>
              <Typography variant="h6">{product.name}</Typography>
            </Box>
            <Box>
              <Typography variant="h5" mb="4px">
                Description
              </Typography>
              <Typography variant="body2" sx={{ fontSize: "18px" }}>
                {product.description}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box ml="180px" mt="42px">
        <Typography variant="h4">Similar Products</Typography>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        {renderProducts()}
      </Box>
    </Box>
  );
}

export default ProductDetails;
