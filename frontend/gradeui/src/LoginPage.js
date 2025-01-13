import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Clear previous messages
        setError('');
        setSuccess('');

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/login/', { username, password });

            if (response.data.message) {
                // Display success message
                setSuccess("Login successful! Redirecting...");
                localStorage.setItem("token", response.data.token);

                // Redirect to dashboard after a short delay
                setTimeout(() => navigate('/dashboard'), 2000);
            } else {
                // Handle errors from the API
                setError(response.data.error || 'Login failed!');
            }
        } catch (err) {
            // Handle network or server errors
            setError("Invalid username or password.");
            console.error(err);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="h-screen flex flex-col md:flex-row justify-center space-y-10 md:space-y-0 md:space-x-16 items-center my-2 mx-5 md:mx-0 md:my-0">
            <div className="md:w-1/3 max-w-sm">
                <div className="my-5 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
                    <p className="mx-4 mb-0 text-center font-semibold text-slate-500">Log In</p>
                </div>

                {/* Display Error Message */}
                {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}

                {/* Display Success Message */}
                {success && <p className="text-green-500 text-sm text-center mb-4">{success}</p>}

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
                <div className="text-center md:text-left">
                    <button
                        className="mt-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 text-white uppercase rounded text-xs tracking-wider"
                        type="submit"
                    >
                        Login
                    </button>
                </div>
                <div className="mt-4 font-semibold text-sm text-slate-500 text-center md:text-left">
                    Don't have an account?{" "}
                    <Link
                        to="/signup"
                        className="text-red-600 hover:underline hover:underline-offset-4"
                    >
                        Register
                    </Link>
                </div>
            </div>
        </form>
    );
};

export default LoginPage;
