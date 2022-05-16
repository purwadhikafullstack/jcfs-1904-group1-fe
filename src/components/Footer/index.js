import React from "react";
import { Button, Box, Link, Typography, BottomNavigation } from "@mui/material";
import CameraRoundedIcon from "@mui/icons-material/CameraRounded";
import ControlCameraRoundedIcon from "@mui/icons-material/ControlCameraRounded";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import Logo from "../logo1.png";
import "./style.css";

function Footer() {
  return (
    <Box>
      <Box
        sx={{
          backgroundColor: "#d5d5d5",
          width: "100%",
          padding: "24px 0",
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        <Box
          width="33%"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <img src={Logo} className="logo" />
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          width="33%"
        >
          <Typography mb="12px" fontSize="20px" fontWeight="bold">
            Our Contacts
          </Typography>
          <Typography textAlign="center" mb="8px">
            Purwadhika Campus Jakarta Sinarmas MSIG Tower 12th Floor, Sudirman,
            Jakarta Selatan
          </Typography>
          <Typography>Phone : +6281278785858 (Whatsapp Only)</Typography>
          <Typography mb="8px">Phone : +6282309304660 (Call Only)</Typography>
          <Typography textAlign="center">
            Email : rizky.lazuardi23@gmail.com / axaladyx@gmail.com
          </Typography>
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          width="33%"
        >
          <Typography mb="12px" fontSize="16px" fontWeight="bold">
            OPERATIONAL HOURS
          </Typography>
          <Typography mb="8px">Monday - Friday</Typography>
          <Typography>09.00 - 18.00</Typography>
        </Box>
      </Box>
      <Box sx={{ backgroundColor: "#7d7d7d", width: "100%" }}>
        <Box
          display="flex"
          padding="12px 0"
          marginInline="auto"
          width="90%"
          justifyContent="space-between"
        >
          <Typography fontSize="16px">
            ©BODRUGS.2022. ALL RIGHTS RESERVED
          </Typography>
          <Box display="flex" width="15%">
            <Box
              width="100%"
              className="iconSocial"
              display="flex"
              justifyContent="space-around"
            >
              <Box>
                <Typography>Follow Us On</Typography>
              </Box>
              <Link
                href="https://www.facebook.com/michaelsiahaan180699/"
                title="Ikuti Kami di Facebook"
                sx={{ color: "white" }}
              >
                <FacebookRoundedIcon />
              </Link>
              <Link
                href="/"
                title="Ikuti Kami di Twitter"
                sx={{ color: "white" }}
              >
                <ControlCameraRoundedIcon />
              </Link>
              <Link
                href="/"
                title="Ikuti Kami di Instagram"
                sx={{ color: "white" }}
              >
                <CameraRoundedIcon />
              </Link>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Footer;
