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
      <Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            paddingY: "8px",
            width: "90%",
            marginInline: "auto",
          }}
        >
          <Box
            sx={{
              width: "25%",
              backgroundColor: "#ff5252",
              color: "white",
            }}
          >
            <Box display="flex" justifyContent="center" alignItems="center">
              <PersonIcon fontSize="large" />
              <Box ml="12px">
                <Typography variant="h6" textAlign="center">
                  {data.count}
                </Typography>

                <Typography variant="h6">Total Customer</Typography>
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              width: "25%",
              backgroundColor: "#ff5252",
              color: "white",
            }}
          >
            <Box display="flex" justifyContent="center" alignItems="center">
              <EuroSymbolIcon fontSize="large" />
              <Box ml="12px">
                <Typography variant="h6" textAlign="center">
                  {parseInt(data.revenue).toLocaleString("id")}
                </Typography>
                <Link
                  href="/admin/sales-report/details"
                  underline="hover"
                  color="inherit"
                >
                  <Typography variant="h6">All-Time Revenue</Typography>
                </Link>
              </Box>
            </Box>
          </Box>

          <Box
            sx={{ color: "white", width: "25%", backgroundColor: "#ff5252" }}
          >
            <Box display="flex" justifyContent="center" alignItems="center">
              <BarChartIcon fontSize="large" />
              <Box ml="12px">
                <Typography variant="h6" textAlign="center">
                  {data.sold}
                </Typography>
                <Link
                  href="/admin/sales-report/products"
                  underline="hover"
                  color="inherit"
                >
                  <Typography variant="h6">Products Sold</Typography>
                </Link>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default SalesReport;
