import React, { useState } from "react";
import {
  Typography,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import Filternames from "./Filternames";

const DisplayCard = ({ currentItems, handleImageClick, handleViewMore }) => {
  const [filters, setFilters] = useState({
    community: [],
    height: [],
    weight: [],
    days: [],
    category: [],
    type: [],
  });

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const filteredItems = currentItems.filter((item) => {
    const isCommunityMatch =
      filters.community.length === 0 ||
      filters.community.includes(item.community);

    const isHeightMatch =
      filters.height.length === 0 ||
      filters.height.some(
        ([min, max]) => item.height >= min && item.height <= max
      );

    const isWeightMatch =
      filters.weight.length === 0 ||
      filters.weight.some(
        ([min, max]) => item.weight >= min && item.weight <= max
      );

    const isDaysMatch =
      filters.days.length === 0 ||
      filters.days.some(([min, max]) => item.days >= min && item.days <= max);

    const isCategoryMatch =
      filters.category.length === 0 || filters.category.includes(item.category);
    const isTypeMatch =
      filters.type.length === 0 || filters.type.includes(item.type);

    return (
      isCommunityMatch &&
      isHeightMatch &&
      isWeightMatch &&
      isDaysMatch &&
      isCategoryMatch &&
      isTypeMatch
    );
  });

  return (
    <Grid container spacing={3}>
      <Grid
        item
        size={{ xs: 12, md: 3 }}
        xs={12}
        md={3}
        sx={{
          borderRight: { xs: "none", md: "3px solid red" },
          paddingRight: { xs: 0, md: 2 },
          marginBottom: 2,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography variant="h6" align="center">
          Filter
        </Typography>
        <Filternames onFilterChange={handleFilterChange} />
      </Grid>

      <Grid item size={{ xs: 12, md: 9 }}>
        <Grid container spacing={4}  sx = {{display:'flex', justifyContent:'center'}}>
          {filteredItems.map((product) => (
            <Grid item size={{ xs: 12, sm: 6, md: 6, lg: 4 }} key={product.id}>
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
