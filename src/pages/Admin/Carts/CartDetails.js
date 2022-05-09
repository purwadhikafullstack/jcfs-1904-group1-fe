import React, { useEffect, useState } from "react";
import axios from "../../../utils/axios";
import { Typography, Button, Box, Paper } from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import IndeterminateCheckBoxIcon from "@mui/icons-material/IndeterminateCheckBox";

import { useParams } from "react-router-dom";

function CartDetails() {
  const params = useParams();
  const transactionId = params.transactionId;
  const userId = params.userId;
  const [carts, setCarts] = useState([]);
  const [priceState, setPriceState] = useState({
    tax: "",
    ppnObat: "",
    total: "",
    totalAfterTax: "",
  });

  const [state, setState] = useState("");

  const fetchCarts = async () => {
    try {
      const { data } = await axios.get(
        `/carts/admin/${userId}/${transactionId}`
      );

      setPriceState({
        ...priceState,
        total: data.total,
        ppnObat: data.ppnObat,
        tax: data.tax,
        totalAfterTax: data.totalAfterTax,
      });
      setCarts(data.dataSend);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCarts();
  }, [state]);

  const onCheckoutClick = async () => {
    try {
      const newTransaction = {
        user_id: userId,
        status: "waiting payment",
        amount: priceState.totalAfterTax,
        carts,
      };

      await axios.post(
        `/transactions/checkout/${userId}/${transactionId}`,
        newTransaction
      );
      alert("Checkout successfully");
    } catch (error) {
      alert("Checkout failed");
    }
  };

  const renderCarts = () => {
    return carts.map((cart, index) => {
      return (
        <Box>
          <Box
            display="flex"
            justifyContent="space-around"
            marginInline="auto"
            alignItems="center"
          >
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              width="20%"
            >
              <img
                src={cart.productPhoto}
                alt="product image"
                style={{ height: "50%", width: "110px" }}
              />

              <Box display="flex">
                <Typography>{cart.productName}</Typography>
              </Box>
            </Box>
            <Box
              sx={{ width: "20%", display: "flex", justifyContent: "center" }}
            >
              <Typography>Rp {cart.price.toLocaleString("id")}</Typography>
            </Box>

            <Box
              width="20%"
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Box>
                <Button disabled={cart.qty == 1}>
                  <IndeterminateCheckBoxIcon
                    color="success"
                    onClick={async () => {
                      try {
                        const res = await axios.put(`/carts/decQty`, {
                          user_id: userId,
                          product_id: cart.product_id,
                          variant: cart.variant,
                          status: "custom",
                        });
                        setState(cart.qty);
                      } catch (error) {}
                    }}
                  ></IndeterminateCheckBoxIcon>
                </Button>
              </Box>
              <Typography>{cart.qty}</Typography>
              <Box>
                <Button>
                  <AddBoxIcon
                    color="success"
                    onClick={async () => {
                      try {
                        const res = await axios.put(`/carts/incQty`, {
                          user_id: userId,
                          product_id: cart.product_id,
                          variant: cart.variant,
                          status: "custom",
                        });
                        setState(cart.qty);
                      } catch (error) {}
                    }}
                  ></AddBoxIcon>
                </Button>
              </Box>
            </Box>
            <Box
              sx={{ width: "20%", display: "flex", justifyContent: "center" }}
            >
              <Typography textAlign="center">{cart.variant}</Typography>
            </Box>
            <Box
              sx={{ width: "20%", display: "flex", justifyContent: "center" }}
            >
              <Typography>
                Rp {(cart.qty * cart.price).toLocaleString("id")}
              </Typography>
            </Box>
          </Box>
          {index == carts.length - 1 ? (
            <Box
              borderBottom={0}
              borderColor="darkgray"
              paddingBottom="12px"
              mb="20px"
            />
          ) : (
            <Box
              borderBottom={1}
              borderColor="lightgray"
              paddingBottom="12px"
              mb="20px"
            />
          )}
        </Box>
      );
    });
  };

  return (
    <Box ml="240px" display="flex" justifyContent="space-around">
      <Paper
        sx={{
          width: "70%",
          backgroundColor: "white",
          marginTop: 10,
          borderRadius: 3,
          boxShadow: 3,
        }}
      >
        <Box display="flex" justifyContent="center">
          <Typography variant="h4" pt={"20px"}>
            Cart
          </Typography>
        </Box>
        <Box
          marginTop="20px"
          justifyContent="space-around"
          borderBottom={1}
          borderColor="darkgray"
          display="flex"
        >
          <Box sx={{ width: "20%", display: "flex", justifyContent: "center" }}>
            <Typography variant="h6">Product</Typography>
          </Box>
          <Box sx={{ width: "20%", display: "flex", justifyContent: "center" }}>
            <Typography variant="h6">Price</Typography>
          </Box>
          <Box sx={{ width: "20%", display: "flex", justifyContent: "center" }}>
            <Typography variant="h6">Quantity</Typography>
          </Box>
          <Box sx={{ width: "20%", display: "flex", justifyContent: "center" }}>
            <Typography variant="h6">Variant</Typography>
          </Box>
          <Box sx={{ width: "20%", display: "flex", justifyContent: "center" }}>
            <Typography variant="h6">Total Price</Typography>
          </Box>
        </Box>
        {carts.length ? (
          renderCarts()
        ) : (
          <Typography>No products in cart!</Typography>
        )}
      </Paper>
      {carts.length ? (
        <Paper
          sx={{
            width: "15%",
            height: 130,
            backgroundColor: "white",
            marginBottom: 10,
            marginTop: 10,
            borderRadius: 3,
            boxShadow: 3,
          }}
        >
          <Box display="flex" justifyContent="end" marginRight="12px">
            <Box
              display="flex"
              justifyContent="space-between"
              alignContent="center"
            >
              <Box>
                <Typography mr="12px">Sub Total : </Typography>
                <Typography mr="12px">
                  PPn {priceState.ppnObat * 100}%:
                </Typography>
                <Typography mr="12px">Total : </Typography>
              </Box>
              <Box>
                <Typography>
                  Rp {priceState.total.toLocaleString("id")}
                </Typography>

                <Typography>
                  Rp {priceState.tax.toLocaleString("id")}
                </Typography>

                <Typography>
                  Rp {priceState.totalAfterTax.toLocaleString("id")}
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box display="flex" justifyContent="end">
            <Button
              variant="contained"
              href="/admin/orders"
              sx={{ margin: "12px" }}
              onClick={onCheckoutClick}
            >
              Checkout
            </Button>
          </Box>
        </Paper>
      ) : null}
    </Box>
  );
}

export default CartDetails;
