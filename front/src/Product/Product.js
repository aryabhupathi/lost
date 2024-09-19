import React, { useState } from "react";
import Grid from "@mui/material/Grid2";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import AddForm from "../Components/AddForm";

const Product = () => {
  const [data, setData] = useState([]);
  const [showadd, setShowadd] = useState(false);

  React.useEffect(() => {
    fetch("http://localhost:5000/api/venue")
      .then((res) => res.json())
      .then((res) => setData(res));
  }, []);

  const navigate = useNavigate();

  const handleViewMore = (id) => {
    navigate(`/product/${id}`); // Navigate to the product details page with the product id
  };

  const handleadd = () => {
    setShowadd(true);
  };
  return (
    <Grid container margin={3} sx={{ display: "flex", flexDirection: "row" }}>
      <Grid onClick={handleadd}>ADD NEW</Grid>
      {showadd ? (
        <AddForm />
      ) : (
        <Grid>
          <Grid
            item
            size={{ xs: 12, sm: 3 }}
            sx={{ borderRight: "3px solid red" }}
          >
            <Typography>Filter</Typography>
          </Grid>
          <Grid item size={{ xs: 12, sm: 9 }}>
            <Grid container spacing={2}>
              {data.map((product) => (
                <Grid item size={{ xs: 12, sm: 4 }} key={product.id}>
                  <Card
                    sx={{
                      width: "200px",
                      height: "200px",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography variant="h6">{product.name}</Typography>
                      <Typography variant="body2" color="text.secondary">
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
                      <Button>Like</Button>
                      <Button onClick={() => handleViewMore(product._id)}>
                        View More
                      </Button>{" "}
                      {/* View More button */}
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      )}
    </Grid>
  );
};

export default Product;
