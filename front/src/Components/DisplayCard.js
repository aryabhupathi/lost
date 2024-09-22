import React from "react";
import {
  Typography,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
const DisplayCard = ({
    currentItems,
    handleImageClick,
    handleViewMore,}) => {
  return (
    <Grid container spacing={3}>
      <Grid
        item
        size={{ xs: 12, sm: 3 }}
        sx={{
          borderRight: "3px solid red",
          paddingRight: 2,
          marginBottom: 2,
        }}
      >
        <Typography variant="h6">Filter</Typography>
        {/* Add your filter components or fields here */}
      </Grid>
      <Grid item size={{ xs: 12, sm: 9 }}>
        <Grid container spacing={3}>
          {currentItems.map((product) => (
            <Grid item size={{ xs: 12, sm: 4 }} key={product.id}>
              <Card
                sx={{
                  height: "350px",
                  width: "250px",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <CardMedia sx={{ height: 140 }}>
                  <img
                    src={product.images[0]?.imageUrl}
                    alt="Product"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </CardMedia>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" gutterBottom>
                    {product.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      maxHeight: "4.5em",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      lineHeight: "1.5em",
                    }}
                  >
                    {product.address}
                  </Typography>
                </CardContent>
                <CardActions
                  sx={{
                    mt: "auto",
                    borderTop: "2px solid red",
                    justifyContent: "space-between",
                  }}
                >
                  <Button
                    onClick={() =>
                      handleImageClick(
                        product.images[0]?.imageUrl,
                        0,
                        product._id
                      )
                    }
                  >
                    Like
                  </Button>
                  <Button onClick={() => handleViewMore(product._id)}>
                    View More
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};
export default DisplayCard;

