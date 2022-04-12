import React from "react";
import { useState, useEffect } from "react";
import axios from "../../../../utils/axios";
import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  Grid,
  Autocomplete,
  FormLabel,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import InputQty from "./components/InputQty";

function InputProducts() {
  const [categories, setCategories] = useState([]);
  const [formState, setFormState] = useState({
    isLiquid: true,
  });

  const handleLiquidButtonChange = (e) => {
    setFormState({ ...formState, isLiquid: Boolean(parseInt(e.target.value)) });
  };

  const fetchCategories = async () => {
    try {
      const res = await axios.get(`/categories`);
      const { data } = res;
      setCategories(data);
    } catch (error) {
      console.log(alert(error.message));
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <Box display="flex" justifyContent="center">
      <Paper
        sx={{
          width: "75%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h3" textAlign="center" mt="24px">
          Input New Products
        </Typography>
        <Paper elevation={3} sx={{ mt: "42px", mb: "20px", width: "40%" }}>
          <Box sx={{ flexGrow: 1, padding: "24px 0 24px 58px" }}>
            <Grid container spacing={0}>
              <Grid item xs={8} mb="24px">
                <TextField
                  name="productName"
                  label="Product Name"
                  variant="outlined"
                  size="small"
                />
              </Grid>
              <Grid item xs={4} mb="24px" mr="20px">
                <TextField
                  name="price"
                  label="Price"
                  variant="outlined"
                  size="small"
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  name="dose"
                  label="Dose"
                  variant="outlined"
                  size="small"
                />
              </Grid>
              <Grid item xs={8} mb="24px">
                <TextField
                  name="description"
                  label="Description"
                  variant="outlined"
                  size="small"
                />
              </Grid>
              <Grid item xs={12} mb="8px">
                <Typography variant="body">Upload Product Image</Typography>
              </Grid>
              <Grid item xs={12} mb="24px">
                <input type="file" />
              </Grid>
              <Grid item xs={4} mb="24px">
                <FormControl>
                  <FormLabel id="demo-radio-buttons-group-label">
                    isLiquid ?
                  </FormLabel>
                  <RadioGroup defaultValue={1} name="radio-buttons-group">
                    <FormControlLabel
                      value={1}
                      control={<Radio />}
                      label="Yes"
                      onChange={handleLiquidButtonChange}
                    />
                    <FormControlLabel
                      value={0}
                      control={<Radio />}
                      label="No"
                      onChange={handleLiquidButtonChange}
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <Autocomplete
                  disablePortal
                  name="category"
                  sx={{ width: "180px" }}
                  options={categories.map((category) => category.name)}
                  renderInput={(params) => (
                    <TextField {...params} label="Category" />
                  )}
                  size="small"
                />
              </Grid>
              <Grid item xs={12} mb="12px">
                <Typography>Quantity</Typography>
              </Grid>
              {/* IF conditional */}
              <InputQty formState={formState} />
              <Grid item xs={10} mb="12px" textAlign="center">
                <Button variant="contained" color="warning">
                  Input
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Paper>
    </Box>
  );
}

export default InputProducts;
