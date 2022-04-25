import React from "react";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

function ProductsSalesByMonth(props) {
  const { productSalesMonthly } = props;
  const columns = [
    {
      id: "Product",
      label: "Product",
      minWidth: 80,
      align: "center",
    },
    { id: "Sold", label: "Sold", minWidth: 30, align: "center" },
    { id: "Variant", label: "Variant", minWidth: 30, align: "center" },
    { id: "Date", label: "Date", minWidth: 30, align: "center" },
  ];

  function createData(Product, Sold, Variant, Date, id) {
    return { Product, Sold, Variant, Date, id };
  }

  const rows = productSalesMonthly.map((data) => {
    const { productName, sold, variant, date, id } = data;
    const row = createData(productName, sold, variant, date, id);
    return row;
  });

  return (
    <Box>
      <Paper
        elevation={3}
        sx={{
          width: "85%",
          marginTop: "48px",
          overflow: "hidden",
          boxShadow: "0 1px 12px #aeafaf",
          marginInline: "auto",
        }}
      >
        <Box sx={{ backgroundColor: "#d5d5d5" }}>
          <Typography
            variant="h5"
            sx={{
              p: "12px 0",
              textAlign: "center",
              fontWeight: "600",
              color: "maroon",
            }}
          >
            Monthly Products Sold
          </Typography>
        </Box>
        <TableContainer sx={{ maxHeight: 320 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    sx={{ backgroundColor: "#d5d5d5" }}
                    key={column.id}
                    style={{ minWidth: column.minWidth }}
                    align={column.align}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}

export default ProductsSalesByMonth;
