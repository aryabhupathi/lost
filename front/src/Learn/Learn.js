import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams to get the id from the URL
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

const Learn = () => {
  const { id } = useParams(); // Get the product id from the URL
  const [product, setProduct] = useState(null);
console.log(id, 'iiiiiiiiiiiiiii')
  useEffect(() => {
    // Fetch product details based on id
    fetch(`http://localhost:5000/api/venue/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .catch((error) => console.error('Error fetching product details:', error));
  }, [id]);

  if (!product) {
    return <Typography>Loading...</Typography>; // Loading state while fetching data
  }

  return (
    <Grid container spacing={2} padding={3}>
      <Grid item xs={12}>
        <Typography variant="h4">{product.name}</Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="body1">{product.description}</Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="body2">Address: {product.address}</Typography>
      </Grid>
      {/* Add more details as needed */}
    </Grid>
  );
};

export default Learn;
