import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "../../utils/axios";
import { Box, Typography, Button } from "@mui/material";
import ProductCard from "./components/ProductCard";

function ProductDetails() {
  const [product, setProduct] = useState({ price: "", name: "" });
  const [similarProducts, setSimilarProducts] = useState([]);
  const params = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(
          `/products/${params.category}/${params.id}`
        );
        const { data } = res;
        setProduct(data.result[0][0]);
        setSimilarProducts(data.resultSimilar[0]);
      } catch (error) {
        console.log(alert(error.message));
      }
    };
    fetchProduct();
  }, []);

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
            Rp{product.price.toLocaleString("id")}
          </Typography>
          <Box sx={{ mb: "12px", borderBottom: "1px solid" }}>
            <Button
              variant="contained"
              color="warning"
              sx={{
                color: "white",
                mb: "20px",
              }}
            >
              Add To Cart
            </Button>
          </Box>
          <Box>
            <Typography variant="h5" mb="4px">
              Category
            </Typography>
            <Typography variant="h6">{product.name}</Typography>
            <Typography variant="body2" sx={{ fontSize: "18px" }}>
              {product.description}
            </Typography>
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
