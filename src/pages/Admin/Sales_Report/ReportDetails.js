import React from "react";
import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Link,
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
} from "@mui/material";
import TextField from "@mui/material/TextField";

import axios from "../../../utils/axios";
import LineChart from "./components/LineChart";

function ReportDetails() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [transactions, setTransactions] = useState([]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const fetchTransactions = async () => {
    try {
      const res = await axios.get(`/transactions/revenue`, {
        params: {
          limit: rowsPerPage,
        },
      });

      const { data, revByMonth } = res.data;
      setTransactions(data);
      console.log(revByMonth);
      setChartData({
        ...chartData,
        labels: revByMonth.map((data) => data.month),
        datasets: [
          {
            label: "Amount",
            data: revByMonth.map((data) => data.amount),
            backgroundColor: ["#ff5252"],
            borderColor: "#ff5252",
            borderWidth: 2,
            pointBorderColor: "black",
          },
        ],
      });
    } catch (error) {
      console.log(alert(error.message));
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [rowsPerPage]);

  const [chartData, setChartData] = useState({
    labels: "",
    datasets: [],
  });

  // CREATE TABLE
  const columns = [
    {
      id: "Invoice",
      label: "Invoice",
      minWidth: 80,
    },
    { id: "Username", label: "Username", minWidth: 80 },
    {
      id: "Amount",
      label: "Amount",
      minWidth: 100,
      align: "center",
      format: (value) => value.toLocaleString("id"),
    },
    {
      id: "Date",
      label: "Date",
      minWidth: 80,
      align: "center",
    },
  ];

  function createData(Invoice, Username, Amount, Date, id) {
    return { Invoice, Username, Amount, Date, id };
  }

  const rows = transactions.map((transaction) => {
    const { invoice, username, amount, date, id } = transaction;
    const row = createData(invoice, username, amount, date, id);
    return row;
  });

  return (
    <Box ml="240px" display="flex" justifyContent="center">
      <Paper
        elevation={3}
        sx={{ width: "80%", padding: "24px 0", borderRadius: "12px" }}
      >
        <Box m="24px 40px">
          <Typography variant="h4">Revenue</Typography>
        </Box>

        {/* FILTER */}
        <Box ml="40px">
          <Typography>Filter</Typography>
          <Box display="flex" alignItems="center">
            <FormControl size="small" sx={{ m: "2px 0", minWidth: 90 }}>
              <InputLabel id="demo-simple-select-label">Month</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                disableUnderline
                name="initMonth"
                // onChange={sortHandler}
                label="Month"
              >
                <MenuItem value={1}>January</MenuItem>
                <MenuItem value={2}>February</MenuItem>
                <MenuItem value={3}>March</MenuItem>
                <MenuItem value={4}>April</MenuItem>
                <MenuItem value={5}>May</MenuItem>
                <MenuItem value={6}>June</MenuItem>
                <MenuItem value={7}>July</MenuItem>
                <MenuItem value={8}>August</MenuItem>
                <MenuItem value={9}>September</MenuItem>
                <MenuItem value={10}>October</MenuItem>
                <MenuItem value={11}>November</MenuItem>
                <MenuItem value={12}>December</MenuItem>
              </Select>
            </FormControl>
            <FormControl size="small" sx={{ m: "2px 0", minWidth: 80 }}>
              <InputLabel id="demo-simple-select-label">Year</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                disableUnderline
                name="initYear"
                // onChange={sortHandler}
                label="Year"
              >
                <MenuItem value={2021}>2021</MenuItem>
                <MenuItem value={2022}>2022</MenuItem>
              </Select>
            </FormControl>
            <Typography fontSize="18px" marginInline="12px">
              To
            </Typography>
            <FormControl size="small" sx={{ m: "2px 0", minWidth: 90 }}>
              <InputLabel id="demo-simple-select-label">Month</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                disableUnderline
                name="finalMonth"
                // onChange={sortHandler}
                label="Month"
              >
                <MenuItem value={1}>January</MenuItem>
                <MenuItem value={2}>February</MenuItem>
                <MenuItem value={3}>March</MenuItem>
                <MenuItem value={4}>April</MenuItem>
                <MenuItem value={5}>May</MenuItem>
                <MenuItem value={6}>June</MenuItem>
                <MenuItem value={7}>July</MenuItem>
                <MenuItem value={8}>August</MenuItem>
                <MenuItem value={9}>September</MenuItem>
                <MenuItem value={10}>October</MenuItem>
                <MenuItem value={11}>November</MenuItem>
                <MenuItem value={12}>December</MenuItem>
              </Select>
            </FormControl>
            <FormControl size="small" sx={{ m: "2px 0", minWidth: 80 }}>
              <InputLabel id="demo-simple-select-label">Year</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                disableUnderline
                name="finalYear"
                // onChange={sortHandler}
                label="Year"
              >
                <MenuItem value={2021}>2021</MenuItem>
                <MenuItem value={2022}>2022</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>

        {/* CHART */}
        <Box
          sx={{
            width: 650,
            border: "2px solid black",
            borderRadius: "12px",
            margin: "24px auto",
            padding: "24px",
          }}
        >
          <Box>
            <Typography align="center" variant="h5">
              TITLE
            </Typography>
          </Box>
          <LineChart chartData={chartData} />
          <Box>
            <Typography variant="h6">Total Revenue : xxxxx</Typography>
          </Box>
        </Box>

        {/* TABLE */}
        <Paper sx={{ width: "90%", overflow: "hidden", marginInline: "auto" }}>
          <TableContainer>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
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
                            <TableCell key={column.id} align={column.align}>
                              <Link
                                href={`/transactions/details/${row.id}`}
                                underline="hover"
                                color="inherit"
                              >
                                {value}
                              </Link>
                            </TableCell>
                          );
                        } else {
                          return (
                            <TableCell key={column.id} align={column.align}>
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
          <TablePagination
            rowsPerPageOptions={[5, 10, 20]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
        <Box display="flex" justifyContent="flex-end" m="24px">
          {/* <Box>
            <Typography>Total Revenue</Typography>
          </Box> */}
        </Box>
      </Paper>
    </Box>
  );
}
export default ReportDetails;
