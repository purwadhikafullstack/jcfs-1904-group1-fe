import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "../../utils/axios";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import { TextField, Typography } from "@mui/material";

function Register() {
  const initFormState = {
    username: "",
    fullName: "",
    email: "",
    password: "",
  };

  const [formState, setFormState] = useState(initFormState);
  const { username, fullName, email, password } = formState;

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const onRegisterClick = async () => {
    try {
      const newUser = {
        username,
        fullName,
        email,
        password,
      };
      console.log(newUser);
      await axios.post("/users", newUser);
      setFormState(initFormState);
      alert("Register success");

      window.location.reload(true);
    } catch (error) {
      alert(`${error.response.data.message}`);
      console.log({ error });
    }
  };

  const onInputPress = (e) => {
    if (e.code === "Enter") onRegisterClick();
  };

  return (
    <Container
      sx={{
        width: 500,
        height: 500,
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
          paddingTop: 1,
        }}
      >
        <TextField
          placeholder="Enter username"
          variant="outlined"
          name="username"
          onChange={handleChange}
          onKeyPress={onInputPress}
          sx={{ p: 1, m: 1, width: "100%" }}
        />

        <TextField
          placeholder="Enter e-mail"
          variant="outlined"
          name="email"
          onChange={handleChange}
          onKeyPress={onInputPress}
          sx={{ p: 1, m: 1, width: "100%" }}
        />
        <TextField
          placeholder="Enter password"
          variant="outlined"
          name="password"
          type="password"
          onChange={handleChange}
          onKeyPress={onInputPress}
          sx={{ p: 1, m: 1, width: "100%" }}
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
            <Link to="/login">Login here</Link>
          </Container>

          <Button
            variant="contained"
            color="primary"
            onClick={onRegisterClick}
            sx={{ width: "100%", paddingInline: 17 }}
          >
            Register
          </Button>
        </Container>
      </Container>
    </Container>
  );
}

export default Register;
