import './App.css';
import { Routes, Route } from "react-router-dom";
import Navbar from './Navbar/Navbar';
import Home from './Home/Home';
import Product from './Product/Product';
import About from './About/About';
// import Login from './Login/Login';
import Learn from './Learn/Learn';
import Forgot from './Components/Forgot';
import EventDetail from './Event/Event';
import { AuthProvider } from './Components/AuthContext'; // Import useAuth from AuthContext
import Footer from './Footer/Footer';
const App = () => {
  return (
    <AuthProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/product" element={<Product />} />
        <Route path="/product/:id" element={<Learn />} />
        <Route path="/about" element={<About />} />
        <Route path="/venue" element={<Product />} />
        <Route path="/venue/:id" element={<Learn />} />
        <Route path="/event/:id" element={<EventDetail />} />
        
        <Route path="/forgot" element={<Forgot />} />
      </Routes>
      <Footer/>
    </AuthProvider>
  );
}

export default App;