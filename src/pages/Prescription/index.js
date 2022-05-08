import React, { useEffect, useState } from "react";
import axios from "../../utils/axios";
import {
  Box,
  Typography,
  Select,
  FormControl,
  MenuItem,
  InputLabel,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Button,
  Link,
} from "@mui/material";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

function Prescription() {
  const { userId } = useSelector((state) => state.auth);
  return (
    <Box height="100px">
      <Typography>Hey</Typography>presasasd
    </Box>
  );
}

export default Prescription;
