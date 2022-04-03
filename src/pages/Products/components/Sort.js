import React from "react";
import { useState } from "react";
import { Box, Select, FormControl, MenuItem, InputLabel } from "@mui/material";
import { Link } from "react-router-dom";

function Sort() {
  return (
    <Box display="flex">
      <FormControl variant="standard" sx={{ m: 1, minWidth: 60 }}>
        <InputLabel id="demo-simple-select-standard-label">Price</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          disableUnderline
          name="sortBy"
          //   onChange={sortHandler}
          label="Sort"
        >
          <MenuItem value="">Default</MenuItem>
          <MenuItem
            component={Link}
            to={"/products?sortBy=name&order=asc"}
            value="A-Z"
          >
            A-Z
          </MenuItem>
          <MenuItem value="z-a">Z-A</MenuItem>
        </Select>
      </FormControl>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 60 }}>
        <InputLabel id="demo-simple-select-standard-label">Name</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          disableUnderline
          name="status"
          //   value={formState.status}
          //   onChange={filterHandler}
          label="Filter"
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="On Time">On Time</MenuItem>
          <MenuItem value="Late">Late</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}

export default Sort;
