import React from "react";
import axios from "../../utils/axios";
import { TextField, Typography, Button, Container } from "@mui/material";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

function ResetPassword() {
  const [formState, setFormState] = useState({
    newPassword: "",
    confirmNewPassword: "",
  });

  const params = useParams();
  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const { token } = useParams();
  const onSubmitClick = async () => {
    console.log(token);
    try {
      const res = await axios.put(`/users/reset-password/${token}`, {
        password: formState.newPassword,
        token: params.token,
      });
    } catch (error) {
      console.log({ error });
    }
  };

  const onInputPress = (e) => {
    if (e.code === "Enter") onSubmitClick();
  };

  const compareResult = () => {
    if (formState.newPassword !== formState.confirmNewPassword) {
      alert("Please insert the new passwords correctly.");
    } else {
      onSubmitClick();
      alert("Password has been reset successfully.");
    }
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
        minHeight: "50vh",
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
          name="newPassword"
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
          name="confirmNewPassword"
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
            variant="contained"
            color="primary"
            onClick={compareResult}
            href="/login"
            sx={{
              width: "100%",
              paddingInline: 17,
            }}
          >
            submit
          </Button>
        </Container>
      </Container>
    </Container>
  );
}

export default ResetPassword;
