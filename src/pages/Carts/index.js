import React, { useEffect, useState } from "react";
import axios from "../../utils/axios";
import {
  ImageList,
  TextField,
  Typography,
  Button,
  Box,
  Paper,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddBoxIcon from "@mui/icons-material/AddBox";
import IndeterminateCheckBoxIcon from "@mui/icons-material/IndeterminateCheckBox";

import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

function Carts() {
  const userId = useSelector((state) => state.auth.id);
  const [product, setProduct] = useState({ priceStrip: "", name: "" });
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
      const { data } = await axios.get(`/carts/user/${userId}`);

      setPriceState({
        ...priceState,
        total: data.total,
        ppnObat: data.ppnObat,
        tax: data.tax,
        totalAfterTax: data.totalAfterTax,
      });
      setCarts(data.dataSend);
    } catch (error) {
      alert(error);
    }
  };
  console.log(carts);

  useEffect(() => {
    fetchCarts();
  }, [state]);

  const onCheckoutClick = async () => {
    try {
      const d = new Date();
      const date = d.getDate();
      const month = d.getMonth() + 1;
      const year = d.getFullYear();
      const time = d.getTime();

      const newTransaction = {
        invoice: `INV/${userId}/${year}${month}${date}/${time}`,
        user_id: userId,
        amount: priceState.totalAfterTax,
        carts,
      };

      await axios.post("/carts/checkout", newTransaction);
      alert("Checkout successful");
    } catch (error) {
      alert("Checkout failed");
      console.log(error);
    }
  };

  const renderCarts = () => {
    return carts.map((cart, index) => {
      return (
        <Box>
          <Box display="flex" justifyContent="space-around" alignItems="center">
            <Box
              width="20%"
              variant="h6"
              display="flex"
              justifyContent="center"
              alignItems="center"
              flexDirection="column"
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
              width="20%"
              variant="h6"
              display="flex"
              justifyContent="center"
            >
              <Typography>Rp {cart.price.toLocaleString("id")}</Typography>
            </Box>
            <Box
              width="20%"
              variant="h6"
              display="flex"
              justifyContent="center"
            >
              <Box>
                <Button>
                  <IndeterminateCheckBoxIcon
                    color="success"
                    onClick={async () => {
                      try {
                        const res = await axios.put(`/carts/decQty`, {
                          user_id: userId,
                          product_id: cart.product_id,
                          variant: cart.variant,
                          status: "cart",
                        });
                        setState(cart.qty);
                      } catch (error) {}
                    }}
                  ></IndeterminateCheckBoxIcon>
                </Button>
              </Box>
              <Box display="flex" alignItems="center">
                <Typography>{cart.qty}</Typography>
              </Box>
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
                          status: "cart",
                        });
                        setState(cart.qty);
                      } catch (error) {}
                    }}
                  ></AddBoxIcon>
                </Button>
              </Box>
            </Box>
            <Box
              width="20%"
              variant="h6"
              display="flex"
              justifyContent="center"
            >
              <Typography>{cart.variant}</Typography>
            </Box>
            <Box
              width="20%"
              variant="h6"
              display="flex"
              justifyContent="center"
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
    <Box display="flex" justifyContent="space-around">
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
          <Box width="20%" variant="h6" display="flex" justifyContent="center">
            <Typography variant="h6">Product</Typography>
          </Box>
          <Box width="20%" variant="h6" display="flex" justifyContent="center">
            <Typography variant="h6">Price</Typography>
          </Box>
          <Box width="20%" variant="h6" display="flex" justifyContent="center">
            <Typography variant="h6">Quantity</Typography>
          </Box>
          <Box width="20%" variant="h6" display="flex" justifyContent="center">
            <Typography variant="h6">Variant</Typography>
          </Box>{" "}
          <Box width="20%" variant="h6" display="flex" justifyContent="center">
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
            backgroundColor: "white",
            marginTop: 10,
            borderRadius: 3,
            boxShadow: 3,
          }}
        >
          <Box bordisplay="flex" justifyContent="center">
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
            <Box border="solid">
              <Button variant="contained" onClick={onCheckoutClick}>
                Checkout
              </Button>
            </Box>
          </Box>
        </Paper>
      ) : null}
    </Box>
  );
}

export default Carts;
