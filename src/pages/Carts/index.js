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
      setCarts(data.result);
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
          <Box display="flex" justifyContent="space-around" alignItems="center">
            <Box>
              <img
                src={cart.productPhoto}
                alt="product image"
                style={{ height: "50%", width: "110px" }}
              />

              <Box display="flex">
                <Typography marginInline="auto">{cart.productName}</Typography>
              </Box>
            </Box>

            <Typography>Rp {cart.priceStrip.toLocaleString("id")}</Typography>
            <Box width="200px" display="flex" alignItems="center">
              <Box>
                <Button>
                  <IndeterminateCheckBoxIcon
                    color="success"
                    onClick={async () => {
                      try {
                        const res = axios.put(`/carts/decQty`, {
                          user_id: userId,
                          product_id: cart.product_id,
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
                        });
                        setState(cart.qty);
                      } catch (error) {}
                    }}
                  ></AddBoxIcon>
                </Button>
              </Box>
            </Box>
            <Typography>
              Rp {(cart.qty * cart.priceStrip).toLocaleString("id")}
            </Typography>
          </Box>
          {index == carts.length - 1 ? (
            <Box
              borderBottom={1}
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
        <Box display={"flex"} justifyContent="center">
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
            Name
          </Typography>
          <Typography
            variant="h6"
            // sx={{ ml: "220px" }}
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
            Total Price
          </Typography>
        </Box>
        {renderCarts()}
      </Paper>
      <Paper
        sx={{
          width: "20%",
          backgroundColor: "white",
          marginTop: 10,
          borderRadius: 3,
          boxShadow: 3,
        }}
      >
        <Box display="flex" justifyContent="end" marginRight="12px">
          <Box display="flex" justifyContent="space-between">
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
