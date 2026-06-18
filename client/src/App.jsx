import Navbar from "./Components/Navbar.jsx";
import Home from "./Pages/Home"
import Login from "./Pages/Login"
import Signup from "./Pages/Signup.jsx";
import { Routes, Route } from "react-router-dom"
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App(){
  return(
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/Navbar" element={<Navbar/>}/>
        <Route path="/signup" element={<Signup/>}/>
      </Routes>
      <ToastContainer position="top-right" autoClose={2000} pauseOnHover theme="colored" />
    </>
  )
}
export default App