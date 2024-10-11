// import React from "react";
// import { Grid, Typography } from "@mui/material";

// const Footer = () => {
//   <Grid
//     item
//     xs={12}
//     sx={{
//       backgroundColor: "black",
//       padding: 2,
//       borderRadius: "8px",
//       textAlign: "center",
//     }}
//   >
//     <Typography variant="h6" sx={{ color: "white" }}>
//       © 2024 Festival Inc. | All Rights Reserved
//     </Typography>
//   </Grid>;
// };
// export default Footer;


import React from "react";
import { Grid, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Grid
      container
      item
      xs={12}
      sx={{
        backgroundColor: "black",
        borderRadius: "8px",
        textAlign: "center",
        justifyContent: "center", // Centers the content horizontally
        alignItems: "center", // Centers the content vertically
        height: '50px', // Adds height to help center vertically
      }}
    >
      <Typography variant="h6" sx={{ color: "white", textAlign: "center" }}>
        © 2024 Festival Inc. | All Rights Reserved
      </Typography>
    </Grid>
  );
};

export default Footer;