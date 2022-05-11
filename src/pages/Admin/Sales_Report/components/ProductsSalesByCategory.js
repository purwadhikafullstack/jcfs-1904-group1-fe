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
} from "@mui/material";

function ProductsSalesByCategory(props) {
  const { productSalesCategory } = props;

  const columns = [
    {
      id: "Category",
      label: "Category",
      minWidth: 80,
      align: "center",
    },
    { id: "Sold", label: "Sold", minWidth: 30, align: "center" },
  ];

  function createData(Category, Sold, id) {
    return { Category, Sold, id };
  }

  const rows = productSalesCategory.map((data) => {
    const { name, sold, id } = data;
    const row = createData(name, sold, id);
    return row;
  });

  return (
    <Box>
      <Paper
        elevation={3}
        sx={{
          width: "60%",
          overflow: "hidden",
          boxShadow: "0 1px 12px #aeafaf",
          marginInline: "auto",
        }}
      >
        <TableContainer sx={{ maxHeight: 535 }}>
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

export default ProductsSalesByCategory;
