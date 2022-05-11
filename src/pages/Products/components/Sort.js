import React from "react";
import {
  Box,
  Select,
  FormControl,
  MenuItem,
  InputLabel,
  Typography,
} from "@mui/material";

function Sort(props) {
  const sortHandler = (e) => {
    props.sortProducts(e.target.value);
  };
  return (
    <Box display="flex" flexDirection="column">
      <Box>
        <Typography variant="h5">Sort</Typography>
      </Box>
      <FormControl
        variant="outlined"
        size="small"
        sx={{ m: "8px auto ", width: 160 }}
      >
        <InputLabel id="demo-simple-select-standard-label">Name</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          name="sortBy"
          onChange={sortHandler}
          label="Sort By Name"
        >
          <MenuItem value="Asc">A-Z</MenuItem>
          <MenuItem value="Desc">Z-A</MenuItem>
        </Select>
      </FormControl>
      <FormControl
        variant="outlined"
        size="small"
        sx={{ m: "8px auto ", width: 160 }}
      >
        <InputLabel id="demo-simple-select-standard-label">Price</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
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
