import React, { useState } from "react";
import { Container, Box, Button, Typography, TextField, Alert, InputAdornment, IconButton, CircularProgress } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Components/AuthContext";

const styles = {
  root: {
    marginTop: "50px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  },
  form: {
    width: "100%",
    maxWidth: "400px",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "8px",
  },
  button: {
    marginTop: "16px",
  },
  forgotPasswordButton: {
    marginTop: "16px",
    textAlign: "center",
  },
};

const LoginPage = () => {
  const { login } = useAuth();
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const [securityQuestion, setSecurityQuestion] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [isLogin, setIsLogin] = useState(true); // Toggle between login and signup
  const [loading, setLoading] = useState(false); // Handle loading state
  const [message, setMessage] = useState(null); // Success/error messages
  const [messageType, setMessageType] = useState("error"); // 'error' or 'success'
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null); // Clear previous messages
    setError(null); // Clear previous errors


    try {
      let response;
      const body = {
        email: emailOrUsername,
        password,
        ...(isLogin ? {} : { security: securityQuestion }), // Include security question only on signup
      };

      const endpoint = isLogin ? "login" : "signup";

      response = await fetch(`http://localhost:5000/api/userr/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      setMessage(isLogin ? "Login successful!" : "Signup successful!");
      setMessageType("success");
      navigate("/home");
    } catch (err) {
      setMessage(err.message);
      setMessageType("error");
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "emailOrUsername") setEmailOrUsername(value);
    if (name === "password") setPassword(value);
    if (name === "securityQuestion") setSecurityQuestion(value);
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev); // Simplified toggle logic
  };

  return (
    <Container style={styles.root}>
      <Box component="form" style={styles.form} onSubmit={handleSubmit}>
        {/* Toggle between Login and Signup */}
        <Box display="flex" justifyContent="space-between" mb={2}>
          <Button
            onClick={() => setIsLogin(true)}
            variant={isLogin ? "contained" : "text"}
          >
            Login
          </Button>
          <Button
            onClick={() => setIsLogin(false)}
            variant={!isLogin ? "contained" : "text"}
          >
            Signup
          </Button>
        </Box>

        <Typography variant="h4" align="center" gutterBottom>
          {isLogin ? "Login" : "Signup"}
        </Typography>

        {/* Display error or success messages */}
        {message && (
          <Alert severity={messageType} style={{ marginBottom: "16px" }}>
            {message}
          </Alert>
        )}

        {/* Username/Email Input */}
        <TextField
          variant="outlined"
          fullWidth
          required
          margin="normal"
          name="emailOrUsername"
          value={emailOrUsername}
          placeholder="Enter Username or Email"
          onChange={handleChange}
        />

        {/* Password Input with show/hide toggle */}
        <TextField
          variant="outlined"
          fullWidth
          required
          margin="normal"
          name="password"
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={handleChange}
          placeholder="Enter Password"
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

        {/* Security Question Input (only show on Signup) */}
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
            placeholder="Enter a security question"
          />
        )}

        {/* Submit Button */}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          style={styles.button}
          disabled={loading}
        >
          {loading ? (
            <CircularProgress size={24} />
          ) : isLogin ? (
            "Login"
          ) : (
            "Signup"
          )}
        </Button>

        {/* Forgot Password link (only show on Login page) */}
        {isLogin && (
          <Box style={styles.forgotPasswordButton}>
            <Button
              variant="text"
              color="primary"
              onClick={() => navigate("/forgot")}
            >
              Forgot Password?
            </Button>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default LoginPage;
