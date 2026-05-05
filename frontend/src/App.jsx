import { useState,useEffect} from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Signup from "./pages/Signup";
import AdminSignup from "./pages/AdminSignup";

function App() {
  const [user, setUser] = useState(null);
useEffect(() => {
  const storedUser = localStorage.getItem("user");
  if (storedUser) setUser(JSON.parse(storedUser));
}, []);
  return (
    <BrowserRouter>
      <Routes>
        {/* If user is logged in, go to dashboard; otherwise show login */}
       <Route path="/" element={user ? <Dashboard user={user} /> : <Navigate to="/login" />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin-signup" element={<AdminSignup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;