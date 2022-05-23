import React, { useEffect, useState } from "react";
import axios from "../../utils/axios";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Button,
  Link,
} from "@mui/material";
import { useSelector } from "react-redux";
import SearchBar from "./components/SearchBar";

function Transactions() {
  const userId = useSelector((state) => state.auth.id);
  const [page, setPage] = useState(0);
  const [state, setState] = useState({ status: "waiting payment" });
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [transactions, setTransactions] = useState([]);
  const [isClicked, setIsClicked] = useState("");

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

  const handleGetChildData = (data, isClicked) => {
    setTransactions(data);
    setIsClicked(isClicked);
    console.log(isClicked);
  };

  const buttonWPHandler = (e) => {
    setState({ ...state, status: e.target.name });
    setIsClicked(false);
  };

  // table
  const columns = [
    {
      id: "Invoice",
      label: "Invoice",
      minWidth: 80,
    },
    { id: "Status", label: "Status", minWidth: 80 },
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

  function createData(Invoice, Status, Amount, Date, id, isByPrescription) {
    return { Invoice, Status, Amount, Date, id, isByPrescription };
  }

  const rows = transactions.map((transaction) => {
    const { invoice, status, amount, date, id, isByPrescription } = transaction;
    const row = createData(invoice, status, amount, date, id, isByPrescription);
    return row;
  });

  const fetchTransactions = async () => {
    try {
      const res = await axios.get(`/transactions/${userId}`, {
        params: {
          status: state.status,
          limit: rowsPerPage,
          offset: queryPagination.offSet,
        },
      });

      const { total } = res.data;
      setTransactions(res.data.dataDate);
      setPagination({ ...queryPagination, count: total });
    } catch (error) {
      alert(error);
    }
  };
  useEffect(() => {
    fetchTransactions();
  }, [rowsPerPage, queryPagination, state]);

  return (
    <Box
      display="flex"
      justifyContent="space-around"
      marginBottom="60px"
      minHeight="60vh"
    >
      <Paper
        sx={{
          width: "70%",
          height: "100%",
          backgroundColor: "white",
          marginTop: 10,
          borderRadius: 3,
          boxShadow: 3,
        }}
      >
        <SearchBar
          userId={userId}
          handleGetChildData={handleGetChildData}
          status={state.status}
        />
        <Box display="flex" justifyContent="center" border="solid">
          <Button name="waiting payment" flex="1" onClick={buttonWPHandler}>
            waiting payment
          </Button>
          <Button
            name="waiting confirmation"
            flex="1"
            onClick={buttonWPHandler}
          >
            waiting confirmation
          </Button>
          <Button name="on process" flex="1" onClick={buttonWPHandler}>
            on process
          </Button>
          <Button name="sending" flex="1" onClick={buttonWPHandler}>
            sending
          </Button>
          <Button name="complete" flex="1" onClick={buttonWPHandler}>
            complete
          </Button>
          <Button name="reject" flex="1" onClick={buttonWPHandler}>
            reject
          </Button>
          <Button name="custom" flex="1" onClick={buttonWPHandler}>
            custom
          </Button>
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
                    key={row.Invoice}
                  >
                    {columns.map((column) => {
                      const value = row[column.id];
                      if (column.id === "Invoice") {
                        return (
                          <TableCell key={column.id} align={column.align}>
                            <Link
                              href={
                                row.Status === "custom"
                                  ? `/transactions/details/custom/${row.id}`
                                  : `/transactions/details/${row.id}`
                                // `/transactions/details/${row.id}`
                              }
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
        {isClicked ? null : (
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
        )}
      </Paper>
    </Box>
  );
}

export default Transactions;
