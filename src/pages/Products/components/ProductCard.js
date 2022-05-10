import React from "react";
import { Card, CardContent, CardMedia, Typography, Link } from "@mui/material";

import { CardActionArea } from "@mui/material";

function ProductCard(props) {
  const { id, productName, productPhoto, priceStrip, dose, name, isLiquid } =
    props.product;
  const type = isLiquid ? "ml" : "mg";
  return (
    <Link
      href={`/products/${name}/${id}`}
      underline="none"
      sx={{
        margin: "24px",
        boxShadow: "0 3px 8px #aeafaf",
        // width: "15%",
        flex: "0 0 15%",
      }}
    >
      <Card sx={{ height: "240px" }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="160px"
            image={productPhoto}
            alt="Product Photo"
          />
          <CardContent>
            <Typography
              gutterBottom
              variant="h7"
              component="div"
              textAlign="center"
            >
              {productName} {dose}
              {type}
            </Typography>
            <Typography
              variant="h7"
              color="text.secondary"
              component="div"
              textAlign="center"
            >
              Rp {priceStrip.toLocaleString("id")}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  );
}

export default ProductCard;
