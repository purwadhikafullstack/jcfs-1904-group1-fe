import React from "react";
import { useState } from "react";
import axios from "../../../../utils/axios";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { InputBase, Button, Box, Typography } from "@mui/material";
import { useParams } from "react-router-dom";

function SearchBar(props) {
  const { status, userId } = props;
  let isClicked = true;
  const [formState, setFormState] = useState({});

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const onSearch = async () => {
    try {
      const res = await axios.get(`/orders/search`, {
        params: { search: formState.search, status: status },
      });
      const { data } = res;
      props.handleGetChildData(data, isClicked);
    } catch (error) {
      console.log({ error });
    }
  };

  const onInputPress = (e) => {
    if (e.code === "Enter") onSearch();
  };
  return (
    <Box width="85%" mt="20px" display="flex" margin="20px auto">
      <InputBase
        variant="outlined"
        name="search"
        onChange={handleChange}
        onKeyPress={onInputPress}
        fullWidth
        sx={{
          border: "2px solid #d5d5d5 ",
          backgroundColor: "white",
          paddingLeft: "10px",
          borderRadius: "3px",
        }}
        placeholder="Search invoice name here"
      />
      <Button
        variant="contained"
        color="warning"
        onClick={onSearch}
        sx={{
          ml: "8px",
          color: "white",
        }}
      >
        <SearchOutlinedIcon />
        Search
      </Button>
    </Box>
  );
}

export default SearchBar;
