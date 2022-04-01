import React from "react";
import { useState, useEffect } from "react";
import axios from "../../../utils/axios";
// import { Link } from "react-router-dom";
import { Button, Box, Typography, Link } from "@mui/material";

function Filter() {
  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    try {
      const res = await axios.get(`/products/categories`);
      const { data } = res;
      setCategories(data[0]);
    } catch (error) {
      console.log(alert(error.message));
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);
  const listCategory = () => {
    return categories.map((category) => (
      <Box paddingLeft="12px" mb="8px" key={category.id}>
        <Typography>
          <Link href={`/products/category/${category.name}`}>
            {category.name}
          </Link>
        </Typography>
      </Box>
    ));
  };

  return (
    <Box
      sx={{
        width: "200px",
        marginTop: "100px",
        background: "#F8F8F8",
      }}
    >
      <h2>Category</h2>
      {listCategory()}
    </Box>
  );
}

export default Filter;
