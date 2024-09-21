// import React, { useState } from "react";
// import { Container, Typography, TextField, Button, Box } from "@mui/material";
// import { useNavigate } from "react-router-dom"; // Import useHistory for navigation
// import InputAdornment from "@mui/material/InputAdornment";
// import Visibility from "@mui/icons-material/Visibility";
// import VisibilityOff from "@mui/icons-material/VisibilityOff";
// import IconButton from "@mui/material/IconButton";

// const Login = () => {
//   const styles = {
//     root: {
//       display: "flex",
//       flexDirection: "column",
//       justifyContent: "center",
//       alignItems: "center",
//       height: "100vh",
//       backgroundColor: "#f5f5f5",
//       padding: "16px",
//     },
//     form: {
//       width: "100%",
//       maxWidth: "400px",
//       padding: "16px",
//       backgroundColor: "white",
//       borderRadius: "8px",
//       boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
//     },
//     button: {
//       marginTop: "16px",
//     },
//   };

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [login, setLogin] = useState(false)
//   const [signup, setSignup] = useState(false)
//   const navigate = useNavigate(); // Initialize useHistory

//   const handleChange = (e) => {
//     const { name, value } = e.target; // Destructure name and value
//     if (name === "email") {
//       setEmail(value);
//     } else {
//       setPassword(value);
//     }
//   };

//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   const handleLogin = (e) => {
//     setLogin(true)
//   }

//   const handleSignup = (e) => {
//     setSignup(true)
//   }

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Check credentials
//     if (email === "arya@gmail.com" && password === "123abc") {
//       navigate("/home"); // Navigate to /home on successful login
//     } else {
//       alert("Invalid email or password"); // Alert for invalid credentials
//     }
//   };

//   return (
//     <Container style={styles.root}>
//       <Box component="form" style={styles.form} onSubmit={handleSubmit}>
//         <Box
//           sx={{
//             border: "3px solid red",
//             display: "flex",
//             justifyContent: "space-between",
//           }}
//         >
//           <Button onClick = {handleLogin}>Login</Button>
//           <Button onClick={handleSignup}>Signup</Button>
//         </Box>
//         {login && <Box>
//         <Typography variant="h4" align="center" gutterBottom>
//           Login
//         </Typography>
//         <Typography>Email</Typography>
//         <TextField
//           variant="outlined"
//           fullWidth
//           required
//           margin="normal"
//           name="email"
//           value={email}
//           onChange={handleChange}
//         />

//         <Typography>Password</Typography>

//         <TextField
//           fullWidth
//           id="outlined-adornment-password"
//           type={showPassword ? "text" : "password"}
//           endAdornment={
//             <InputAdornment position="end">
//               <IconButton
//                 aria-label="toggle password visibility"
//                 onClick={togglePasswordVisibility}
//                 edge="end"
//               >
//                 {showPassword ? <VisibilityOff /> : <Visibility />}
//               </IconButton>
//             </InputAdornment>
//           }
//         />

//         <Button
//           type="submit"
//           variant="contained"
//           color="primary"
//           fullWidth
//           style={styles.button}
//         >
//           Login
//         </Button>
//       </Box>}
//       {signup && <Box>
//         <Typography variant="h4" align="center" gutterBottom>
//           Signup
//         </Typography>
//         <Typography>Email</Typography>
//         <TextField
//           variant="outlined"
//           fullWidth
//           required
//           margin="normal"
//           name="email"
//           value={email}
//           onChange={handleChange}
//         />

//         <Typography>Password</Typography>

//         <TextField
//           fullWidth
//           id="outlined-adornment-password"
//           type={showPassword ? "text" : "password"}
//           endAdornment={
//             <InputAdornment position="end">
//               <IconButton
//                 aria-label="toggle password visibility"
//                 onClick={togglePasswordVisibility}
//                 edge="end"
//               >
//                 {showPassword ? <VisibilityOff /> : <Visibility />}
//               </IconButton>
//             </InputAdornment>
//           }
//         />

//         <Button
//           type="submit"
//           variant="contained"
//           color="primary"
//           fullWidth
//           style={styles.button}
//         >
//           Signup
//         </Button>
//       </Box>}
//       </Box>
//     </Container>
//   );
// };

// export default Login;

import React, { useState } from "react";
import { Container, Typography, TextField, Button, Box, InputAdornment, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom"; 
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const Login = () => {
  const styles = {
    root: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      backgroundColor: "#f5f5f5",
      padding: "16px",
    },
    form: {
      width: "100%",
      maxWidth: "400px",
      padding: "16px",
      backgroundColor: "white",
      borderRadius: "8px",
      boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
    },
    button: {
      marginTop: "16px",
    },
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [securityQuestion, setSecurityQuestion] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate(); 

  const handleChange = (e) => {
    const { name, value } = e.target; 
    if (name === "email") setEmail(value);
    else if (name === "password") setPassword(value);
    else if (name === "securityQuestion") setSecurityQuestion(value);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLogin) {
      if (email === "arya@gmail.com" && password === "123abc") {
        navigate("/home"); 
      } else {
        alert("Invalid email or password");
      }
    } else {
      // Signup process
      try {
        const response = await fetch("YOUR_API_ENDPOINT/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password, securityQuestion }),
        });

        if (response.ok) {
          const data = await response.json();
          alert("Signup successful!"); // Handle successful signup
          navigate("/home"); // Optionally navigate to home
        } else {
          const errorData = await response.json();
          alert(`Signup failed: ${errorData.message}`); // Handle errors
        }
      } catch (error) {
        console.error("Error during signup:", error);
        alert("An error occurred during signup.");
      }
    }
  };

  return (
    <Container style={styles.root}>
      <Box component="form" style={styles.form} onSubmit={handleSubmit}>
        <Box display="flex" justifyContent="space-between">
          <Button onClick={() => setIsLogin(true)}>Login</Button>
          <Button onClick={() => setIsLogin(false)}>Signup</Button>
        </Box>
        
        <Typography variant="h4" align="center" gutterBottom>
          {isLogin ? "Login" : "Signup"}
        </Typography>
        
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          required
          margin="normal"
          name="email"
          value={email}
          onChange={handleChange}
        />

        <TextField
          label="Password"
          variant="outlined"
          fullWidth
          required
          margin="normal"
          name="password"
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={handleChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={togglePasswordVisibility}>
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        {!isLogin && (
          <TextField
            label="Security Question"
            variant="outlined"
            fullWidth
            required
            margin="normal"
            name="securityQuestion"
            value={securityQuestion}
            onChange={handleChange}
          />
        )}

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          style={styles.button}
        >
          {isLogin ? "Login" : "Signup"}
        </Button>
      </Box>
    </Container>
  );
};

export default Login;
