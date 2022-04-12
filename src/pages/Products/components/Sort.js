import React from "react";
import { Box, Select, FormControl, MenuItem, InputLabel } from "@mui/material";

function Sort(props) {
  const sortHandler = (e) => {
    props.sortProducts(e.target.value);
  };
  return (
    <Box display="flex">
      <FormControl variant="standard" sx={{ m: 1, minWidth: 60 }}>
        <InputLabel id="demo-simple-select-standard-label">Name</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          disableUnderline
          name="sortBy"
          onChange={sortHandler}
          label="Sort By Name"
        >
          <MenuItem value="Asc">A-Z</MenuItem>
          <MenuItem value="Desc">Z-A</MenuItem>
        </Select>
      </FormControl>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 60 }}>
        <InputLabel id="demo-simple-select-standard-label">Price</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          disableUnderline
          name="status"
          onChange={sortHandler}
          label="Sort By Price"
        >
          <MenuItem value="LowToHi">Lowest To Highest</MenuItem>
          <MenuItem value="HiToLow">Highest To Lowest</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}

export default Sort;
