import { Link } from "react-router-dom";
import { Button, Container } from "@mui/material";
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
    <Container
      sx={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
      }}
    >
      <Button variant="outlined" component={Link} to="/">
        BoDrugs
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
  );
};
export default Navigation;
