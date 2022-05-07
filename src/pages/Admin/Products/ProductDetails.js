import React from "react";
import { useState, useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import axios from "../../../utils/axios";
import {
  Box,
  Typography,
  Button,
  TextField,
  MenuItem,
  Select,
} from "@mui/material";
import { useSelector } from "react-redux";

function ProductDetails() {
  const { id } = useSelector((state) => state.auth);
  const [product, setProduct] = useState({
    priceStrip: "",
    priceBox: "",
    pricePcs: "",
  });
  const [newStock, setNewStock] = useState({ priceStrip: "" });
  const [categories, setCategories] = useState([]);
  const params = useParams();
  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState("");

  const handleChange = (e) => {
    setNewStock({ ...newStock, [e.target.name]: e.target.value });
  };

  const onImageChange = (e) => {
    const image = e.target.files[0];
    setImage(image);
  };

  const onEditClick = () => {
    setIsEdit(true);
  };

  const onSaveClick = () => {
    updateData();
    setIsEdit(false);
  };

  const onCancelClick = () => {
    setIsEdit(false);
  };
  const onDeleteClick = () => {
    if (window.confirm("Please confirm to delete product!")) {
      putDelete();
      window.location.reload();
    }
  };
  const onUnDeleteClick = () => {
    if (window.confirm("Please confirm to undelete product!")) {
      putUnDelete();
      window.location.reload();
    }
  };

  const putDelete = async () => {
    try {
      const res = await axios.put(`/products/${params.id}/delete`);
    } catch (error) {
      console.log({ error });
    }
  };
  const putUnDelete = async () => {
    try {
      const res = await axios.put(`/products/${params.id}/undelete`);
      <Navigate to="/admin/products" replace />;
    } catch (error) {
      console.log({ error });
    }
  };

  const updateData = async () => {
    try {
      const formData = new FormData();
      formData.append("id", product.id);
      formData.append("user_id", id);
      formData.append("productPhoto", image);
      formData.append("productName", product.productName);
      formData.append("priceStrip", product.priceStrip);
      formData.append("dose", product.dose);
      formData.append("description", product.description);
      formData.append("category_id", product.category_id);
      formData.append("isLiquid", product.isLiquid);
      if (product.isLiquid === 1) {
        formData.append("qtyBottleTotal", newStock.qtyStripTotal);
        formData.append("qtyBottleCurrent", product.qtyStripTotal);
      } else {
        formData.append("priceBox", product.priceBox);
        formData.append("pricePcs", product.pricePcs);
        formData.append("qtyBoxTotal", newStock.qtyBoxTotal);
        formData.append("qtyBoxCurrent", product.qtyBoxTotal);
        formData.append("qtyStripTotal", newStock.qtyStripTotal);
        formData.append("qtyStripCurrent", product.qtyStripTotal);
        formData.append("qtyPcsTotal", newStock.qtyPcsTotal);
        formData.append("qtyPcsCurrent", product.qtyPcsTotal);
      }
      const res = await axios.put(`/products/${params.id}`, formData);
      console.log(params.id);
      alert("Update Data Success");
      window.location.reload();
      console.log({ res });
    } catch (error) {
      console.log({ error });
    }
  };

  const fetchProduct = async () => {
    try {
      const res = await axios.get(`/products/${params.category}/${params.id}`);
      const { data } = res;
      setProduct(data.result[0]);
      setNewStock(data.result[0]);
    } catch (error) {
      console.log(alert(error.message));
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
    fetchProduct();
    fetchCategories();
  }, [isEdit]);

  const type = product.isLiquid ? "ml" : "mg";
  console.log(newStock);
  return (
    <Box sx={{ padding: "0 24px 0 24px", ml: "240px" }}>
      {!isEdit ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "start",
            mt: "20px",
          }}
        >
          <img src={product.productPhoto} alt="Gambar Obat" width={320} />
          <Box padding="24px 0 0 64px" sx={{ width: "40%" }}>
            <Typography variant="h4" fontWeight={600}>
              {product.productName} {product.dose}
              {type}
            </Typography>
            {product.isLiquid ? (
              <div>
                <Typography
                  variant="h5"
                  sx={{
                    m: "12px 0",
                  }}
                >
                  Rp{product.priceStrip.toLocaleString("id")} / Bottle
                </Typography>
              </div>
            ) : (
              <div>
                <Typography
                  variant="h5"
                  sx={{
                    m: "12px 0",
                  }}
                >
                  Rp{product.priceBox.toLocaleString("id")} / Box
                </Typography>
                <Typography
                  variant="h5"
                  sx={{
                    mb: "12px",
                  }}
                >
                  Rp{product.priceStrip.toLocaleString("id")} / Strip
                </Typography>
                <Typography
                  variant="h5"
                  sx={{
                    mb: "12px",
                    borderBottom: "1px solid black",
                    paddingBottom: "12px",
                  }}
                >
                  Rp{product.pricePcs.toLocaleString("id")} / Pcs
                </Typography>
              </div>
            )}

            <Box>
              <Box paddingBottom="12px" borderBottom={1} mb="20px">
                <Typography variant="h5" mb="4px">
                  Category
                </Typography>
                <Typography variant="h6">{product.name}</Typography>
              </Box>
              <Box borderBottom={1} paddingBottom="12px" mb="20px">
                <Typography variant="h5" mb="4px">
                  Description
                </Typography>
                <Typography variant="body2" sx={{ fontSize: "18px" }}>
                  {product.description}
                </Typography>
              </Box>
            </Box>
            <Box>
              <Typography variant="h5">Stock</Typography>
            </Box>
            {product.isLiquid ? (
              <Box mt="12px">
                <Box display="flex" justifyContent="space-between" width="88px">
                  <Typography variant="h6">Bottle :</Typography>
                  <Typography variant="h6">{product.qtyStripTotal}</Typography>
                </Box>
              </Box>
            ) : (
              <Box display="flex" justifyContent="space-around" mt="12px">
                <Box display="flex" justifyContent="space-between" width="72px">
                  <Typography variant="h6">Box :</Typography>
                  <Typography variant="h6">{product.qtyBoxTotal}</Typography>
                </Box>
                <Box display="flex" justifyContent="space-between" width="78px">
                  <Typography variant="h6">Strip :</Typography>
                  <Typography variant="h6">{product.qtyStripTotal}</Typography>
                </Box>
                <Box display="flex" justifyContent="space-between" width="72px">
                  <Typography variant="h6">Pcs :</Typography>
                  <Typography variant="h6">{product.qtyPcsTotal}</Typography>
                </Box>
              </Box>
            )}

            <Box
              display="flex"
              justifyContent="space-around"
              mt="32px"
              mb="24px"
            >
              <Button
                variant="contained"
                size="small"
                color="warning"
                onClick={onEditClick}
                sx={{
                  width: "80px",
                  color: "white",
                  backgroundColor: "#ff5252",
                }}
              >
                Edit
              </Button>
              {product.isDeleted ? (
                <Button
                  variant="contained"
                  size="small"
                  color="warning"
                  onClick={onUnDeleteClick}
                  sx={{
                    width: "80px",
                    color: "white",
                    backgroundColor: "#ff5252",
                  }}
                >
                  UnDelete
                </Button>
              ) : (
                <Button
                  variant="contained"
                  size="small"
                  color="warning"
                  onClick={onDeleteClick}
                  sx={{
                    width: "80px",
                    color: "white",
                    backgroundColor: "#ff5252",
                  }}
                >
                  Delete
                </Button>
              )}
            </Box>
          </Box>
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "start",
            mt: "20px",
          }}
        >
          <Box>
            <img src={product.productPhoto} alt="Gambar Obat" width={320} />
            <Box>
              <input type="file" onChange={onImageChange} />
            </Box>
          </Box>
          <Box padding="24px 0 0 64px" sx={{ width: "40%" }}>
            <Box
              display="flex"
              flexWrap="wrap"
              sx={{
                mb: "12px",
                borderBottom: "1px solid black",
                paddingBottom: "12px",
              }}
            >
              <TextField
                variant="outlined"
                label={null}
                name="productName"
                value={product.productName}
                onChange={handleChange}
                size="small"
                sx={{ width: "200px", mr: "24px", mb: "12px" }}
              />

              <TextField
                name="dose"
                value={product.dose}
                onChange={handleChange}
                size="small"
                sx={{ width: "200px" }}
              />

              {product.isLiquid ? (
                <TextField
                  name="priceStrip"
                  value={product.priceStrip}
                  onChange={handleChange}
                  size="small"
                  sx={{ width: "200px" }}
                  InputProps={{
                    endAdornment: <Typography>/Bottle</Typography>,
                  }}
                />
              ) : (
                <div>
                  <TextField
                    name="priceBox"
                    value={product.priceBox}
                    onChange={handleChange}
                    size="small"
                    sx={{ width: "200px", mb: "12px", mr: "24px" }}
                    InputProps={{ endAdornment: <Typography>/Box</Typography> }}
                  />
                  <TextField
                    name="priceStrip"
                    value={product.priceStrip}
                    onChange={handleChange}
                    size="small"
                    sx={{ width: "200px" }}
                    InputProps={{
                      endAdornment: <Typography>/Strip</Typography>,
                    }}
                  />
                  <TextField
                    name="pricePcs"
                    value={product.pricePcs}
                    onChange={handleChange}
                    size="small"
                    sx={{ width: "200px" }}
                    InputProps={{ endAdornment: <Typography>/Pcs</Typography> }}
                  />
                </div>
              )}
            </Box>
            <Box>
              <Box paddingBottom="12px" borderBottom={1} mb="20px">
                <Typography variant="h5" mb="4px">
                  Category
                </Typography>
                <Select
                  defaultValue={product.category_id}
                  name="category_id"
                  onChange={handleChange}
                  sx={{ width: "200px" }}
                  size="small"
                >
                  {categories.map((category) => (
                    <MenuItem key={category.id} value={category.id}>
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>
              </Box>
              <Box borderBottom={1} paddingBottom="12px" mb="20px">
                <Typography variant="h5" mb="4px">
                  Description
                </Typography>
                <TextField
                  name="description"
                  value={product.description}
                  onChange={handleChange}
                  size="small"
                  multiline
                  rows={5}
                  sx={{ width: "100%" }}
                />
              </Box>
            </Box>
            <Box>
              <Typography variant="h5">Stock</Typography>
            </Box>
            {product.isLiquid ? (
              <Box mt="12px">
                <Box
                  display="flex"
                  justifyContent="space-between"
                  width="138px"
                >
                  <Typography variant="h6">Bottle :</Typography>
                  <TextField
                    name="qtyStripTotal"
                    value={newStock.qtyStripTotal}
                    onChange={handleChange}
                    type="number"
                    size="small"
                    sx={{ width: "62px" }}
                  />
                </Box>
              </Box>
            ) : (
              <Box display="flex" justifyContent="space-around" mt="12px">
                <Box
                  display="flex"
                  justifyContent="space-between"
                  width="120px"
                >
                  <Typography variant="h6">Box :</Typography>
                  <TextField
                    name="qtyBoxTotal"
                    value={newStock.qtyBoxTotal}
                    onChange={handleChange}
                    type="number"
                    size="small"
                    sx={{ width: "62px" }}
                  />
                </Box>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  width="120px"
                >
                  <Typography variant="h6">Strip :</Typography>
                  <TextField
                    name="qtyStripTotal"
                    value={newStock.qtyStripTotal}
                    onChange={handleChange}
                    type="number"
                    size="small"
                    sx={{ width: "62px" }}
                  />
                </Box>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  width="120px"
                >
                  <Typography variant="h6">Pcs :</Typography>
                  <TextField
                    name="qtyPcsTotal"
                    value={newStock.qtyPcsTotal}
                    onChange={handleChange}
                    type="number"
                    size="small"
                    sx={{ width: "62px" }}
                  />
                </Box>
              </Box>
            )}

            <Box
              display="flex"
              justifyContent="space-around"
              mt="32px"
              mb="24px"
            >
              <Button
                variant="contained"
                size="small"
                color="warning"
                onClick={onSaveClick}
                sx={{
                  width: "80px",
                  color: "white",
                  backgroundColor: "#ff5252",
                }}
              >
                Save
              </Button>
              <Button
                variant="contained"
                size="small"
                color="warning"
                onClick={onCancelClick}
                sx={{
                  width: "80px",
                  color: "white",
                  backgroundColor: "#ff5252",
                }}
              >
                Cancel
              </Button>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default ProductDetails;
