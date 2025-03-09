import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <div>
            <h2>Welcome to SecureConnect!</h2>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
}

export default Home;
