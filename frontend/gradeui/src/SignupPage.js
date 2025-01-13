import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const SignupPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate(); // For navigation after successful signup

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Clear previous error/success messages
        setError("");
        setSuccess("");

        // Validate passwords match
        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        try {
            // Send POST request to signup endpoint
            const response = await axios.post("http://127.0.0.1:8000/api/signup/", {
                username,
                password,
                password2: confirmPassword, // Match backend field
            });

            if (response.data.message) {
                setSuccess("Signup successful! Redirecting to login...");
                setTimeout(() => navigate("/login"), 2000); // Redirect after 2 seconds
            }
        } catch (err) {
            // Handle API errors
            setError(err.response?.data?.error || "Signup failed. Please try again.");
        }
    };

    return (
        <section className="h-screen flex flex-col md:flex-row justify-center space-y-10 md:space-y-0 md:space-x-16 items-center my-2 mx-5 md:mx-0 md:my-0">
            <div className="md:w-1/3 max-w-sm">
                <div className="my-5 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
                    <p className="mx-4 mb-0 text-center font-semibold text-slate-500">Sign Up</p>
                </div>

                {/* Signup Form */}
                <form onSubmit={handleSubmit}>
                    <input
                        className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded"
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <input
                        className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <input
                        className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />

                    {/* Error Message */}
                    {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

                    {/* Success Message */}
                    {success && <p className="text-green-500 text-sm mt-2">{success}</p>}

                    {/* Submit Button */}
                    <div className="text-center md:text-left">
                        <button
                            className="mt-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 text-white uppercase rounded text-xs tracking-wider"
                            type="submit"
                        >
                            Sign Up
                        </button>
                    </div>
                </form>

                {/* Redirect to Login */}
                <div className="mt-4 font-semibold text-sm text-slate-500 text-center md:text-left">
                    Already have an account?{" "}
                    <Link
                        to="/login"
                        className="text-red-600 hover:underline hover:underline-offset-4"
                    >
                        Log In
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default SignupPage;
