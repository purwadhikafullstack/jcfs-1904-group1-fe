import React from "react";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import Link from "@mui/material/Link";

function ProductCard(props) {
  const { id, name, productPhoto, price, dose } = props.product;

  return (
    <Link href={`/product/${id}`} underline="none">
      <Card sx={{ maxWidth: 180, margin: "12px 0 32px 46px" }}>
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
              {name} {dose}mg
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