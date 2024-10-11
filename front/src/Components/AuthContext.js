// import React, { createContext, useState, useContext } from 'react';
// import { useNavigate } from 'react-router-dom';

// const AuthContext = createContext();
// export const useAuth = () => useContext(AuthContext);

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const navigate = useNavigate(); // Import the useNavigate hook

//   const login = (user, password) => {
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

  const login = (user, password) => {
    console.log("Attempting login with", { user, password });
    if (user === '123abc' && password === '123abc') {
      setUser({ user });
      console.log("Login successful for", user);
      navigate('/home');
    } else {
      console.error('Login failed: Invalid credentials');
      throw new Error('Invalid credentials');
    }
  };

  const logout = () => {
    console.log("Logging out", user);
    setUser(null);
    navigate('/login');
  };

  const iscated = !!user;
  console.log("isAuthenticated:", iscated);

  return (
    <AuthContext.Provider value={{ user, login, logout, iscated }}>
      {children}
    </AuthContext.Provider>
  );
};

