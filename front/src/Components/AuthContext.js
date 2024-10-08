// import React, { createContext, useState, useContext } from 'react';
// import { useNavigate } from 'react-router-dom';

// const AuthContext = createContext();
// export const useAuth = () => useContext(AuthContext);

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const navigate = useNavigate(); // Import the useNavigate hook

//   const login = (username, password) => {
//     if (username === 'user' && password === 'password') {
//       setUser({ username });
//       navigate('/home'); // Redirect to home page on successful login
//     } else {
//       throw new Error('Invalid credentials');
//     }
//   };

//   const logout = () => {
//     setUser(null);
//     navigate('/login'); // Redirect to login page on logout
//   };

//   const isAuthenticated = !!user;

//   return (
//     <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };


import React, { createContext, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Updated login function to communicate with backend
  const login = async (username, password) => {
    try {
      const response = await fetch('http://localhost:5000/api/userr/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }), // Send the credentials to backend
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      // If login successful, set the user and redirect
      setUser({ username: data.user.username });
      navigate('/home');
    } catch (error) {
      console.error('Error logging in:', error);
      throw new Error(error.message);
    }
  };

  const logout = () => {
    setUser(null);
    navigate('/login');
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
