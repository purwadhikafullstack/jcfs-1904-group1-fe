import React, { useEffect, useState } from "react";
import axios from "../../utils/axios";
import { Box, Typography, Paper, Button } from "@mui/material";
import { useSelector } from "react-redux";

function Prescription() {
  const userId = useSelector((state) => state.auth.id);
  const [image, setImage] = useState("");
  const [upload, setUpload] = useState("");

  const onImageChange = (e) => {
    let newImage = e.target.files[0];
    setUpload(newImage);
    setImage(URL.createObjectURL(newImage));
  };

  const onUploadClick = async () => {
    try {
      const formData = new FormData();

      const d = new Date();
      const date = d.getDate();
      const month = d.getMonth() + 1;
      const year = d.getFullYear();
      const time = d.getTime();

      formData.append("prescriptionPhoto", upload);
      formData.append(
        "invoice",
        `INV/${userId}/custom/${year}${month}${date}/${time}`
      );
      formData.append("user_id", userId);

      const res = await axios.post(`/transactions/upload/${userId}`, formData);
      alert("Prescription photo uploaded");
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Box display="flex" justifyContent="space-around">
      <Paper
        display="flex"
        border="solid"
        justifyContent="center"
        sx={{
          width: "40%",
          backgroundColor: "white",
          marginTop: 10,
          borderRadius: 3,
          boxShadow: 3,
        }}
      >
        <Box display="flex" justifyContent="center" marginTop="20px">
          <Typography>Please upload prescription photo below.</Typography>
        </Box>
        <Box display="flex" justifyContent="center">
          <Box
            border="solid #d5d5d5"
            borderRadius="3px"
            marginBottom="20px"
            padding="30px"
          >
            {!image ? null : (
              <img src={image} alt="Prescription Photo" width={320} />
            )}

            <Box marginTop="10px" marginBottom="10px">
              <input type="file" onChange={onImageChange} />
            </Box>
            <Button
              href="/products"
              onClick={onUploadClick}
              variant="contained"
              color="success"
            >
              Upload
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}

export default Prescription;
