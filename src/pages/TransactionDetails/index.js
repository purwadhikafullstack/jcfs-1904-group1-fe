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

import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

function TransactionDetails() {
  const userId = useSelector((state) => state.auth.id);
  const params = useParams();
  const transactionId = params.transactionId;
  const [product, setProduct] = useState({ priceStrip: "", name: "" });
  const [transaction, setTransaction] = useState([]);
  const [invoice, setInvoice] = useState("");
  const [amount, setAmount] = useState("0");

  const [state, setState] = useState("");

  const fetchTransaction = async () => {
    try {
      const res = await axios.get(`/transactions/details/${transactionId}`);
      setTransaction(res.data[0]);
      setInvoice(res.data[0][0].invoice);
      setAmount(res.data[0].amount);
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    fetchTransaction();
  }, [state]);

  const renderTransaction = () => {
    return transaction.map((transaction, index) => {
      return (
        <Box>
          <Box display="flex" justifyContent="space-around" alignItems="center">
            <Typography>{transaction.productName}</Typography>
            <Typography>
              {transaction.productPrice.toLocaleString("id")}
            </Typography>

            <img
              src={transaction.productPhoto}
              alt="product image"
              style={{ height: "50%", width: "100px" }}
            />
            <Typography>{transaction.qty}</Typography>
            <Typography>{transaction.variant}</Typography>
            <Typography>
              {(transaction.productPrice * transaction.qty).toLocaleString(
                "id"
              )}
            </Typography>
          </Box>
          {index == transaction.length - 1 ? (
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
        <Box display={"flex"} justifyContent="center">
          <Typography variant="h4" pt={"20px"}>
            {invoice} Details
          </Typography>
        </Box>
        <Box
          marginTop="20px"
          justifyContent="space-around"
          borderBottom={1}
          borderColor="darkgray"
          display="flex"
        >
          <Typography variant="h6">Name</Typography>
          <Typography variant="h6">Price</Typography>
          <Typography variant="h6">Photo</Typography>
          <Typography variant="h6">Quantity</Typography>
          <Typography variant="h6">Variant</Typography>
          <Typography variant="h6">Total Price</Typography>
        </Box>
        {renderTransaction()}
        <Box>
          <Typography>Total: {amount} </Typography>
          <Typography>Transfer ke rekening: </Typography>
          <Box display="flex" margin="0px 10px 10px 0px" justifyContent="end">
            <Button variant="contained">Upload Payment</Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}

export default TransactionDetails;
