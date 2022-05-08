import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../../utils/axios";
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
  Link,
} from "@mui/material";

function CartsAdmin() {
  const [carts, setCarts] = useState([]);
  const [transactionId, setTransactionId] = useState("");
  const [userId, setUserId] = useState("");
  // table
  const columns = [
    {
      id: "Username",
      label: "Username",
      minWidth: 80,
    },
    { id: "Status", label: "Status", minWidth: 80 },
    {
      id: "Invoice",
      label: "Invoice",
      minWidth: 100,
      align: "center",
      format: (value) => value.toLocaleString("id"),
    },
    {
      id: "Prescription",
      label: "Prescription",
      minWidth: 80,
      align: "center",
    },
  ];

  function createData(Username, Status, Invoice, Prescription, id) {
    return { Username, Status, Invoice, Prescription, id };
  }

  const rows = carts.map((cart) => {
    const { username, status, invoice, prescriptionPhoto, id } = cart;
    const row = createData(username, status, invoice, prescriptionPhoto, id);
    return row;
  });
  const fetchTransactions = async () => {
    try {
      const res = await axios.get(`/carts/admin`);
      setTransactionId(res.data.result[0].transactionId);
      setUserId(res.data.result[0].id);
      setCarts(res.data.result);
    } catch (error) {
      alert(error);
    }
  };
  useEffect(() => {
    fetchTransactions();
  }, []);
  return (
    <Box marginLeft="240px">
      <Box display="flex" justifyContent="space-around">
        <Paper
          sx={{
            width: "65%",
            backgroundColor: "white",
            marginTop: 10,
            borderRadius: 3,
            boxShadow: 3,
          }}
        >
          {carts.length ? (
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
                        key={row.Invoice}
                      >
                        {columns.map((column) => {
                          const value = row[column.id];
                          if (column.id === "Invoice") {
                            return (
                              <TableCell
                                key={column.id}
                                align={column.align}
                                sx={{ fontSize: "24px" }}
                              >
                                <Link
                                  href={`/admin/carts/details/${userId}/${transactionId}`}
                                  underline="hover"
                                  color="inherit"
                                >
                                  {value}
                                </Link>
                              </TableCell>
                            );
                          } else if (column.id === "Prescription") {
                            return (
                              <TableCell key={column.id} align={column.align}>
                                <img style={{ width: "100px" }} src={value} />
                              </TableCell>
                            );
                          } else {
                            return (
                              <TableCell
                                sx={{ fontSize: "24px" }}
                                key={column.id}
                                align={column.align}
                              >
                                {!column.format ? value : column.format(value)}
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
          ) : (
            <Box
              height="80px"
              display="flex"
              alignItems="center"
              justifyContent="center"
              border="solid"
            >
              <Typography textAlign="center" fontSize="24px">
                No carts available...
              </Typography>
            </Box>
          )}
        </Paper>
      </Box>
    </Box>
  );
}

export default CartsAdmin;
