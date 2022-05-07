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
      const { data } = await axios.get(`/carts/${userId}`);

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

  useEffect(() => {
    fetchCarts();
  }, [state]);

  const onCheckoutClick = async () => {
    // alert("clicked");
    try {
      const d = new Date();
      const date = d.getDate();
      const month = d.getMonth();
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
  // const onDeleteClick = async (id) => {
  //   try {
  //   } catch (error) {}
  // };

  const renderCarts = () => {
    return carts.map((cart, index) => {
      return (
        <Box>
          <Box
            sx={{ width: "90%" }}
            display="flex"
            marginInline="auto"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box flex="1">
              <img
                src={cart.productPhoto}
                alt="product image"
                style={{ height: "50%", width: "110px" }}
              />

              <Box display="flex">
                <Typography>{cart.productName}</Typography>
              </Box>
            </Box>

            <Typography flex="1">
              Rp {cart.price.toLocaleString("id")}
            </Typography>
            <Box flex="1" width="120px" display="flex" alignItems="center">
              <Box>
                <Button>
                  <IndeterminateCheckBoxIcon
                    color="success"
                    onClick={async () => {
                      try {
                        const res = axios.put(`/carts/decQty`, {
                          user_id: userId,
                          product_id: cart.product_id,
                          variant: cart.variant,
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
                        const res = axios.put(`/carts/incQty`, {
                          user_id: userId,
                          product_id: cart.product_id,
                          variant: cart.variant,
                        });
                        setState(cart.qty);
                      } catch (error) {}
                    }}
                  ></AddBoxIcon>
                </Button>
              </Box>
            </Box>

            <Typography flex="1" textAlign="center">
              {cart.variant}
            </Typography>

            <Typography textAlign="end" flex="1">
              Rp {(cart.qty * cart.price).toLocaleString("id")}
            </Typography>
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
          <Typography
            variant="h6"
            // sx={{ ml: "220px" }}
          >
            Product
          </Typography>
          <Typography
            variant="h6"
            // sx={{ ml: "20px" }}
          >
            Price
          </Typography>
          <Typography
            variant="h6"
            // sx={{ ml: "220px" }}
          >
            Quantity
          </Typography>
          <Typography
            variant="h6"
            // sx={{ ml: "220px" }}
          >
            Variant
          </Typography>
          <Typography
            variant="h6"
            // sx={{ ml: "220px" }}
          >
            Total Price
          </Typography>
        </Box>
        {renderCarts()}
      </Paper>
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

              <Typography>Rp {priceState.tax.toLocaleString("id")}</Typography>

              <Typography>
                Rp {priceState.totalAfterTax.toLocaleString("id")}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box display="flex" justifyContent="end">
          <Button
            variant="contained"
            sx={{ margin: "12px" }}
            onClick={onCheckoutClick}
          >
            Checkout
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}

export default Carts;
