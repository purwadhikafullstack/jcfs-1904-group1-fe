import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Link } from "react-router-dom";
import axios from "../../utils/axios";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import { TextField, Typography } from "@mui/material";

function Profile() {
  const usersLocalStorage = localStorage.getItem("userData");
  const userData = JSON.parse(usersLocalStorage);
  const { id, username } = userData;
  const initFormState = {
    password: "",
  };
  const [formState, setFormState] = useState(initFormState);
  const { password } = formState;
  const onSaveClick = () => {};

  return (
    <Container
      sx={{
        width: 500,
        height: 400,
        backgroundColor: "white",
        marginTop: 10,
        borderRadius: 4,
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
        {userData.username}'s Profile
      </Typography>
      <Container
        sx={{
          width: 350,

          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          backgroundColor: "white",
          paddingTop: 2,
        }}
      >
        <Container
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "start",
            marginBottom: -1,
          }}
        >
          <Typography
            variant="h5"
            gutterBottom
            sx={{
              fontSize: 17,
            }}
          ></Typography>
        </Container>

        <Container
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "start",
            marginBottom: -1,
          }}
        >
          <Typography
            variant="h5"
            gutterBottom
            sx={{
              fontSize: 17,
            }}
          ></Typography>
        </Container>
        <TextField
          id="outlined-password-input"
          placeholder="Enter your old password"
          name="password"
          type="password"
          sx={{
            p: 1,
            m: 1,
            width: "100%",
          }}
        />
        <TextField
          id="outlined-password-input"
          placeholder="Enter your new password"
          name="password-new"
          type="password-new"
          onClick={onSaveClick}
          sx={{
            p: 1,
            m: 1,
            width: "100%",
          }}
        />
        <Button
          variant="contained"
          color="primary"
          sx={{
            width: "90%",
            paddingInline: 17,
          }}
        >
          Save
        </Button>
      </Container>
    </Container>
  );
}

export default Profile;
