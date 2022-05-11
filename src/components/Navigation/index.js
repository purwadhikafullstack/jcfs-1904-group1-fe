import React from "react";
import { Button, Box, Paper, Link, AppBar } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import LoginIcon from "@mui/icons-material/Login";
import Logout from "@mui/icons-material/Logout";
import Logo from "../logo1.png";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { logoutAction } from "../../store/actions";

function Navigation() {
  const { username, id } = useSelector((state) => {
    return state.auth;
  });

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const dispatch = useDispatch();

  const onLogoutClick = () => {
    dispatch(logoutAction());
  };

  return (
    <AppBar sx={{ backgroundColor: "#ff5252", position: "sticky" }}>
      <Box
        id="nav"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          textAlign: "center",
          height: "42px",
        }}
      >
        <Box>
          <Link href="/">
            <img alt="logo" src={Logo} className="logo" />
          </Link>
        </Box>
        <Box display="flex" alignItems="center">
          <Typography mr="25px">
            <Link href={"/products"} underline="hover" color="white">
              Medicine
            </Link>
          </Typography>
          <Typography mr="25px">
            <Link href={`/prescription/${id}`} underline="hover" color="white">
              Prescription
            </Link>
          </Typography>
          <Typography mr="25px">
            <Link href={`/carts/${id}`} underline="hover" color="white">
              Cart
            </Link>
          </Typography>
          <Typography>
            <Link href={`/transactions/${id}`} underline="hover" color="white">
              Transactions
            </Link>
          </Typography>

          {!username ? (
            <Box pr="12px">
              <Link href={"/login"} underline="none" color="white">
                <Box display="flex" alignItems="center">
                  <Typography ml="25px" mr="5px">
                    Log in
                  </Typography>
                  <LoginIcon fontSize="small" />
                </Box>
              </Link>
            </Box>
          ) : (
            <Tooltip title="Account settings">
              <IconButton
                onClick={handleClick}
                size="small"
                sx={{ ml: 2 }}
                aria-controls={open ? "account-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
              >
                <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
              </IconButton>
            </Tooltip>
          )}
        </Box>
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&:before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <MenuItem component="a" href="/profile">
            <Avatar /> Profile
          </MenuItem>
          <Divider />
          <MenuItem onClick={onLogoutClick} component="a" href="/products">
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>
      </Box>
    </AppBar>
  );
}

export default Navigation;
