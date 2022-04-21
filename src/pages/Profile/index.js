import React, { useState } from "react";
import { useRadioGroup } from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
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
  const { id, username, fullName, age, address, gender, password } = userData;

  // const { id, name, email } = useSelector((state) => state.auth.user);
  const initFormState = {
    username: username,
    fullName: fullName,
    age: age,
    address: address,
    gender: gender,
    password: password,
  };
  const [formState, setFormState] = useState(initFormState);
  // const { password } = formState;

  const onSaveClick = async () => {
    try {
      // if (!formState.fullName || !formState.email)
      //   return alert("Name or Email can not be empty");
      const formData = new FormData();
      // formData.append("photo", image);
      formData.append("name", formState.name);
      formData.append("email", formState.email);
      formData.append("password", formState.password);
      formData.append("age", formState.age);
      formData.append("gender", formState.gender);
      formData.append("address", formState.address);

      const res = await axios.put(`/users/${id}`, formData);
      alert("Data updated");
      console.log({ res });
    } catch (error) {}
  };

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  return (
    <Container
      sx={{
        width: 900,
        height: 800,
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
        <Container>
          <Typography variant="h7">Full Name</Typography>
        </Container>
        <TextField
          defaultValue={userData.fullName}
          placeholder="full name"
          onChange={handleChange}
          type="name"
          sx={{
            p: 1,
            m: 1,
            width: "100%",
          }}
        />
        <Container>
          <Typography variant="h7">e-mail</Typography>
        </Container>
        <TextField
          defaultValue={userData.email}
          onChange={handleChange}
          placeholder="Email"
          type="email"
          sx={{
            p: 1,
            m: 1,
            width: "100%",
          }}
        />
        <Container>
          <Typography variant="h7">Age</Typography>
        </Container>

        <TextField
          defaultValue={userData.age}
          onChange={handleChange}
          placeholder="age"
          sx={{
            p: 1,
            m: 1,
            width: "100%",
          }}
        />
        <Container>
          <Typography variant="h7">Gender</Typography>
        </Container>
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
          defaultValue={userData.gender}
        >
          <FormControlLabel value="female" control={<Radio />} label="Female" />
          <FormControlLabel value="male" control={<Radio />} label="Male" />
          <FormControlLabel value="other" control={<Radio />} label="Other" />
        </RadioGroup>
        <Container>
          <Typography variant="h7">Address</Typography>
        </Container>
        <TextField
          defaultValue={userData.address}
          onChange={handleChange}
          placeholder="address"
          sx={{
            p: 1,
            m: 1,
            width: "100%",
          }}
        />
        <Container>
          <Typography variant="h7">Password</Typography>
        </Container>
        <TextField
          placeholder="password"
          type="password"
          onChange={handleChange}
          sx={{
            p: 1,
            m: 1,
            width: "100%",
          }}
        />

        <Button
          variant="contained"
          color="primary"
          onClick={onSaveClick}
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
