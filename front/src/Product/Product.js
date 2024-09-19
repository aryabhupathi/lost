import React, { useState } from "react";
import Grid from "@mui/material/Grid2";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
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
    navigate(`/product/${id}`);
  };

  const handleadd = () => {
    setShowadd(true);
  };

  return (
    <Grid container spacing={2} margin={3} sx={{ display: "flex", flexDirection: "column" }}>
      
      {showadd ? (
        <AddForm />
      ) : (<>
        <Grid item xs={12} sx={{ display: "flex", justifyContent: "flex-end", marginBottom: 2 }}>
        <Button variant="contained" color="primary" onClick={handleadd}>
          ADD NEW
        </Button>
      </Grid>
      <Grid container spacing={2}>
          {/* Left Side - Filter */}
          <Grid
            item size={{xs:12, sm:3}}
            sx={{
              borderRight: "3px solid red",
              paddingRight: 2,
              marginBottom: 2,
            }}
          >
            <Typography variant="h6">Filter</Typography>
            {/* Add your filter components or fields here */}
          </Grid>

          {/* Right Side - Cards */}
          <Grid item size={{xs:12, sm:9}}>
            <Grid container spacing={2}>
              {data.map((product) => (
                <Grid item size={{xs:12, sm:4}} key={product.id}>
                  <Card
                    sx={{
                      width: "100%",
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
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
        </>
      )}
    </Grid>
  );
};

export default Product;
