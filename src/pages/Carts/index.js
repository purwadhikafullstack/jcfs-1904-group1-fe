import React, { useState } from "react";
import axios from "../../utils/axios";
import { TextField, Typography, Button, Box, Paper } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

function Carts() {
  return (
    <Box display="flex" justifyContent="center">
      <Paper
        sx={{
          width: "70%",
          height: 400,
          backgroundColor: "white",
          marginTop: 10,
          borderRadius: 6,
          boxShadow: 3,
        }}
      ></Paper>
    </Box>
  );
}

export default Carts;
