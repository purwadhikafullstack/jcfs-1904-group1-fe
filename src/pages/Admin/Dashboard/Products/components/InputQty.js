import React from "react";
import { Box, Grid, TextField } from "@mui/material";

function InputQty(props) {
  const { isLiquid } = props.formState;

  if (isLiquid == true) {
    return (
      <Grid container>
        <Grid item xs={2} mb="48px" mr="20px">
          <TextField name="box" label="Box" variant="outlined" size="small" />
        </Grid>
        <Grid item xs={2} mr="20px">
          <TextField
            name="bottle"
            label="Bottle"
            variant="outlined"
            size="small"
          />
        </Grid>
      </Grid>
    );
  }
  return (
    <Grid container>
      <Grid item xs={2} mb="48px" mr="20px">
        <TextField name="box" label="Box" variant="outlined" size="small" />
      </Grid>
      <Grid item xs={2} mr="20px">
        <TextField name="strip" label="Strip" variant="outlined" size="small" />
      </Grid>
      <Grid item xs={2} mr="20px">
        <TextField name="pcs" label="Pcs" variant="outlined" size="small" />
      </Grid>
    </Grid>
  );
}

export default InputQty;
