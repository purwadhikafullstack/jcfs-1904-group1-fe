import React, { useEffect, useState } from "react";
import axios from "../../utils/axios";
import {
  TextField,
  Typography,
  Button,
  Box,
  Paper,
  MenuItem,
  FormControl,
  Select,
  InputLabel,
} from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import IndeterminateCheckBoxIcon from "@mui/icons-material/IndeterminateCheckBox";

import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function Carts() {
  const userId = useSelector((state) => state.auth.id);
  const [carts, setCarts] = useState([]);
  const [priceState, setPriceState] = useState({
    tax: "",
    ppnObat: "",
    total: "",
    totalAfterTax: "",
  });

  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);
  const [costs, setCosts] = useState([]);
  const [service, setService] = useState({
    courier: "",
    service: "",
    description: "",
    cost: "",
    etd: "",
  });
  const [selectedAddress, setSelectedAddress] = useState({
    province: "",
    city: "",
  });
  const [state, setState] = useState("");
  const [address, setAddress] = useState("");
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedCourier, setSelectedCourier] = useState("");

  const handleChange = (e) => {
    setSelectedProvince(e.target.value);
    const selectedProv = provinces.find(
      (prov) => prov.province_id === e.target.value
    );
    setSelectedAddress({ ...selectedAddress, province: selectedProv.province });
  };
  const handleChangeCity = (e) => {
    setSelectedCity(e.target.value);
    const selectedCit = cities.find((city) => city.city_id === e.target.value);
    setSelectedAddress({ ...selectedAddress, city: selectedCit.city_name });
  };
  const handleChangeAddress = (e) => {
    setAddress(e.target.value);
  };
  const handleChangeCourier = (e) => {
    setSelectedCourier(e.target.value);
  };
  const handleChangeService = (e) => {
    const selectedService = costs.find(
      (cost) => cost.service === e.target.value
    );
    if (selectedService) {
      setService({
        ...service,
        courier: selectedCourier,
        service: selectedService.service,
        description: selectedService.description,
        cost: selectedService.cost[0].value,
        etd: selectedService.cost[0].etd,
      });
    }
  };

  const fetchCarts = async () => {
    try {
      const { data } = await axios.get(`/carts/user/${userId}`);

      setPriceState({
        ...priceState,
        total: data.total,
        ppnObat: data.ppnObat,
        tax: data.tax,
        totalAfterTax: data.totalAfterTax,
      });
      setCarts(data.dataSend);
    } catch (error) {
      alert(error);
    }
  };

  const getProvince = async () => {
    try {
      const response = await axios.get(`/rajaongkir/province`);
      const { data } = response;
      setProvinces(data.rajaongkir.results);
    } catch (error) {
      alert(error);
    }
  };
  useEffect(() => {
    const getCity = async () => {
      try {
        const response = await axios.get(
          `/rajaongkir/city/${selectedProvince}`
        );
        const { data } = response;
        setCities(data.rajaongkir.results);
      } catch (error) {
        alert(error);
      }
    };
    if (selectedProvince) {
      getCity();
    }
  }, [selectedProvince]);

  useEffect(() => {
    const getCost = async () => {
      try {
        const response = await axios.get(
          `/rajaongkir/cost/153/${selectedCity}/1000/${selectedCourier}`
        );
        const { data } = response;
        setCosts(data.rajaongkir.results[0].costs);
      } catch (error) {
        alert(error);
      }
    };
    if (selectedCourier) {
      getCost();
    }
  }, [selectedCourier]);

  useEffect(() => {
    fetchCarts();
    getProvince();
  }, [state]);

  const onCheckoutClick = async () => {
    if (
      address === "" ||
      selectedAddress.province === "" ||
      selectedAddress.city === ""
    ) {
      alert("Please complete shipping details");
    } else {
      try {
        const d = new Date();
        const date = d.getDate();
        const month = d.getMonth() + 1;
        const year = d.getFullYear();
        const time = d.getTime();
        const details =
          address +
          `. ${selectedAddress.city}` +
          `, ${selectedAddress.province}`;

        const newTransaction = {
          invoice: `INV/${userId}/${year}${month}${date}/${time}`,
          user_id: userId,
          amount: priceState.totalAfterTax + service.cost,
          address: details,
          carts,
        };

        await axios.post("/carts/checkout", newTransaction);
        alert("Checkout successful");
        window.location.reload();
      } catch (error) {
        alert("Checkout failed");
        console.log(error);
      }
    }
  };
  if (!userId) {
    return <Navigate to="/" replace />;
  }
  const renderCarts = () => {
    return carts.map((cart, index) => {
      return (
        <Box>
          <Box display="flex" justifyContent="space-around" alignItems="center">
            <Box
              width="20%"
              variant="h6"
              display="flex"
              justifyContent="center"
              alignItems="center"
              flexDirection="column"
            >
              <img
                src={cart.productPhoto}
                alt="product image"
                style={{ height: "50%", width: "110px" }}
              />

              <Box display="flex">
                <Typography>{cart.productName}</Typography>
              </Box>
            </Box>

            <Box
              width="20%"
              variant="h6"
              display="flex"
              justifyContent="center"
            >
              <Typography>Rp {cart.price.toLocaleString("id")}</Typography>
            </Box>
            <Box
              width="20%"
              variant="h6"
              display="flex"
              justifyContent="center"
            >
              <Box>
                <Button disabled={cart.qty == 1}>
                  <IndeterminateCheckBoxIcon
                    color={cart.qty == 1 ? "disabled" : "success"}
                    onClick={async () => {
                      try {
                        const res = await axios.put(`/carts/decQty`, {
                          user_id: userId,
                          product_id: cart.product_id,
                          variant: cart.variant,
                          status: "cart",
                        });
                        setState(cart.qty);
                      } catch (error) {}
                    }}
                  ></IndeterminateCheckBoxIcon>
                </Button>
              </Box>
              <Box display="flex" alignItems="center">
                <Typography>{cart.qty}</Typography>
              </Box>
              <Box>
                <Button>
                  <AddBoxIcon
                    color="success"
                    onClick={async () => {
                      try {
                        const res = await axios.put(`/carts/incQty`, {
                          user_id: userId,
                          product_id: cart.product_id,
                          variant: cart.variant,
                          status: "cart",
                        });
                        setState(cart.qty);
                      } catch (error) {}
                    }}
                  ></AddBoxIcon>
                </Button>
              </Box>
            </Box>
            <Box
              width="20%"
              variant="h6"
              display="flex"
              justifyContent="center"
            >
              <Typography>{cart.variant}</Typography>
            </Box>
            <Box
              width="20%"
              variant="h6"
              display="flex"
              justifyContent="center"
            >
              <Typography>
                Rp {(cart.qty * cart.price).toLocaleString("id")}
              </Typography>
            </Box>
          </Box>
          {index == carts.length - 1 ? (
            <Box
              borderBottom={0}
              borderColor="darkgray"
              paddingBottom="12px"
              mb="20px"
            />
          ) : (
            <Box
              borderBottom={1}
              borderColor="lightgray"
              paddingBottom="12px"
              mb="20px"
            />
          )}
        </Box>
      );
    });
  };

  return (
    <Box
      display="flex"
      justifyContent="space-around"
      minHeight="60vh"
      marginBottom="60px"
    >
      <Paper
        sx={{
          width: "70%",
          backgroundColor: "white",
          marginTop: 10,
          borderRadius: 3,
          boxShadow: 3,
        }}
      >
        <Box display="flex" justifyContent="center">
          <Typography variant="h4" pt={"20px"}>
            Cart
          </Typography>
        </Box>
        <Box
          marginTop="20px"
          justifyContent="space-around"
          borderBottom={1}
          borderColor="darkgray"
          display="flex"
        >
          <Box width="20%" variant="h6" display="flex" justifyContent="center">
            <Typography variant="h6">Product</Typography>
          </Box>
          <Box width="20%" variant="h6" display="flex" justifyContent="center">
            <Typography variant="h6">Price</Typography>
          </Box>
          <Box width="20%" variant="h6" display="flex" justifyContent="center">
            <Typography variant="h6">Quantity</Typography>
          </Box>
          <Box width="20%" variant="h6" display="flex" justifyContent="center">
            <Typography variant="h6">Variant</Typography>
          </Box>{" "}
          <Box width="20%" variant="h6" display="flex" justifyContent="center">
            <Typography variant="h6">Total Price</Typography>
          </Box>
        </Box>
        {carts.length ? (
          renderCarts()
        ) : (
          <Box
            height="70%"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Typography variant="h4">No products in cart!</Typography>
          </Box>
        )}
      </Paper>
      {carts.length ? (
        <Paper
          sx={{
            width: "15%",
            backgroundColor: "white",
            marginTop: 10,
            borderRadius: 3,
            boxShadow: 3,
          }}
        >
          {/* SELECT ADDRESS */}
          <Box p="12px" borderBottom="10px solid #f3f4f5">
            <Typography textAlign="center" variant="h5">
              Shipping Details
            </Typography>
            <Box>
              <Typography variant="h6">Province</Typography>
              <FormControl fullWidth size="small" sx={{ m: "12px 0" }}>
                <InputLabel>Select Province</InputLabel>
                <Select
                  value={selectedProvince}
                  onChange={handleChange}
                  label="Select Province"
                >
                  {provinces.map((province) => (
                    <MenuItem
                      key={province.province_id}
                      value={province.province_id}
                    >
                      {province.province}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <Box>
              <Typography variant="h6">City</Typography>
              <FormControl fullWidth size="small" sx={{ m: "12px 0" }}>
                <InputLabel>Select City</InputLabel>
                <Select
                  value={selectedCity}
                  onChange={handleChangeCity}
                  label="Select City"
                >
                  {cities.map((city) => (
                    <MenuItem key={city.city_id} value={city.city_id}>
                      {city.city_name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <Box>
              <Typography variant="h6">Address Details</Typography>
              <TextField
                required
                sx={{ m: "12px 0" }}
                name="address"
                label="Address Details"
                fullWidth
                size="small"
                variant="outlined"
                onChange={handleChangeAddress}
              />
            </Box>
            <Box>
              <Typography variant="h6">Couriers</Typography>
              <FormControl fullWidth size="small" sx={{ m: "12px 0" }}>
                <InputLabel>Select Couriers</InputLabel>
                <Select
                  value={selectedCourier}
                  onChange={handleChangeCourier}
                  label="Select Courier"
                >
                  <MenuItem key={1} value="jne">
                    JNE
                  </MenuItem>
                  <MenuItem key={2} value="pos">
                    POS-Indonesia
                  </MenuItem>
                  <MenuItem key={3} value="tiki">
                    TIKI
                  </MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box>
              <Typography variant="h6">Service</Typography>
              <FormControl fullWidth size="small" sx={{ m: "12px 0" }}>
                <InputLabel>Select Service</InputLabel>
                <Select
                  value={service.service}
                  onChange={handleChangeService}
                  label="Select Service"
                >
                  {costs.map((cost) => {
                    if (selectedCourier === "pos") {
                      return (
                        <MenuItem key={cost.service} value={cost.service}>
                          {cost.service} | Rp.{cost.cost[0].value} |{" "}
                          {cost.cost[0].etd}
                        </MenuItem>
                      );
                    } else {
                      return (
                        <MenuItem key={cost.service} value={cost.service}>
                          {cost.service} | Rp.{cost.cost[0].value} |{" "}
                          {cost.cost[0].etd} HARI
                        </MenuItem>
                      );
                    }
                  })}
                </Select>
              </FormControl>
            </Box>
          </Box>
          <Box p="10px">
            <Box
              alignContent="center"
              display="flex"
              justifyContent="space-between"
            >
              <Box>
                <Typography mr="12px">Sub Total : </Typography>
                <Typography mr="12px">
                  PPn {priceState.ppnObat * 100}%:
                </Typography>
                <Typography mr="12px">Ongkir : </Typography>
                <Typography mr="12px">Total : </Typography>
              </Box>
              <Box>
                <Typography>
                  Rp {priceState.total.toLocaleString("id")}
                </Typography>

                <Typography>
                  Rp {priceState.tax.toLocaleString("id")}
                </Typography>

                <Typography>Rp {service.cost.toLocaleString("id")}</Typography>
                <Typography>
                  Rp{" "}
                  {(priceState.totalAfterTax + service.cost).toLocaleString(
                    "id"
                  )}
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box display="flex" justifyContent="end">
            <Box px="10px">
              <Button variant="contained" onClick={onCheckoutClick}>
                Checkout
              </Button>
            </Box>
          </Box>
        </Paper>
      ) : null}
    </Box>
  );
}

export default Carts;
