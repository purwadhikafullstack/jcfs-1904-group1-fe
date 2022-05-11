import React from "react";
import { useState, useEffect } from "react";
import axios from "../../../utils/axios";
import {
  Box,
  Typography,
  Link,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

function Filter() {
  const [categories, setCategories] = useState([]);
  const fetchCategories = async () => {
    try {
      const res = await axios.get(`/categories`);
      const { data } = res;
      setCategories(data);
    } catch (error) {
      console.log(alert(error.message));
    }
  };
  useEffect(() => {
    fetchCategories();
  }, []);
  const listCategory = () => {
    return categories.map((category) => (
      <Link
        key={category.id}
        color="textPrimary"
        underline="none"
        href={`/products/category/${category.name}`}
      >
        <MenuItem value={category.name}>{category.name}</MenuItem>
      </Link>
    ));
  };

  return (
    <Box>
      <Typography variant="h5">Category</Typography>
      <FormControl size="small" sx={{ m: "12px auto", minWidth: 160 }}>
        <InputLabel id="demo-simple-select-label">Select Category</InputLabel>
        <Select>{listCategory()}</Select>
      </FormControl>
    </Box>
  );
}

export default Filter;
