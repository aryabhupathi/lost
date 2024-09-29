// import './App.css';
// import { useContext, createContext, useState } from 'react';
// import { Routes, Route } from "react-router-dom";
// import Navbar from './Navbar/Navbar';
// import Home from './Home/Home';
// import Product from './Product/Product';
// import About from './About/About';
// import Login from './Login/Login';
// import Learn from './Learn/Learn';
// const AuthContext = createContext();

// export const useAuth = () => useContext(AuthContext);
// const App =() => {

//   const [tok, settok] = useState("");
  
//   return (
//     <AuthContext.Provider value={{ tok }}>

//       <Navbar/>
//       <Routes>
//       <Route path="/login" element={<Login />} />
//         <Route path="/home" element={<Home />} />
//         <Route path="/product" element={<Product />} />
//         <Route path="/product/:id" element={<Learn />} />
//         <Route path="/about" element={<About />} />
//       </Routes>
//     </AuthContext.Provider>
//   );
// }

// export default App;

import './App.css';
import { useContext, createContext, useState } from 'react';
import { Routes, Route } from "react-router-dom";
import Navbar from './Navbar/Navbar';
import Home from './Home/Home';
import Product from './Product/Product';
import About from './About/About';
import Login from './Login/Login';
import Learn from './Learn/Learn';
import Forgot from './Components/Forgot';
const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

const App = () => {
  const [tok, settok] = useState("");
  
  return (
    <AuthContext.Provider value={{ tok, settok }}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/product" element={<Product />} />
        <Route path="/product/:id" element={<Learn />} />
        <Route path="/about" element={<About />} />
        <Route path="/forgot" element={<Forgot />} />
      </Routes>
    </AuthContext.Provider>
  );
}

export default App;
