import './App.css';
import { Routes, Route } from "react-router-dom";
import Navbar from './Navbar/Navbar';
import Home from './Home/Home';
import Product from './Product/Product';
import About from './About/About';
import Login from './Login/Login';
import Learn from './Learn/Learn';
const App =() => {
  return (
    <div>
      <Navbar/>
      <Routes>
      <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/product" element={<Product />} />
        <Route path="/product/:id" element={<Learn />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
}

export default App;
