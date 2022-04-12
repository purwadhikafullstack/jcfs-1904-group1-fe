import { Link } from "react-router-dom";
import { AppBar, Button, Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutAction } from "../../store/actions";

const Navigation = () => {
  const [isLogged, setisLogged] = useState(false);
  useEffect(() => {
    checkStorage();
    return () => {};
  }, [isLogged]);
  function checkStorage() {
    if (localStorage.getItem("userData")) {
      setisLogged(true);
    } else {
      setisLogged(false);
    }
  }
  const dispatch = useDispatch();

  const { username, id } = useSelector((state) => {
    return state.auth;
  });

  const onLogoutClick = () => {
    dispatch(logoutAction());
    this.forceUpdate();
  };

  const onLoginClick = () => {
    // this.forceUpdate();
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "darkorange" }}>
      <Container
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}
      >
        <Button color="error" variant="contained" component={Link} to="/">
          <Typography
            variant="button"
            fontSize={20}
            fontFamily={"monospace"}
            fontStyle={"italic"}
            style={{ textTransform: "none" }}
            sx={{ fontWeight: 1 }}
          >
            bodrugs
          </Typography>
        </Button>
        {!isLogged ? (
          <Button
            variant="contained"
            component={Link}
            to="/login"
            onClick={onLoginClick}
          >
            Log in
          </Button>
        ) : (
          <Button
            variant="contained"
            color="error"
            component={Link}
            to="/login"
            onClick={onLogoutClick}
          >
            Log out
          </Button>
        )}
      </Container>
    </AppBar>
  );
};
export default Navigation;
