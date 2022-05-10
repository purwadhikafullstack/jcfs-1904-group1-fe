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

import { useSelector } from "react-redux";
import { useParams, Navigate, Link } from "react-router-dom";

function TransactionDetails() {
  const userId = useSelector((state) => state.auth.id);
  const params = useParams();
  const transactionId = params.transactionId;
  const [product, setProduct] = useState({ priceStrip: "", name: "" });
  const [transaction, setTransaction] = useState([]);
  const [invoice, setInvoice] = useState("");
  const [amount, setAmount] = useState("0");
  const [image, setImage] = useState(
    "data:image/png;base64,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"
  );
  const [state, setState] = useState("");
  const [status, setStatus] = useState("");
  const [upload, setUpload] = useState("");

  const fetchTransaction = async () => {
    try {
      const res = await axios.get(`/transactions/details/${transactionId}`);
      console.log(res.data);
      setTransaction(res.data[0]);
      setInvoice(res.data[0][0].invoice);
      setAmount(res.data[0][0].amount);
      if (res.data[0][0].paymentPhoto) {
        setImage(res.data[0][0].paymentPhoto);
      }
      setStatus(res.data[0][0].status);
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    fetchTransaction();
  }, [state, image]);

  const onImageChange = (e) => {
    let newImage = e.target.files[0];
    setUpload(newImage);
    setImage(URL.createObjectURL(newImage));
  };

  const onUploadClick = async () => {
    try {
      const formData = new FormData();
      formData.append("paymentPhoto", upload);

      const res = await axios.put(
        `/transactions/details/${params.transactionId}`,
        formData
      );
      alert("Payment photo upload success");
      window.location.reload();
      console.log({ res });
    } catch (error) {
      console.log({ error });
    }
  };

  const renderTransaction = () => {
    return transaction.map((transaction, index) => {
      return (
        <Box>
          <Box display="flex" justifyContent="space-around" alignItems="center">
            <Box
              width="16%"
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Typography>{transaction.productName}</Typography>
            </Box>
            <Box
              width="16%"
              variant="h6"
              display="flex"
              justifyContent="center"
            >
              <Typography>
                Rp{transaction.productPrice.toLocaleString("id")}
              </Typography>
            </Box>
            <Box
              width="16%"
              variant="h6"
              display="flex"
              justifyContent="center"
            >
              <img
                src={transaction.productPhoto}
                alt="product image"
                style={{ height: "50%", width: "100px" }}
              />
            </Box>
            <Box
              width="16%"
              variant="h6"
              display="flex"
              justifyContent="center"
            >
              <Typography>{transaction.qty}</Typography>
            </Box>
            <Box
              width="16%"
              variant="h6"
              display="flex"
              justifyContent="center"
            >
              <Typography>{transaction.variant}</Typography>
            </Box>
            <Box
              width="16%"
              variant="h6"
              display="flex"
              justifyContent="center"
            >
              <Typography>
                Rp
                {(transaction.productPrice * transaction.qty).toLocaleString(
                  "id"
                )}
              </Typography>
            </Box>
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

  let button;

  if (status == "waiting payment") {
    button = (
      <div>
        <Box marginTop="10px" marginBottom="10px">
          <input type="file" onChange={onImageChange} />
        </Box>
        <Button onClick={onUploadClick} variant="contained" color="success">
          Upload
        </Button>
      </div>
    );
  } else if (status == "sending") {
  }

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
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          paddingTop="1px"
        >
          <Typography variant="h4" paddingX="20px">
            {invoice} Details
          </Typography>
          {status == "reject" ? (
            <Typography
              variant="h5"
              marginX="3px"
              maxHeight="100%"
              borderRadius="3px"
              paddingX="20px"
              sx={{
                backgroundColor: "red",
                color: "white",
              }}
            >
              {status}
            </Typography>
          ) : (
            <Typography
              variant="h5"
              marginX="3px"
              maxHeight="100%"
              borderRadius="3px"
              paddingX="20px"
              sx={{
                backgroundColor: "green",
                color: "white",
              }}
            >
              {status}
            </Typography>
          )}
        </Box>
        <Box
          marginTop="20px"
          justifyContent="space-around"
          borderBottom={1}
          borderColor="darkgray"
          display="flex"
        >
          <Box width="16%" variant="h6" display="flex" justifyContent="center">
            <Typography variant="h6">Name</Typography>
          </Box>
          <Box width="16%" variant="h6" display="flex" justifyContent="center">
            <Typography variant="h6">Price</Typography>
          </Box>
          <Box width="16%" variant="h6" display="flex" justifyContent="center">
            <Typography variant="h6">Photo</Typography>
          </Box>
          <Box width="16%" variant="h6" display="flex" justifyContent="center">
            <Typography variant="h6">Quantity</Typography>
          </Box>
          <Box width="16%" variant="h6" display="flex" justifyContent="center">
            <Typography variant="h6">Variant</Typography>
          </Box>
          <Box width="16%" variant="h6" display="flex" justifyContent="center">
            <Typography variant="h6">Total Price</Typography>
          </Box>
        </Box>
        {renderTransaction()}
        <Box display="flex" justifyContent="space-around">
          <Box
            margin="auto"
            textAlign="center"
            border="solid"
            borderRadius="3px"
            borderColor="darkgray"
            width="65%"
            paddingY="3px"
          >
            <Typography variant="h5">
              Total: Rp{amount.toLocaleString("id")}
            </Typography>
            <Typography>
              Transfer via Bank Mandiri ke rekening:
              <Typography variant="h4" color="red">
                803 8098 1239 1293
              </Typography>
              atas nama:
              <Typography variant="h4" fontWeight="bold">
                Rezeky Chan
              </Typography>
            </Typography>
          </Box>
          <Box display="flex" margin="0px 10px 10px 0px" justifyContent="end">
            <Box
              marginRight="20px"
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
            >
              <Box border="solid #d5d5d5" borderRadius="3px">
                <img src={image} alt="Payment Photo" width={320} />
              </Box>

              {button}
            </Box>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}

export default TransactionDetails;
