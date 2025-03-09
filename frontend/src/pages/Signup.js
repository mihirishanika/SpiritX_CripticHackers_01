import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function Signup() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState("Weak");
    const [passwordCriteria, setPasswordCriteria] = useState({
        lowercase: false,
        uppercase: false,
        specialChar: false,
    });
    const [usernameError, setUsernameError] = useState("");

    const navigate = useNavigate();

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const handlePasswordChange = (e) => {
        const value = e.target.value;
        setPassword(value);

        const hasLowercase = /[a-z]/.test(value);
        const hasUppercase = /[A-Z]/.test(value);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);

        setPasswordCriteria({
            lowercase: hasLowercase,
            uppercase: hasUppercase,
            specialChar: hasSpecialChar,
        });

        // Determine password strength
        if (value.length < 6) {
            setPasswordStrength("Weak");
        } else if (hasLowercase && hasUppercase && hasSpecialChar) {
            setPasswordStrength("Strong");
        } else {
            setPasswordStrength("Medium");
        }
    };

    const handleUsernameChange = async (e) => {
        const value = e.target.value;
        setUsername(value);
    
        // Only validate username if it has 8 or more characters
        if (value.length >= 8) {
            try {
                const response = await axios.post("http://localhost:5000/api/auth/check-username", { username: value });
                if (!response.data.isUnique) {
                    setUsernameError("");
                }
            } catch (err) {
                setUsernameError("Username is already taken.");
            }
        } else {
            setUsernameError("Username must be at least 8 characters.");
        }
    };
    

    const handleSignup = async (e) => {
        e.preventDefault();

        if (!passwordCriteria.lowercase || !passwordCriteria.uppercase || !passwordCriteria.specialChar) {
            setError("Password does not meet the requirements.");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        if (username.length < 8) {
            setError("Username must be at least 8 characters.");
            return;
        }

        try {
            await axios.post("http://localhost:5000/api/auth/signup", { username, password });
            alert("Signup successful!");
            setTimeout(() => navigate("/login"), 2000);
        } catch (err) {
            setError(err.response?.data?.error || "Signup failed.");
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <form onSubmit={handleSignup} className="space-y-4">
                    <div className="flex flex-col">
                        <label htmlFor="username" className="text-sm font-medium text-gray-700">Username</label>
                        <input
                            type="text"
                            id="username"
                            placeholder="Username"
                            value={username}
                            onChange={handleUsernameChange}
                            className="w-full p-2 border rounded"
                            required
                        />
                        {usernameError && <p className="text-red-500 text-sm">{usernameError}</p>}
                    </div>

                    <div className="relative flex flex-col">
                        <label htmlFor="password" className="text-sm font-medium text-gray-700">Password</label>
                        <input
                            type={passwordVisible ? "text" : "password"}
                            id="password"
                            placeholder="Password"
                            value={password}
                            onChange={handlePasswordChange}
                            className="w-full p-2 border rounded"
                            required
                        />
                        <button
                            type="button"
                            className="absolute right-3 top-3 text-gray-600"
                            onClick={togglePasswordVisibility}
                        >
                            {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>

                    <div className="text-sm text-gray-700">
                        <p className="text-red-500">Password must contain:</p>
                        <p className={passwordCriteria.lowercase ? "text-green-500" : "text-gray-500"}>✓ One lowercase letter</p>
                        <p className={passwordCriteria.uppercase ? "text-green-500" : "text-gray-500"}>✓ One uppercase letter</p>
                        <p className={passwordCriteria.specialChar ? "text-green-500" : "text-gray-500"}>✓ One special character</p>
                    </div>

                    <div className="text-sm font-medium mt-2">Password Strength: <span className={passwordStrength === "Weak" ? "text-red-500" : passwordStrength === "Medium" ? "text-yellow-500" : "text-green-500"}>{passwordStrength}</span></div>

                    <div className="flex flex-col">
                        <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">Confirm Password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>

                    <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
                        Sign Up
                    </button>
                </form>
                <p className="mt-4 text-center">
                    Already have an account? <button onClick={() => navigate("/login")} className="text-blue-500 underline">Login</button>
                </p>
            </div>
        </div>
    );
}

export default Signup;