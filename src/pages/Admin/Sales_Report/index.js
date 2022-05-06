import React from "react";
import { Box, Typography, Link } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import BarChartIcon from "@mui/icons-material/BarChart";
import EuroSymbolIcon from "@mui/icons-material/EuroSymbol";

function SalesReport() {
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
                <Typography variant="h6">120</Typography>

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
                <Typography variant="h6">28472912</Typography>
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
                <Typography variant="h6">784</Typography>
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
