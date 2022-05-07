import React from "react";
import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Select,
  FormControl,
  MenuItem,
  InputLabel,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Button,
} from "@mui/material";
import axios from "../../../utils/axios";

function Stocks() {
  const [logs, setLogs] = useState([]);

  const fetchLogs = async () => {
    try {
      const res = await axios.get(`/logs`);
      const { data } = res;
      setLogs(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  const columns = [
    {
      id: "Product",
      label: "Product",
      minWidth: 60,
    },
    { id: "Username", label: "Username", minWidth: 40 },
    {
      id: "Description",
      label: "Description",
      minWidth: 50,
      align: "center",
    },
    {
      id: "Type",
      label: "Type",
      minWidth: 50,
      align: "center",
    },
    {
      id: "Amount",
      label: "Amount",
      minWidth: 40,
      align: "center",
    },
    {
      id: "current_stock",
      label: "Current Stock",
      minWidth: 40,
      align: "center",
    },
    {
      id: "Date",
      label: "Date",
      minWidth: 80,
      align: "center",
    },
  ];
  function createData(
    Product,
    Username,
    Description,
    Type,
    Amount,
    current_stock,
    Date,
    id
  ) {
    return {
      Product,
      Username,
      Description,
      Type,
      Amount,
      current_stock,
      Date,
      id,
    };
  }

  const rows = logs.map((log) => {
    const {
      productName,
      username,
      description,
      type,
      amount,
      current_stock,
      date,
      id,
    } = log;
    const row = createData(
      productName,
      username,
      description,
      type,
      amount,
      current_stock,
      date,
      id
    );
    return row;
  });

  return (
    <Box ml="240px">
      <Paper
        elevation={3}
        sx={{
          width: "85%",
          overflow: "hidden",
          marginTop: "48px",
          marginInline: "auto",
          boxShadow: "0 1px 12px #aeafaf",
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
            Stocks Log
          </Typography>
        </Box>
        <TableContainer>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    sx={{ backgroundColor: "#d5d5d5" }}
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => {
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={row.id}
                    sx={{ color: "green" }}
                  >
                    {columns.map((column) => {
                      const value = row[column.id];
                      if (
                        row.Description == "New Product" ||
                        row.Description == "Restock"
                      ) {
                        return (
                          <TableCell
                            sx={{ color: "green" }}
                            key={column.id}
                            align={column.align}
                          >
                            {value}
                          </TableCell>
                        );
                      } else {
                        return (
                          <TableCell
                            sx={{ color: "red" }}
                            key={column.id}
                            align={column.align}
                          >
                            {value}
                          </TableCell>
                        );
                      }
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        {/* <TablePagination
          sx={{ backgroundColor: "#d5d5d5" }}
          rowsPerPageOptions={[5, 10, 20]}
          component="div"
          count={pagination.count}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        /> */}
      </Paper>
    </Box>
  );
}

export default Stocks;
