// import React, { useState } from 'react';
// import { TextField, Button, Box, Typography, Container } from '@mui/material';

// const Forgot = () => {
//   const [email, setEmail] = useState('');
//   const [newPassword, setNewPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [error, setError] = useState('');

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Validation for password matching
//     if (newPassword !== confirmPassword) {
//       setError("Passwords don't match");
//     } else {
//       setError('');
//       // Handle password reset logic (API call)
//       console.log({ email, newPassword });
//     }
//   };

//   return (
//     <Container maxWidth="sm">
//       <Box
//         component="form"
//         onSubmit={handleSubmit}
//         sx={{ mt: 4, display: 'flex', flexDirection: 'column', gap: 2 }}
//       >
//         <Typography variant="h4" component="h1" align="center" gutterBottom>
//           Reset Password
//         </Typography>

//         <TextField
//           label="Email"
//           variant="outlined"
//           fullWidth
//           required
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />

//         <TextField
//           label="New Password"
//           variant="outlined"
//           type="password"
//           fullWidth
//           required
//           value={newPassword}
//           onChange={(e) => setNewPassword(e.target.value)}
//         />

//         <TextField
//           label="Confirm Password"
//           variant="outlined"
//           type="password"
//           fullWidth
//           required
//           value={confirmPassword}
//           onChange={(e) => setConfirmPassword(e.target.value)}
//         />

//         {error && (
//           <Typography color="error" variant="body2">
//             {error}
//           </Typography>
//         )}

//         <Button variant="contained" color="primary" type="submit" fullWidth>
//           Reset Password
//         </Button>
//       </Box>
//     </Container>
//   );
// };

// export default Forgot;

import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Container, Alert } from '@mui/material';

const Forgot = () => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation for password matching
    if (newPassword !== confirmPassword) {
      setError("Passwords don't match");
      return;
    } else {
      setError('');
    }

    try {
      setLoading(true);
      setMessage('');
      const response = await fetch('http://localhost:5000/api/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          newPassword,
        }),
      });

      if (response.ok) {
        setMessage('Password reset successful.');
      } else {
        const data = await response.json();
        setError(data.message || 'Error resetting password.');
      }
    } catch (err) {
      setError('An error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ mt: 4, display: 'flex', flexDirection: 'column', gap: 2 }}
      >
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          Reset Password
        </Typography>

        {message && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {message}
          </Alert>
        )}

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextField
          label="New Password"
          variant="outlined"
          type="password"
          fullWidth
          required
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />

        <TextField
          label="Confirm Password"
          variant="outlined"
          type="password"
          fullWidth
          required
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <Button
          variant="contained"
          color="primary"
          type="submit"
          fullWidth
          disabled={loading}
        >
          {loading ? 'Resetting Password...' : 'Reset Password'}
        </Button>
      </Box>
    </Container>
  );
};

export default Forgot;

