import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Landing() {
    const navigate = useNavigate();

    // Redirect if no token is found (user is not authenticated)
    useEffect(() => {
        if (!localStorage.getItem("token")) {
            navigate("/login"); // Navigate to login page if no token
        }
    }, [navigate]);

    const handleLogout = () => {
        // Remove token and username from localStorage
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        navigate("/login"); // Redirect to login page after logout
    };

    const username = localStorage.getItem("username"); // Get the stored username

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <h2 className="text-2xl font-bold mb-4 text-center">
                    Hello, {username || "User"}!
                </h2>
                <button
                    onClick={handleLogout}
                    className="w-full bg-red-500 text-white p-2 rounded hover:bg-red-600"
                >
                    Logout
                </button>
            </div>
        </div>
    );
}

export default Landing;
