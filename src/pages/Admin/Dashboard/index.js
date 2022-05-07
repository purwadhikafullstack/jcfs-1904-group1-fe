import React from "react";
import { Box, Paper, Link, Drawer } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import Logout from "@mui/icons-material/Logout";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import { useDispatch, useSelector } from "react-redux";
import { logoutAction } from "../../../store/actions";

function Dashboard() {
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
  const drawerWidth = 240;
  return (
    <Box>
      <Box
        sx={{
          float: "left",
        }}
      >
        <Drawer
          variant="permanent"
          position="fixed"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: drawerWidth,
              boxSizing: "border-box",
            },
            backgroundColor: "#ff5252",
          }}
        >
          <Toolbar />
          <Box sx={{ overflow: "auto", marginTop: "-60px" }}>
            <List>
              <Link underline="none" color="textPrimary" href="/admin/products">
                <ListItem button key="Products">
                  <ListItemIcon>
                    <InboxIcon />
                  </ListItemIcon>
                  <ListItemText primary="Products" />
                </ListItem>
              </Link>
              <Link
                underline="none"
                color="textPrimary"
                href="/admin/sales-report"
              >
                <ListItem button key="Sales Report">
                  <ListItemIcon>
                    <InboxIcon />
                  </ListItemIcon>
                  <ListItemText primary="Sales Report" />
                </ListItem>
              </Link>
              <Link underline="none" color="textPrimary" href="/admin/orders">
                <ListItem button key="Orders">
                  <ListItemIcon>
                    <InboxIcon />
                  </ListItemIcon>
                  <ListItemText primary="Orders" />
                </ListItem>
              </Link>
              <Link
                underline="none"
                color="textPrimary"
                href="/admin/transactions-history"
              >
                <ListItem button key="Transactions History">
                  <ListItemIcon>
                    <InboxIcon />
                  </ListItemIcon>
                  <ListItemText primary="Transactions History" />
                </ListItem>
              </Link>
              <Link underline="none" color="textPrimary" href="/admin/stocks">
                <ListItem button key="Stocks">
                  <ListItemIcon>
                    <InboxIcon />
                  </ListItemIcon>
                  <ListItemText primary="Stocks" />
                </ListItem>
              </Link>
            </List>
            <Divider />
          </Box>
        </Drawer>
      </Box>
      <Paper elevation={3} sx={{ backgroundColor: "#ff5252" }}>
        <Box
          id="nav"
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <Typography>Hi Admin...</Typography>
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
          <MenuItem onClick={onLogoutClick} component="a" href="/products">
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>
      </Paper>
    </Box>
  );
}

export default Dashboard;
