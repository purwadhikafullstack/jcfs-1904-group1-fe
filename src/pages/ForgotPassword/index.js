import React, { useState } from "react";
import axios from "../../utils/axios";
import { TextField, Typography, Button, Container } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

function ForgotPassword() {
  const [formState, setFormState] = useState({
    email: "",
  });

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const onSubmitClick = async () => {
    try {
      const res = await axios.post("/users/forgot-password", {
        email: formState.email,
      });
      alert("Reset password email has been sent");
    } catch (error) {
      console.log({ error });
    }
  };

  const onInputPress = (e) => {
    if (e.code === "Enter") onSubmitClick();
  };

  return (
    <Container
      sx={{
        width: 500,
        height: 300,
        backgroundColor: "white",
        marginp: 10,
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
          placeholder="Enter your e-mail"
          variant="outlined"
          name="email"
          type="email"
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

export default ForgotPassword;
