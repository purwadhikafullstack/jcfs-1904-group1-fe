import React, { useState, useEffect } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Link, useParams } from "react-router-dom";
import axios from "../../utils/axios";
import { useSelector } from "react-redux";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import { TextField, Typography } from "@mui/material";

function Profile() {
  const userId = useSelector((state) => state.auth.id);
  const username = useSelector((state) => state.auth.username);

  const [image, setImage] = useState("");
  const [upload, setUpload] = useState("");
  const [formState, setFormState] = useState({ gender: "" });

  const fetchUser = async () => {
    try {
      const res = await axios.get(`/users/user/${userId}`);
      console.log(res.data.result[0][0]);

      setFormState(res.data.result[0][0]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const onImageChange = (e) => {
    const newImage = e.target.files[0];
    setUpload(newImage);
    setImage(URL.createObjectURL(newImage));
  };

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleGenderChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };
  console.log(userId);
  const onSaveClick = async () => {
    try {
      const updatedData = {
        username: username,
        fullName: formState.fullName,
        age: formState.age,
        gender: formState.gender,
        address: formState.address,
      };
      const res = await axios.put(`/users/update-user/${userId}`, updatedData);
      alert("Data updated");
      console.log({ res });
    } catch (error) {
      alert(error);
    }
  };

  return (
    <Box display="flex" justifyContent="center">
      <Box
        display="flex"
        justifyContent="space-evenly"
        alignItems="center"
        sx={{
          width: 900,
          height: 800,
          backgroundColor: "white",
          marginTop: 10,
          borderRadius: 4,
          boxShadow: 3,
        }}
      >
        <Box display="flex" flexDirection="column" alignItems="center">
          <img src={formState.userPhoto} style={{ width: "320px" }} />
          <Box pt="5px">
            <Button href={`/profile/edit-photo/${userId}`} variant="contained">
              edit photo
            </Button>
          </Box>
        </Box>
        <Box>
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
            {username}'s Profile
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
              value={formState.fullName}
              placeholder="full name"
              onChange={handleChange}
              type="name"
              name="fullName"
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
              value={formState.email}
              onChange={handleChange}
              placeholder="Email"
              disabled="1"
              type="email"
              name="email"
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
              value={formState.age}
              onChange={handleChange}
              placeholder="age"
              name="age"
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
              name="gender"
              value={formState.gender}
              onChange={handleGenderChange}
            >
              <FormControlLabel
                value="female"
                control={<Radio />}
                label="Female"
              />
              <FormControlLabel value="male" control={<Radio />} label="Male" />
            </RadioGroup>
            <Container>
              <Typography variant="h7">Address</Typography>
            </Container>
            <TextField
              value={formState.address}
              onChange={handleChange}
              placeholder="address"
              name="address"
              sx={{
                p: 1,
                m: 1,
                width: "100%",
              }}
            />
            <Link to={"/reset-password"}></Link>
            {/* <Container>
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
     /> */}

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
        </Box>
      </Box>
    </Box>
  );
}

export default Profile;
