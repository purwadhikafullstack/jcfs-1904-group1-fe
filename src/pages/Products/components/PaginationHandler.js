import React from "react";
import { Box } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";

function PaginationHandler(props) {
  const { pagination, setPagination, setQueryPagination } = props;
  const { page, lastPage, offSet, itemsPerPage } = pagination;

  const btnPrevPageHandler = () => {
    setQueryPagination({
      ...pagination,
      page: page - 1,
      offSet: offSet - itemsPerPage,
    });
  };
  const btnNextPageHandler = () => {
    setQueryPagination({
      ...pagination,
      page: page + 1,
      offSet: offSet + itemsPerPage,
    });
  };

  return (
    <Box
      textAlign="right"
      paddingTop="20px"
      paddingRight="40px"
      color="#9FA2B4"
      position="static"
    >
      {page} of {lastPage}
      <IconButton
        disabled={page === 1 ? true : false}
        onClick={btnPrevPageHandler}
      >
        <ArrowBackIosNewOutlinedIcon fontSize="small" />
      </IconButton>
      <IconButton
        disabled={page === lastPage ? true : false}
        onClick={btnNextPageHandler}
      >
        <ArrowForwardIosOutlinedIcon fontSize="small" />
      </IconButton>
    </Box>
  );
}

export default PaginationHandler;
