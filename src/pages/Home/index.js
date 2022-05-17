import React from "react";
import ProductCard from "../Products/components/ProductCard";
import { useState, useEffect } from "react";
import axios from "../../utils/axios.js";
import { Box, Typography, Link } from "@mui/material";
import CoronavirusOutlinedIcon from "@mui/icons-material/CoronavirusOutlined";
import MonitorHeartOutlinedIcon from "@mui/icons-material/MonitorHeartOutlined";
import ColorizeIcon from "@mui/icons-material/Colorize";
import HeartBrokenOutlinedIcon from "@mui/icons-material/HeartBrokenOutlined";
import SickOutlinedIcon from "@mui/icons-material/SickOutlined";
import "./style.css";

function Home() {
  const [bestSeller, setBestSeller] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`/products/wanted`);
        const { data } = res;
        setBestSeller(data.bestSeller);
        const resCat = await axios.get(`/categories`);
        setCategories(resCat.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchProduct();
  }, []);

  const renderProducts = () => {
    return bestSeller.map((product) => (
      <ProductCard className="category" key={product.id} product={product} />
    ));
  };

  const renderCategories = () => {
    return categories.map((category, index) => {
      let icon;
      if (index === 0) {
        icon = <CoronavirusOutlinedIcon sx={{ fontSize: "64px" }} />;
      } else if (index === 1) {
        icon = <HeartBrokenOutlinedIcon sx={{ fontSize: "64px" }} />;
      } else if (index === 2) {
        icon = <SickOutlinedIcon sx={{ fontSize: "64px" }} />;
      } else if (index === 3) {
        icon = <ColorizeIcon sx={{ fontSize: "64px" }} />;
      } else if (index === 4) {
        icon = <MonitorHeartOutlinedIcon sx={{ fontSize: "64px" }} />;
      }

      return (
        <Box
          className="category"
          key={category.name}
          component={Link}
          href={`/products/category/${category.name}`}
          underline="none"
          flex="1"
          border="1px solid #f3f4f5"
          color="#7d7d7d"
          sx={{
            height: "160px",
            backgroundColor: "white",
            mb: "48px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 3px 8px #aeafaf",
          }}
        >
          <Box>{icon}</Box>
          <Box>
            <Typography
              fontWeight="bold"
              color="text.primary"
              variant="subtitle1"
            >
              {category.name}
            </Typography>
          </Box>
        </Box>
      );
    });
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "720px",
          backgroundImage:
            "url(https://img.freepik.com/free-vector/tiny-pharmacists-with-rx-prescription-drugs_74855-7882.jpg?t=st=1652791461~exp=1652792061~hmac=2783b346f4535ee4295cf66fb639a7e1f6a540727998f8ad7210ca4b4b2df791&w=826)",
          backgroundSize: "100% 720px",
        }}
      >
        <Box
          color="white"
          className="text"
          width="55%"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          padding="24px 0"
          borderRadius="32px"
        >
          <Typography variant="h4" fontWeight="bold">
            GREAT SERVICE   LOWER PRICES  FREE DELIVERY
          </Typography>
          <Box mt="24px" width="70%">
            <Typography align="center" variant="h5">
              Your go to place for prescriptions. We are an independent owned
              pharmacy located in Jakarta. Our pharmacy is staffed by highly
              trained pharmacist and pharmacy technicians.
            </Typography>
          </Box>
        </Box>
      </div>

      <Box mt="42px">
        <Typography textAlign="center" variant="h4">
          Best Seller
        </Typography>
      </Box>
      <Box
        sx={{
          width: "100%",
          marginInline: "auto",
          display: "flex",
          justifyContent: "center",
        }}
      >
        {renderProducts()}
      </Box>
      <Box margin="42px 0 24px 0">
        <Typography textAlign="center" variant="h4">
          Category
        </Typography>
      </Box>
      <Box
        sx={{
          mb: "48px",
          width: "100%",
          display: "flex",
        }}
      >
        {renderCategories()}
      </Box>
    </div>
  );
}

export default Home;
