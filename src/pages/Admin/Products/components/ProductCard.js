import React from "react";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import Link from "@mui/material/Link";

function ProductCard(props) {
  const { id, productName, productPhoto, priceStrip, dose, name, isLiquid } =
    props.product;
  const type = isLiquid ? "ml" : "mg";
  return (
    <Link
      href={`/admin/products/${name}/${id}`}
      underline="none"
      sx={{ margin: "24px" }}
    >
      <Card sx={{ maxWidth: 160, height: 240 }}>
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
