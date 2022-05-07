import React from "react";
import { useState } from "react";
import axios from "../../../utils/axios";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { InputBase, Button, Box } from "@mui/material";
import { useParams } from "react-router-dom";

function SearchBar(props) {
  const params = useParams();
  const [formState, setFormState] = useState({});

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };
  const onSearchMed = async () => {
    try {
      const res = await axios.get(`/products/search`, {
        params: { search: formState.search },
      });
      const { data } = res;
      props.handleGetChildData(data[0]);
    } catch (error) {
      console.log({ error });
    }
  };

  const onInputPress = (e) => {
    if (e.code === "Enter") onSearchMed();
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
        placeholder="Vitamin Anti Virus"
      />
      <Button
        variant="contained"
        color="warning"
        onClick={onSearchMed}
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
