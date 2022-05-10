import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "../../utils/axios";
import {
  Box,
  Typography,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from "@mui/material";
import ProductCard from "./components/ProductCard";

function ProductDetails() {
  const { id, username } = useSelector((state) => state.auth);
  const [product, setProduct] = useState({ priceStrip: "" });
  const [similarProducts, setSimilarProducts] = useState([]);
  const [formState, setFormState] = useState({ variant: "strip", price: 0 });
  const params = useParams();

  const handleChange = (e) => {
    if (e.target.value === "strip") {
      setFormState({
        ...formState,
        variant: e.target.value,
        price: product.priceStrip,
        stock: product.qtyStripAvailable,
      });
    } else if (e.target.value === "box") {
      setFormState({
        ...formState,
        variant: e.target.value,
        price: product.priceBox,
        stock: product.qtyBoxAvailable,
      });
    } else if (e.target.value === "pcs") {
      setFormState({
        ...formState,
        variant: e.target.value,
        price: product.pricePcs,
        stock: product.qtyPcsAvailable,
      });
    }
  };
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(
          `/products/${params.category}/${params.id}`,
          { params: { productName: product.productName } }
        );
        const { data } = res;
        setProduct(data.result[0]);
        setSimilarProducts(data.resultSimilar);

        if (data.result[0].isLiquid) {
          setFormState({
            ...formState,
            variant: "bottle",
            price: data.result[0].priceStrip,
          });
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchProduct();
  }, []);
  console.log(product.productName);
  const postCart = async () => {
    try {
      const response = axios.post(`/carts`, {
        user_id: id,
        qty: 1,
        product_id: product.id,
        variant: formState.variant,
      });
    } catch (error) {}
  };

  const onAddToCartClick = () => {
    if (!username) {
      alert("Please login to add to cart");
    } else {
      postCart();
      alert("Added to cart");
    }
  };

  const type = product.isLiquid ? "ml" : "mg";

  const renderProducts = () => {
    return similarProducts.map((product) => (
      <ProductCard key={product.id} product={product} />
    ));
  };

  let price;
  if (formState.variant === "strip" || formState.variant === "bottle") {
    price = product.priceStrip.toLocaleString("id");
  } else if (formState.variant === "box") {
    price = product.priceBox.toLocaleString("id");
  } else if (formState.variant === "pcs") {
    price = product.pricePcs.toLocaleString("id");
  }

  return (
    <Box sx={{ padding: "0 24px" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mt: "42px",
        }}
      >
        <img src={product.productPhoto} alt="ProductPhoto" width={320} />
        <Box padding="0 0 0 64px" sx={{ width: "40%" }}>
          <Typography variant="h4" fontWeight={600} sx={{ mb: "8px" }}>
            {product.productName} {product.dose}
            {type}
          </Typography>
          <Typography variant="h5" sx={{ mb: "8px" }}>
            Rp{price}
          </Typography>
          {product.isLiquid ? null : (
            <Box mb="12px">
              <FormControl>
                <FormLabel id="variant">
                  <Typography variant="h5" color="black">
                    Variant
                  </Typography>
                </FormLabel>
                <RadioGroup
                  row
                  name="variant"
                  value={formState.variant}
                  onChange={handleChange}
                  sx={{ mt: "8px", ml: "-22px" }}
                >
                  <FormControlLabel
                    value="box"
                    disabled={product.qtyBoxAvailable === 0}
                    labelPlacement="top"
                    control={<Radio color="warning" />}
                    label="Box"
                  />
                  <FormControlLabel
                    value="strip"
                    disabled={product.qtyStripAvailable === 0}
                    control={<Radio color="warning" />}
                    labelPlacement="top"
                    label="Strip"
                  />
                  <FormControlLabel
                    value="pcs"
                    disabled={product.qtyPcsAvailable === 0}
                    labelPlacement="top"
                    control={<Radio color="warning" />}
                    label="Pcs"
                  />
                </RadioGroup>
              </FormControl>
            </Box>
          )}
          <Box
            sx={{
              mb: "20px",
              borderBottom: "1px solid",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Button
              variant="contained"
              color="warning"
              sx={{
                color: "white",
                mb: "30px",
              }}
              onClick={onAddToCartClick}
            >
              Add To Cart
            </Button>
            <Box margin="-24px 0 0 12px">
              <Typography>
                (Stock :{" "}
                {!formState.stock ? product.qtyStripAvailable : formState.stock}
                )
              </Typography>
            </Box>
          </Box>
          <Box>
            <Box borderBottom={1} mb="20px">
              <Typography variant="h5" mb="4px">
                Category
              </Typography>
              <Typography variant="h6" sx={{ mb: "20px" }}>
                {product.name}
              </Typography>
            </Box>
            <Box>
              <Typography variant="h5" mb="4px">
                Description
              </Typography>
              <Typography
                variant="body2"
                paragraph={true}
                sx={{ fontSize: "18px" }}
              >
                {product.description}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box mt="42px">
        <Typography textAlign="center" variant="h4">
          Best Seller In Category {product.name}
        </Typography>
      </Box>
      <Box
        sx={{
          width: "90%",
          marginInline: "auto",
          display: "flex",
          justifyContent: "center",
        }}
      >
        {renderProducts()}
      </Box>
    </Box>
  );
}

export default ProductDetails;
