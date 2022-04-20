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
  Button,
} from "@mui/material";
import axios from "../../../utils/axios";
import LineChart from "./components/LineChart";

function ReportDetails() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [transactions, setTransactions] = useState([]);
  const [revenue, setRevenue] = useState([]);
  const [pagination, setPagination] = useState({
    offSet: 0,
    count: 0,
  });
  const [queryPagination, setQueryPagination] = useState({
    offSet: 0,
  });
  const [formState, setFormState] = useState({
    initMonth: "",
    initYear: "",
    finalMonth: "",
    finalYear: "",
  });
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

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
  const onApplyClick = () => {
    // fetchTransactions();
    setPage(0);
    setQueryPagination({ ...pagination, offSet: 0 });
  };

  const fetchTransactions = async () => {
    try {
      const res = await axios.get(`/transactions/revenue`, {
        params: {
          limit: rowsPerPage,
          initMonth: formState.initMonth,
          initYear: formState.initYear,
          finalMonth: formState.finalMonth,
          finalYear: formState.finalYear,
          offSet: queryPagination.offSet,
        },
      });

      const { data, dataChart, totalCount } = res.data;
      setTransactions(data);
      setRevenue(dataChart);
      setPagination({ ...queryPagination, count: totalCount[0].total });

      setChartData({
        ...chartData,
        labels: dataChart.map((data) => data.filter),
        datasets: [
          {
            label: "Amount",
            data: dataChart.map((data) => data.amount),
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
  }, [rowsPerPage, queryPagination]);

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

  console.log(formState);
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
          <Box display="flex" alignItems="center" mt="12px">
            <FormControl size="small" sx={{ m: "2px 0", minWidth: 90 }}>
              <InputLabel id="demo-simple-select-label">Month</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name="initMonth"
                value={formState.initMonth}
                onChange={handleChange}
                label="Month"
              >
                <MenuItem value="01">January</MenuItem>
                <MenuItem value="02">February</MenuItem>
                <MenuItem value="03">March</MenuItem>
                <MenuItem value="04">April</MenuItem>
                <MenuItem value="05">May</MenuItem>
                <MenuItem value="06">June</MenuItem>
                <MenuItem value="07">July</MenuItem>
                <MenuItem value="08">August</MenuItem>
                <MenuItem value="09">September</MenuItem>
                <MenuItem value="10">October</MenuItem>
                <MenuItem value="11">November</MenuItem>
                <MenuItem value="12">December</MenuItem>
              </Select>
            </FormControl>
            <FormControl size="small" sx={{ m: "2px 0", minWidth: 80 }}>
              <InputLabel id="demo-simple-select-label">Year</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name="initYear"
                value={formState.initYear}
                onChange={handleChange}
                label="Year"
              >
                <MenuItem value="2021">2021</MenuItem>
                <MenuItem value="2022">2022</MenuItem>
              </Select>
            </FormControl>
            <Typography fontSize="18px" marginInline="12px">
              -
            </Typography>
            <FormControl size="small" sx={{ m: "2px 0", minWidth: 90 }}>
              <InputLabel id="demo-simple-select-label">Month</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name="finalMonth"
                value={formState.finalMonth}
                onChange={handleChange}
                label="Month"
              >
                <MenuItem value="01">January</MenuItem>
                <MenuItem value="02">February</MenuItem>
                <MenuItem value="03">March</MenuItem>
                <MenuItem value="04">April</MenuItem>
                <MenuItem value="05">May</MenuItem>
                <MenuItem value="06">June</MenuItem>
                <MenuItem value="07">July</MenuItem>
                <MenuItem value="08">August</MenuItem>
                <MenuItem value="09">September</MenuItem>
                <MenuItem value="10">October</MenuItem>
                <MenuItem value="11">November</MenuItem>
                <MenuItem value="12">December</MenuItem>
              </Select>
            </FormControl>
            <FormControl size="small" sx={{ m: "2px 0", minWidth: 80 }}>
              <InputLabel id="demo-simple-select-label">Year</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                value={formState.finalYear}
                id="demo-simple-select"
                name="finalYear"
                onChange={handleChange}
                label="Year"
              >
                <MenuItem value="2021">2021</MenuItem>
                <MenuItem value="2022">2022</MenuItem>
              </Select>
            </FormControl>
            <Box ml="24px">
              <Button
                variant="contained"
                size="small"
                color="warning"
                onClick={onApplyClick}
                sx={{
                  width: "120px",
                  color: "white",
                  backgroundColor: "#ff5252",
                }}
              >
                APPLY
              </Button>
            </Box>
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
              Revenue Chart
            </Typography>
          </Box>
          <LineChart chartData={chartData} />
          <Box display="flex">
            <Typography variant="h6" mr="4px">
              Total Revenue :{" "}
            </Typography>
            <Typography variant="h6" fontWeight="bold" color="green">
              Rp{" "}
              {revenue
                .map((data) => data.amount)
                .reduce((a, b) => a + b, 0)
                .toLocaleString("id")}
            </Typography>
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
            count={pagination.count}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
        <Box display="flex" justifyContent="flex-end" m="24px"></Box>
      </Paper>
    </Box>
  );
}
export default ReportDetails;
