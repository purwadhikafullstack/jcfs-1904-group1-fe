import React, { useEffect, useState } from "react";
import axios from "../../utils/axios";
import { Box, Typography, Paper, Button } from "@mui/material";
import { useSelector } from "react-redux";

function EditProfilePhoto() {
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

      formData.append("userPhoto", upload);

      const res = await axios.put(`/uploads/details/${userId}`, formData);
      alert("Profile photo uploaded");
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Box display="flex" justifyContent="space-around" minHeight="60vh">
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        sx={{
          width: "40%",
          backgroundColor: "white",
          marginTop: 10,
          borderRadius: 3,
          boxShadow: 3,
        }}
      >
        <Box display="flex" justifyContent="center" marginTop="20px">
          <Typography>Please upload profile photo below.</Typography>
        </Box>
        <Box display="flex" justifyContent="center">
          <Box
            border="solid #d5d5d5"
            borderRadius="3px"
            marginBottom="20px"
            padding="30px"
          >
            {!image ? null : (
              <img src={image} alt="Profile Photo" width={320} />
            )}

            <Box marginTop="10px" marginBottom="10px">
              <input type="file" onChange={onImageChange} />
            </Box>
            <Button
              href="/profile"
              onClick={onUploadClick}
              variant="contained"
              color="success"
            >
              Upload
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default EditProfilePhoto;
