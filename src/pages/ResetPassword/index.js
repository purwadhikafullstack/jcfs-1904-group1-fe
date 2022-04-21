import React from "react";
import axios from "../../utils/axios";
import { TextField, Typography, Button, Container } from "@mui/material";
import { useState, useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";

function ResetPassword() {
  const [formState, setFormState] = useState({
    password: "",
  });

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const onSubmitClick = async () => {
    try {
      const res = await axios.put("/users/reset-password", {
        password: formState.password,
        token: useParams.token,
      });
    } catch (error) {
      console.log({ error });
    }
    alert("Password has been reset");
    <Navigate to="/login" replace />;
  };

  const onInputPress = (e) => {
    if (e.code === "Enter") onSubmitClick();
  };

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
          placeholder="Enter new password"
          variant="outlined"
          name="oldPassword"
          type="password"
          onChange={handleChange}
          sx={{
            p: 1,
            m: 1,
            width: "100%",
          }}
        />
        <TextField
          placeholder="Confirm your new password"
          variant="outlined"
          name="newPassword"
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
          ></Container>
          <Button
            component="a"
            href="/login"
            variant="contained"
            color="primary"
            onClick={onSubmitClick}
            sx={{
              width: "100%",
              paddingInline: 17,
            }}
          >
            Reset
          </Button>
        </Container>
      </Container>
    </Container>
  );
}

export default ResetPassword;
