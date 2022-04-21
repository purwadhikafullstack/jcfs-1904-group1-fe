import React from "react";
import { useState, useEffect } from "react";
import axios from "../../../utils/axios";
// import { Link } from "react-router-dom";
import { Button, Box, Typography, Link } from "@mui/material";

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
      <Box paddingLeft="12px" mt="8px" key={category.id}>
        <Typography>
          <Link
            color="textPrimary"
            underline="none"
            href={`/products/category/${category.name}`}
          >
            {category.name}
          </Link>
        </Typography>
      </Box>
    ));
  };

  return (
    <Box
      sx={{
        mt: "100px",
        mr: "32px",
      }}
    >
      <h2>Category</h2>
      {listCategory()}
    </Box>
  );
}

export default Filter;
