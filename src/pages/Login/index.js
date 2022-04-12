import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Link } from "react-router-dom";
import axios from "../../utils/axios";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import { TextField, Typography } from "@mui/material";
import { loginAction } from "../../store/actions";

function Login() {
  const username = useSelector((state) => state.auth.username);
  const dispatch = useDispatch();
  const [formState, setFormState] = useState({
    username: "",
    password: "",
    isAdmin: "",
  });

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const onLoginClick = async () => {
    try {
      const res = await axios.post("/users/login", {
        username: formState.username,
        password: formState.password,
        isAdmin: formState.isAdmin,
      });

      const user = res.data.user[0];

      const action = loginAction(user);

      console.log(res.data.user[0]);
      dispatch(action);
    } catch (error) {
      console.log({ error });
    }
  };

  const onInputPress = (e) => {
    if (e.code === "Enter") onLoginClick();
  };

  if (username) {
    return <Navigate to="/" replace />;
  }

  return (
    <Container
      sx={{
        width: 500,
        height: 400,
        backgroundColor: "white",
        marginTop: 10,
        borderRadius: 6,
        boxShadow: 3,
      }}
    >
      <Typography
        variant="h1"
        sx={{
          color: "black",
          textAlign: "center",
          fontWeight: "bold",
          fontSize: 25,
          paddingTop: 4,
          marginBottom: 2,
        }}
      >
        Bodrugs
      </Typography>
      <Container
        sx={{
          width: 350,
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          backgroundColor: "white",
          paddingTop: 1,
        }}
      >
        <TextField
          placeholder="Enter your username"
          variant="outlined"
          name="username"
          onChange={handleChange}
          onKeyPress={onInputPress}
          sx={{
            p: 1,
            m: 1,
            width: "100%",
          }}
        />

        <TextField
          placeholder="Enter your password"
          name="password"
          type="password"
          onChange={handleChange}
          onKeyPress={onInputPress}
          sx={{
            p: 1,
            m: 1,
            width: "100%",
          }}
        />
        <Container
          sx={{
            marginTop: 1,
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <Container
            sx={{
              marginBottom: 2,
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "end",
            }}
          >
            <Link to="/forgot-password">Forgot password?</Link>
            <Link to="/register">Register here</Link>
          </Container>
          <Button
            variant="contained"
            color="primary"
            onClick={onLoginClick}
            sx={{
              width: "100%",
              paddingInline: 17,
            }}
          >
            Login
          </Button>
        </Container>
      </Container>
    </Container>
  );
}

export default Login;
