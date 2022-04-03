import React from "react";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import Link from "@mui/material/Link";

function ProductCard(props) {
  const { id, productName, productPhoto, price, dose, name } = props.product;
  return (
    <Link
      href={`/products/${name}/${id}`}
      underline="none"
      sx={{ margin: "12px 0 32px 46px" }}
    >
      <Card sx={{ maxWidth: 180 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="160"
            image={productPhoto}
            alt="green iguana"
          />
          <CardContent>
            <Typography
              gutterBottom
              variant="h7"
              component="div"
              textAlign="center"
            >
              {productName} {dose}mg
            </Typography>
            <Typography
              variant="h7"
              color="text.secondary"
              component="div"
              textAlign="center"
            >
              Rp {price}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  );
}

export default ProductCard;
