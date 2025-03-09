import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";  // Make sure this is imported
import Landing from "./pages/Landing";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />  // Ensure this route exists
                <Route path="/landing" element={<Landing />} />
            </Routes>
        </Router>
    );
}

export default App;
