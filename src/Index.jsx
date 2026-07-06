import { Routes, Route } from "react-router-dom";
import Signup from "./Project/Signup";
import Login from "./Project/Login";
import Home  from "./Project/Home";

function Index() {
  return (
    <Routes>
      
      <Route index element={<Signup />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<Home/>} />
    </Routes>
  );
}

export default Index;




    