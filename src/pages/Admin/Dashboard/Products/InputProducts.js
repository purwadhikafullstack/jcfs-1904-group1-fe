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
  InputLabel,
  Select,
  MenuItem,
  FormLabel,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";

function InputProducts() {
  const [categories, setCategories] = useState([]);
  const [formState, setFormState] = useState({
    isLiquid: 1,
  });
  const [image, setImage] = useState("");

  const handleLiquidButtonChange = (e) => {
    setFormState({ ...formState, isLiquid: parseInt(e.target.value) });
  };

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const onImageChange = (e) => {
    const image = e.target.files[0];
    setImage(image);
  };

  const onInputClick = async () => {
    try {
      const formData = new FormData();
      formData.append("productPhoto", image);
      formData.append("productName", formState.productName);
      formData.append("price", formState.price);
      formData.append("dose", formState.dose);
      formData.append("description", formState.description);
      formData.append("category_id", formState.category_id);
      formData.append("isLiquid", formState.isLiquid);
      if (formState.isLiquid == 1) {
        formData.append("qtyBox", formState.box);
        formData.append("qtyBottle", formState.bottle);
      } else {
        formData.append("qtyBox", formState.box);
        formData.append("qtyStrip", formState.strip);
        formData.append("qtyPcs", formState.pcs);
      }

      const res = await axios.post(`/products`, formData);
      alert("Input Product Success");
      window.location.reload();
      console.log({ res });
    } catch (error) {
      console.log({ error });
    }
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
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={4} mb="24px" mr="20px">
                <TextField
                  name="price"
                  label="Price"
                  variant="outlined"
                  size="small"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  name="dose"
                  label="Dose"
                  variant="outlined"
                  size="small"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={8} mb="24px">
                <TextField
                  name="description"
                  label="Description"
                  variant="outlined"
                  size="small"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} mb="8px">
                <Typography variant="body">Upload Product Image</Typography>
              </Grid>
              <Grid item xs={12} mb="24px">
                <input type="file" onChange={onImageChange} />
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
                <InputLabel>Category</InputLabel>
                <Select
                  defaultValue=""
                  name="category_id"
                  onChange={handleChange}
                  sx={{ width: "160px" }}
                  size="small"
                >
                  <MenuItem value="">Default</MenuItem>
                  {categories.map((category) => (
                    <MenuItem key={category.id} value={category.id}>
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
              <Grid item xs={12} mb="12px">
                <Typography>Quantity</Typography>
              </Grid>

              {/*conditional */}
              {formState.isLiquid ? (
                <Grid container>
                  <Grid item xs={3} mb="48px" mr="20px">
                    <TextField
                      name="box"
                      label="Box"
                      variant="outlined"
                      size="small"
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={3} mr="20px">
                    <TextField
                      name="bottle"
                      label="Bottle"
                      variant="outlined"
                      size="small"
                      onChange={handleChange}
                    />
                  </Grid>
                </Grid>
              ) : (
                <Grid container>
                  <Grid item xs={3} mb="48px" mr="20px">
                    <TextField
                      name="box"
                      label="Box"
                      variant="outlined"
                      size="small"
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={3} mr="20px">
                    <TextField
                      name="strip"
                      label="Strip"
                      variant="outlined"
                      size="small"
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={3} mr="20px">
                    <TextField
                      name="pcs"
                      label="Pcs"
                      variant="outlined"
                      size="small"
                      onChange={handleChange}
                    />
                  </Grid>
                </Grid>
              )}

              <Grid
                item
                xs={10}
                mb="12px"
                textalign="center"
                display="flex"
                justifyContent="center"
              >
                <Button
                  variant="contained"
                  color="warning"
                  onClick={onInputClick}
                >
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
