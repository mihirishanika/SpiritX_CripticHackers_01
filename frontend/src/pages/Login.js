import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false); // Loading state
    const navigate = useNavigate();

    useEffect(() => {
        // Check if user is already logged in (based on token)
        if (localStorage.getItem("token")) {
            navigate("/landing");
        }
    }, [navigate]);

    const handleLogin = async (e) => {
        e.preventDefault();

        setIsLoading(true); // Start loading state

        try {
            const response = await axios.post("http://localhost:5000/api/auth/login", { username, password });
            
            // Save token and username to localStorage
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("username", username); // Store username for greeting on landing page
            
            // Clear fields and navigate to landing
            setUsername("");
            setPassword("");
            setIsLoading(false);
            navigate("/landing");
        } catch (err) {
            setIsLoading(false); // Stop loading state
            if (err.response && err.response.data) {
                setError(err.response.data.error);
            } else {
                setError("An error occurred. Please try again.");
            }
        }
    };

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <form onSubmit={handleLogin} className="space-y-4">
                    {/* Username */}
                    <div>
                        <label htmlFor="username" className="block">Username</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={handleUsernameChange}
                            className="w-full p-2 border rounded border-gray-300"
                            required
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label htmlFor="password" className="block">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={handlePasswordChange}
                            className="w-full p-2 border rounded border-gray-300"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                        disabled={isLoading} // Disable button when loading
                    >
                        {isLoading ? "Logging In..." : "Login"}
                    </button>
                </form>
                <p className="mt-4 text-center">
                    Don’t have an account?{" "}
                    <button onClick={() => navigate("/signup")} className="text-blue-500 underline">
                        Signup
                    </button>
                </p>
            </div>
        </div>
    );
}

export default Login;
