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
import ProductsSalesByCategory from "./components/ProductsSalesByCategory";
import ProductsSalesByMonth from "./components/ProductsSalesByMonth";

function ProductsSalesReport() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [transactions, setTransactions] = useState([]);
  const [products, setProducts] = useState([]);
  const [productSalesCategory, setProductSalesCategory] = useState([]);
  const [productSalesMonthly, setProductSalesMonthly] = useState([]);

  const [pagination, setPagination] = useState({
    offSet: 0,
    count: 0,
  });
  const [queryPagination, setQueryPagination] = useState({
    offSet: 0,
  });
  const init = {
    initMonth: "",
    initYear: "",
    finalMonth: "",
    finalYear: "",
    productName: "",
  };
  const [formState, setFormState] = useState({ init });
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
    setPage(0);
    setQueryPagination({ ...pagination, offSet: 0 });
  };
  const onResetClick = () => {
    window.location.reload();
  };

  const fetchProductsReport = async () => {
    try {
      const res = await axios.get(`/transactions/products-report`, {
        params: {
          limit: rowsPerPage,
          productName: formState.productName,
          initMonth: formState.initMonth,
          initYear: formState.initYear,
          finalMonth: formState.finalMonth,
          finalYear: formState.finalYear,
          offSet: queryPagination.offSet,
        },
      });
      const { data, totalCount, result, products, monthlyData } = res.data;
      setTransactions(data);
      setProducts(products);
      setProductSalesCategory(result);
      setProductSalesMonthly(monthlyData);
      setPagination({ ...queryPagination, count: totalCount[0].total });
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    fetchProductsReport();
  }, [rowsPerPage, queryPagination]);

  // CREATE TABLE
  const columns = [
    {
      id: "Product",
      label: "Product",
      minWidth: 60,
      align: "center",
    },
    { id: "Username", label: "Username", minWidth: 40, align: "center" },
    {
      id: "Qty",
      label: "Qty",
      minWidth: 50,
      align: "center",
    },
    {
      id: "Variant",
      label: "Variant",
      minWidth: 50,
      align: "center",
    },
    {
      id: "Date",
      label: "Date",
      minWidth: 80,
      align: "center",
    },
  ];

  function createData(Product, Username, Qty, Variant, Date, id) {
    return { Product, Username, Qty, Variant, Date, id };
  }

  const rows = transactions.map((transaction) => {
    const { productName, username, qty, variant, date, id } = transaction;
    const row = createData(productName, username, qty, variant, date, id);
    return row;
  });

  return (
    <Box m="48px 0 48px 240px" display="flex" justifyContent="center">
      <Box flex="2">
        {/* FILTER */}
        <Box
          sx={{
            width: "66%",
            marginInline: "auto",
            backgroundColor: "white",
            borderRadius: "5px",
            boxShadow: "0 1px 12px #aeafaf",
            border: "solid #ff5252",
          }}
        >
          <FormControl size="small" sx={{ m: "10px 4px 0 4px", minWidth: 140 }}>
            <InputLabel id="demo-simple-select-label">Product</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              name="productName"
              value={formState.productName}
              onChange={handleChange}
              label="Product"
            >
              <MenuItem value="">All Products</MenuItem>
              {products.map((product) => {
                return (
                  <MenuItem value={product.productName}>
                    {product.productName}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <Box display="flex" alignItems="center" m="12px 4px 0 4px" pb="10px">
            <FormControl size="small" sx={{ mr: "4px", minWidth: 130 }}>
              <InputLabel id="demo-simple-select-label">Month</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name="initMonth"
                value={formState.initMonth}
                onChange={handleChange}
                label="Month"
              >
                <MenuItem value="">Default</MenuItem>
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
            <FormControl size="small" sx={{ minWidth: 90 }}>
              <InputLabel id="demo-simple-select-label">Year</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name="initYear"
                value={formState.initYear}
                onChange={handleChange}
                label="Year"
              >
                <MenuItem value="">Default</MenuItem>
                <MenuItem value="2021">2021</MenuItem>
                <MenuItem value="2022">2022</MenuItem>
              </Select>
            </FormControl>
            <Typography fontSize="18px" marginInline="12px">
              -
            </Typography>
            <FormControl size="small" sx={{ mr: "4px", minWidth: 130 }}>
              <InputLabel id="demo-simple-select-label">Month</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name="finalMonth"
                value={formState.finalMonth}
                onChange={handleChange}
                label="Month"
              >
                <MenuItem value="">Default</MenuItem>
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
            <FormControl size="small" sx={{ minWidth: 90 }}>
              <InputLabel id="demo-simple-select-label">Year</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                value={formState.finalYear}
                id="demo-simple-select"
                name="finalYear"
                onChange={handleChange}
                label="Year"
              >
                <MenuItem value="">Default</MenuItem>
                <MenuItem value="2021">2021</MenuItem>
                <MenuItem value="2022">2022</MenuItem>
              </Select>
            </FormControl>
            <Box mt="-32px">
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
                    mb: "8px",
                  }}
                >
                  APPLY
                </Button>
              </Box>
              <Box ml="24px">
                <Button
                  variant="contained"
                  size="small"
                  color="warning"
                  onClick={onResetClick}
                  sx={{
                    width: "120px",
                    color: "white",
                    backgroundColor: "#ff5252",
                  }}
                >
                  RESET
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>

        {/* TABLE PRODUCTS SALES */}
        <ProductsSalesByMonth productSalesMonthly={productSalesMonthly} />

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
              Daily Products Sold
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
                      key={row.Invoice}
                    >
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
          <TablePagination
            sx={{ backgroundColor: "#d5d5d5" }}
            rowsPerPageOptions={[5, 10, 20]}
            component="div"
            count={pagination.count}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Box>
      <Box flex="1">
        <ProductsSalesByCategory productSalesCategory={productSalesCategory} />
      </Box>
    </Box>
  );
}

export default ProductsSalesReport;
