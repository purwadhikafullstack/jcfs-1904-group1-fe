import React from "react";
import { useState, useEffect } from "react";
import {
  Box,
  Typography,
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
  const [state, setState] = useState("stocks");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [pagination, setPagination] = useState({
    offSet: 0,
    count: 0,
  });
  const [queryPagination, setQueryPagination] = useState({
    offSet: 0,
  });

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    if (newPage > page) {
      setQueryPagination({
        ...pagination,
        offSet: pagination.offSet + rowsPerPage,
      });
    } else if (newPage < page) {
      setQueryPagination({
        ...pagination,
        offSet: pagination.offSet - rowsPerPage,
      });
    }
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
    setPage(0);
  };

  const buttonHandler = (e) => {
    setState(e.target.name);
  };

  const fetchLogs = async () => {
    try {
      const res = await axios.get(`/logs`, {
        params: {
          limit: rowsPerPage,
          offSet: queryPagination.offSet,
          state: state,
        },
      });
      const { data, totalCount } = res.data;
      setLogs(data);
      setPagination({ ...queryPagination, count: totalCount[0].total });
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, [rowsPerPage, queryPagination, state]);

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
    <Box ml="240px" display="flex" flexDirection="column">
      <Box
        width="25%"
        marginInline="auto"
        marginTop="38px"
        display="flex"
        justifyContent="space-around"
      >
        <Button
          size="large"
          color="warning"
          variant="contained"
          name="stocks"
          flex="1"
          sx={{ width: "180px", color: "white", backgroundColor: "#ff5252" }}
          onClick={buttonHandler}
          disabled={state === "stocks"}
        >
          Stocks Logs
        </Button>

        <Button
          color="warning"
          variant="contained"
          sx={{ width: "180px", color: "white", backgroundColor: "#ff5252" }}
          size="large"
          name="prescription"
          flex="1"
          onClick={buttonHandler}
          disabled={state === "prescription"}
        >
          Custom Order
        </Button>
      </Box>
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
            {state === "stocks" ? "Stocks Logs" : "Custom Order Logs"}
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
                        row.Description === "New Product" ||
                        row.Description === "Restock"
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
        <TablePagination
          sx={{ backgroundColor: "#d5d5d5" }}
          rowsPerPageOptions={[10, 20]}
          component="div"
          count={pagination.count}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}

export default Stocks;
