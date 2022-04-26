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
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

function Carts() {
  const userId = useSelector((state) => state.auth.id);
  const [carts, setCarts] = useState([]);
  const [priceState, setPriceState] = useState({
    // subTotal: 0,
    // tax: 0,
    // totalPrice: 0,
    total: "",
    totalAfterTax: "",
  });
  const [formState, setFormState] = useState({
    recipientName: "",
    address: "",
    payment: 0,
  });
  const [isShowSummary, setIsShowSummary] = useState(false);

  const params = useParams();

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };
  const fetchCarts = async () => {
    try {
      const { data } = await axios.get(`/carts/${userId}`);

      // data.forEach((cart) => (priceState.subTotal += cart.qty * cart.price));

      // const tax = subTotal * 0.05;
      // const totalPrice = subTotal + tax;

      setPriceState({
        ...priceState,
        total: data.total,
        totalAfterTax: data.totalAfterTax,
      });
      setCarts(data.result);
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    fetchCarts();
  }, [carts]);

  const onCheckoutClick = () => {};
  // const onDeleteClick = async (id) => {
  //   try {
  //   } catch (error) {}
  // };

  const [quantity, setQuantity] = useState();

  const quantityBtnHandler = (type) => {
    switch (type) {
      case 0:
        setQuantity(cart.qty + 1);
        break;
      case 1:
        setQuantity(quantity - 1);
        break;
    }
  };

  const renderCarts = () => {
    return carts.map((cart, index) => {
      return (
        <Box>
          <Box display="flex" justifyContent="space-evenly" alignItems="center">
            <Box>
              <img src={cart.productPhoto} alt="" style={{ height: "125px" }} />
              <Box display="flex">
                <Typography marginInline="auto">{cart.productName}</Typography>
              </Box>
            </Box>
            <Typography>{cart.priceStrip}</Typography>
            <Box width="200px" display="flex" justifyContent="space-evenly">
              <Box>
                <Button
                  size="small"
                  sx={{ width: "12px" }}
                  variant="contained"
                  color="success"
                  // onClick={quantityBtnHandler(1)}
                >
                  -
                </Button>
              </Box>
              <Typography variant="h5">{cart.qty}</Typography>
              <Box>
                <Button
                  size="small"
                  sx={{ width: "12px" }}
                  variant="contained"
                  color="success"
                  // onClick={quantityBtnHandler(0)}
                >
                  +
                </Button>
              </Box>
            </Box>
            <Typography>{cart.qty * cart.priceStrip}</Typography>
          </Box>
          {index == carts.length - 1 ? (
            <Box
              borderBottom={0}
              borderColor="lightgray"
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
    <Box>
      <Box display="flex" justifyContent="space-around">
        <Paper
          sx={{
            width: "70%",
            backgroundColor: "white",
            marginTop: 10,
            borderRadius: 6,
            boxShadow: 3,
          }}
        >
          <Box display={"flex"} justifyContent="center">
            <Typography variant="h4" pt={"20px"}>
              Cart
            </Typography>
          </Box>
          <Box
            justifyContent={"space-evenly"}
            borderBottom={1}
            borderColor="lightgray"
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

          <Box>{renderCarts()}</Box>
          <Box display="flex" justifyContent="end">
            <Box display="flex" justifyContent="space-between">
              <Box>
                <Typography mr="12px">Sub Total : </Typography>
                <Typography mr="12px">PPn 10% : </Typography>
                <Typography mr="12px">Total : </Typography>
              </Box>
              <Box>
                <Typography>
                  Rp {priceState.total.toLocaleString("id")}
                </Typography>

                <Typography>xxxxxxxx</Typography>

                <Typography>
                  Rp {priceState.totalAfterTax.toLocaleString("id")}
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box display="flex" justifyContent="end">
            <Button variant="contained">Checkout</Button>
          </Box>
        </Paper>
        <Paper
          sx={{
            width: "20%",
            backgroundColor: "white",
            marginTop: 10,
            borderRadius: 6,
            boxShadow: 3,
          }}
        >
          <Box>ascasdas</Box>
        </Paper>
      </Box>
    </Box>
  );
}

export default Carts;
