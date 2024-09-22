import React, { useState } from "react";
import { Container, Typography, TextField, Button, Box, InputAdornment, IconButton, Alert } from "@mui/material";
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
  const [message, setMessage] = useState(""); // State for UI message
  const [messageType, setMessageType] = useState("info"); // State for message type (success/error/info)
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

  const checkCredentials = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/userr?email=${email}&password=${password}`);
      if (response.ok) {
        const userData = await response.json();
        return userData.exists; // Return true if user exists
      } else {
        return false; // Return false if user doesn't exist
      }
    } catch (error) {
      console.error("Error checking credentials:", error);
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userExists = await checkCredentials();

    if (isLogin) {
      if (userExists) {
        setMessageType("success");
        setMessage("Login successful, redirecting...");
        setTimeout(() => navigate("/home"), 1500); // Delay navigation for a better user experience
      } else {
        setMessageType("error");
        setMessage("User not found, please sign up.");
        setIsLogin(false); // Automatically switch to signup
      }
    } else {
      // Signup process
      try {
        const response = await fetch("http://localhost:5000/api/userr", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password, securityQuestion }),
        });

        if (response.ok) {
          setMessageType("success");
          setMessage("Signup successful, redirecting...");
          setTimeout(() => navigate("/home"), 1500);
        } else {
          const errorData = await response.json();
          setMessageType("error");
          setMessage(`Signup failed: ${errorData.message}`);
        }
      } catch (error) {
        setMessageType("error");
        setMessage("An error occurred during signup.");
        console.error("Error during signup:", error);
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

        {/* Conditionally render the message */}
        {message && (
          <Alert severity={messageType} style={{ marginBottom: "16px" }}>
            {message}
          </Alert>
        )}

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

