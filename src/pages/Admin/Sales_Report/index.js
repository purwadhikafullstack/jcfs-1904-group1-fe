import React from "react";
import { useEffect, useState } from "react";
import axios from "../../../utils/axios";
import { Box, Typography, Link } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import BarChartIcon from "@mui/icons-material/BarChart";
import EuroSymbolIcon from "@mui/icons-material/EuroSymbol";

function SalesReport() {
  const [data, setData] = useState({ count: "", revenue: "", sold: "" });
  console.log(data);
  const fetchCustomer = async () => {
    try {
      const res = await axios.get(`/users/count`);
      const response = await axios.get(`/transactions/all-revenue`);

      const { result } = res.data;
      const { results, sold } = response.data;

      setData({
        ...data,
        count: result[0].total,
        revenue: results[0].revenue,
        sold: sold[0].totalSold,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchCustomer();
  }, []);

  return (
    <Box ml="240px" paddingX="12px" mt="8px">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          alignItems: "center",
          paddingY: "8px",
          width: "90%",
          height: "600px",
          marginInline: "auto",
        }}
      >
        <Box
          sx={{
            width: "30%",
            height: "20%",
            backgroundColor: "#ff5252",
            color: "white",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Box display="flex" justifyContent="center" alignItems="center">
            <PersonIcon sx={{ fontSize: "80px" }} />
            <Box ml="12px">
              <Typography variant="h4" textAlign="center">
                {data.count}
              </Typography>
              <Typography variant="h4">Total Customer</Typography>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            width: "30%",
            height: "20%",
            backgroundColor: "#ff5252",
            color: "white",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Box display="flex" justifyContent="center" alignItems="center">
            <EuroSymbolIcon sx={{ fontSize: "80px" }} />
            <Box ml="12px">
              <Typography variant="h4" textAlign="center">
                {parseInt(data.revenue).toLocaleString("id")}
              </Typography>
              <Link
                href="/admin/sales-report/details"
                underline="hover"
                color="inherit"
              >
                <Typography variant="h4">All-Time Revenue</Typography>
              </Link>
            </Box>
          </Box>
        </Box>

        <Box
          sx={{
            color: "white",
            height: "20%",
            width: "30%",
            backgroundColor: "#ff5252",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Box display="flex" justifyContent="center" alignItems="center">
            <BarChartIcon sx={{ fontSize: "80px" }} />
            <Box ml="12px">
              <Typography variant="h4" textAlign="center">
                {data.sold}
              </Typography>
              <Link
                href="/admin/sales-report/products"
                underline="hover"
                color="inherit"
              >
                <Typography variant="h4">Products Sold</Typography>
              </Link>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default SalesReport;
