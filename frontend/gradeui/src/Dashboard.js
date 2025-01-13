import React, { useState, useEffect } from "react";
import axios from "axios";
import Logout from "./Logout";

const Dashboard = () => {
    const [user, setUser] = useState('');

    // Function to fetch user data
    const getUser = async () => {
        try {
            const res = await axios.get('http://127.0.0.1:8000/api/dashboard/', {
                headers: {
                    Authorization: `Token ${localStorage.getItem("token")}`, // Include token from local storage
                },
            });
            setUser(res.data.username);
        } catch (err) {
            console.error("Error fetching user data:", err);
        }
    };

    // Fetch user data when the component mounts
    useEffect(() => {
        getUser();
    }, []);

    return (
        <div>
            <h1>Welcome to your dashboard {user}!</h1>
            <Logout />
        </div>
    );
};

export default Dashboard;