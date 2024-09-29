// import React, { useState, useEffect } from "react";
// import {
//   Container,
//   Typography,
//   TextField,
//   Button,
//   Box,
//   InputAdornment,
//   IconButton,
//   Alert,
// } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import Visibility from "@mui/icons-material/Visibility";
// import VisibilityOff from "@mui/icons-material/VisibilityOff";
// import { useAuth } from "../App";

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
//   const [securityQuestion, setSecurityQuestion] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [isLogin, setIsLogin] = useState(true);
//   const [message, setMessage] = useState("");
//   const [messageType, setMessageType] = useState("info");
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();
//   const { settok } = useAuth();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     console.log(`Changed ${name}: ${value}`); // Log the field name and value
//     if (name === "email") setEmail(value);
//     else if (name === "password") setPassword(value);
//     else if (name === "securityQuestion") setSecurityQuestion(value);
//   };

//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   const checkCredentials = async () => {
//     try {
//       console.log("Checking credentials for:", email); // Log email being checked
//       const response = await fetch(
//         `http://localhost:5000/api/userr?email=${email}`
//       );
//       if (response.ok) {
//         const userData = await response.json();
//         console.log("User data fetched:", userData); // Log user data
//         const user = userData.find((user) => user.email === email);
//         if (user) {
//           console.log("User found:", user); // Log found user
//           return { exists: true, passwordMatch: user.password === password };
//         }
//         return { exists: false, passwordMatch: false };
//       }
//       return { exists: false, passwordMatch: false };
//     } catch (error) {
//       console.error("Error checking credentials:", error);
//       return { exists: false, passwordMatch: false };
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true); // Set loading to true

//     if (isLogin) {
//       console.log("Attempting login..."); // Log login attempt
//       const { exists, passwordMatch } = await checkCredentials();
//       console.log("Credentials check result:", { exists, passwordMatch }); // Log results

//       if (exists && passwordMatch) {
//         console.log("Login successful for:", email); // Log successful login
//         settok(email); // Update context
//         setMessageType("success");
//         setMessage("Login successful, redirecting...");
//         setTimeout(() => navigate("/home"), 1500);
//       } else {
//         setMessageType("error");
//         setMessage(
//           exists ? "Incorrect password." : "Email not found. Please sign up."
//         );
//         if (!exists) setIsLogin(false);
//       }
//     } else {
//       console.log("Attempting signup..."); // Log signup attempt
//       try {
//         const response = await fetch("http://localhost:5000/api/userr", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ email, password, securityQuestion }),
//         });
//         if (response.ok) {
//           console.log("Signup successful for:", email); // Log successful signup
//           setMessageType("success");
//           setMessage("Signup successful, redirecting...");
//           setTimeout(() => navigate("/home"), 1500);
//         } else {
//           const errorData = await response.json();
//           setMessageType("error");
//           setMessage(`Signup failed: ${errorData.message}`);
//           console.log("Signup error:", errorData.message); // Log signup error
//         }
//       } catch (error) {
//         setMessageType("error");
//         setMessage("An error occurred during signup.");
//         console.error("Error during signup:", error);
//       }
//     }
//     setLoading(false); // Reset loading
//   };

//   useEffect(() => {
//     return () => {
//       setEmail("");
//       setPassword("");
//       setSecurityQuestion("");
//       setMessage("");
//       setMessageType("info");
//     };
//   }, [isLogin]);

//   return (
//     <Container style={styles.root}>
//       <Box component="form" style={styles.form} onSubmit={handleSubmit}>
//         <Box display="flex" justifyContent="space-between">
//           <Button onClick={() => setIsLogin(true)}>Login</Button>
//           <Button onClick={() => setIsLogin(false)}>Signup</Button>
//         </Box>

//         <Typography variant="h4" align="center" gutterBottom>
//           {isLogin ? "Login" : "Signup"}
//         </Typography>

//         {message && (
//           <Alert severity={messageType} style={{ marginBottom: "16px" }}>
//             {message}
//           </Alert>
//         )}

//         <TextField
//           variant="outlined"
//           fullWidth
//           required
//           margin="normal"
//           name="email"
//           value={email}
//           placeholder="enter Email"
//           onChange={handleChange}
//         />

//         <TextField
//           variant="outlined"
//           fullWidth
//           required
//           margin="normal"
//           name="password"
//           type={showPassword ? "text" : "password"}
//           value={password}
//           onChange={handleChange}
//           placeholder="enter Password"
//           InputProps={{
//             endAdornment: (
//               <InputAdornment position="end">
//                 <IconButton onClick={togglePasswordVisibility}>
//                   {showPassword ? <VisibilityOff /> : <Visibility />}
//                 </IconButton>
//               </InputAdornment>
//             ),
//           }}
//         />

//         {!isLogin && (
//           <TextField
//             label="Security Question"
//             variant="outlined"
//             fullWidth
//             required
//             margin="normal"
//             name="securityQuestion"
//             value={securityQuestion}
//             onChange={handleChange}
//           />
//         )}

//         <Button
//           type="submit"
//           variant="contained"
//           color="primary"
//           fullWidth
//           style={styles.button}
//           disabled={loading}
//         >
//           {loading ? "Loading..." : isLogin ? "Login" : "Signup"}
//         </Button>

//       </Box>
//     </Container>
//   );
// };

// export default Login;

import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  InputAdornment,
  IconButton,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useAuth } from "../App";

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
    forgotPasswordButton: {
      marginTop: "10px",
      textAlign: "center",
    },
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [securityQuestion, setSecurityQuestion] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("info");
  const [loading, setLoading] = useState(false);
  const [loginFailed, setLoginFailed] = useState(false); // Track login failure
  const navigate = useNavigate();
  const { settok } = useAuth();

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
      const response = await fetch(
        `http://localhost:5000/api/userr?email=${email}`
      );
      if (response.ok) {
        const userData = await response.json();
        const user = userData.find((user) => user.email === email);
        if (user) {
          return { exists: true, passwordMatch: user.password === password };
        }
        return { exists: false, passwordMatch: false };
      }
      return { exists: false, passwordMatch: false };
    } catch (error) {
      return { exists: false, passwordMatch: false };
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (isLogin) {
      const { exists, passwordMatch } = await checkCredentials();

      if (exists && passwordMatch) {
        settok(email);
        setMessageType("success");
        setMessage("Login successful, redirecting...");
        setTimeout(() => navigate("/home"), 1500);
      } else {
        setMessageType("error");
        setMessage(
          exists ? "Incorrect password." : "Email not found. Please sign up."
        );
        setLoginFailed(true); // Set login failed to true on failure
      }
    } else {
      try {
        const response = await fetch("http://localhost:5000/api/userr", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
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
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    setEmail("");
    setPassword("");
    setSecurityQuestion("");
    setMessage("");
    setMessageType("info");
    setLoginFailed(false); // Reset login failed on toggle between login/signup
  }, [isLogin]);

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

        {message && (
          <Alert severity={messageType} style={{ marginBottom: "16px" }}>
            {message}
          </Alert>
        )}

        <TextField
          variant="outlined"
          fullWidth
          required
          margin="normal"
          name="email"
          value={email}
          placeholder="Enter Email"
          onChange={handleChange}
        />

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
          disabled={loading}
        >
          {loading ? "Loading..." : isLogin ? "Login" : "Signup"}
        </Button>

        {/* Show Forgot Password button if login failed */}
        {loginFailed && isLogin && (
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

export default Login;

