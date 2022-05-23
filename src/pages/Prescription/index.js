import React, { useState, useEffect } from "react";
import axios from "../../utils/axios";
import {
  FormControl,
  InputLabel,
  Box,
  Select,
  MenuItem,
  TextField,
  Typography,
  Paper,
  Button,
} from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate, Navigate } from "react-router-dom";

function Prescription() {
  const navigate = useNavigate();
  const userId = useSelector((state) => state.auth.id);
  const [image, setImage] = useState("");
  const [upload, setUpload] = useState("");
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

  const onImageChange = (e) => {
    let newImage = e.target.files[0];
    setUpload(newImage);
    setImage(URL.createObjectURL(newImage));
  };

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
    getProvince();
  }, [state]);
  const onUploadClick = async () => {
    if (
      address === "" ||
      selectedAddress.province === "" ||
      selectedAddress.city === "" ||
      upload === ""
    ) {
      alert("Please complete shipping details");
    } else {
      try {
        const formData = new FormData();

        const d = new Date();
        const date = d.getDate();
        const month = d.getMonth() + 1;
        const year = d.getFullYear();
        const time = d.getTime();
        const details =
          address +
          `. ${selectedAddress.city}` +
          `, ${selectedAddress.province}`;

        formData.append("prescriptionPhoto", upload);
        formData.append(
          "invoice",
          `INV/${userId}/custom/${year}${month}${date}/${time}`
        );
        formData.append("user_id", userId);
        formData.append("address", details);
        formData.append("amount", service.cost);

        const res = await axios.post(
          `/transactions/upload/${userId}`,
          formData
        );
        alert("New Custom Transaction created");
        navigate("/");
      } catch (error) {
        console.log(error);
      }
    }
  };

  if (!userId) {
    return <Navigate to="/" replace />;
  }

  return (
    <Box
      display="flex"
      justifyContent="space-around"
      minHeight="60vh"
      alignItems="center"
      marginBottom="60px"
    >
      <Paper
        display="flex"
        justifyContent="center"
        sx={{
          width: "40%",
          backgroundColor: "white",
          marginTop: 10,
          borderRadius: 3,
          boxShadow: 3,
        }}
      >
        <Box>
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
        </Box>
        <Box>
          <Box display="flex" justifyContent="center" marginTop="20px">
            <Typography>Please upload prescription photo below.</Typography>
          </Box>
          <Box display="flex" justifyContent="center">
            <Box
              border="solid #d5d5d5"
              borderRadius="3px"
              marginBottom="20px"
              padding="30px"
            >
              {!image ? null : (
                <img src={image} alt="Prescription Photo" width={320} />
              )}

              <Box marginTop="10px" marginBottom="10px">
                <input type="file" onChange={onImageChange} />
              </Box>
              <Button
                onClick={onUploadClick}
                variant="contained"
                color="success"
              >
                Upload
              </Button>
            </Box>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}

export default Prescription;
