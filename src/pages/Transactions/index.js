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

function Transactions() {
  const userId = useSelector((state) => state.auth.id);
  const [product, setProduct] = useState({ priceStrip: "", name: "" });
  const [transactions, setTransactions] = useState([]);

  const fetchTransactions = async () => {
    try {
      const { data } = await axios.get(`/transactions/${userId}`);
      setTransactions(data.result);
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const renderTransactions = () => {
    return transactions.map((transaction, index) => {});
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
        a
      </Paper>
    </Box>
  );
}

export default Transactions;
