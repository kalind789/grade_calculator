import React, { useState } from "react";
import axios from "axios";

const LandingPage = () => {
    const [message, setMessage] = useState();

    const fetchMessage = async () => {
        try {
            const res = await axios.get('http://127.0.0.1:8000/');
            setMessage(res.data.message);
            console.log(message);
        } catch (err) {
            console.error("Error fetching data:", err);
        }
    };

    fetchMessage()
    return (
        <div className="App">
            <h1>{message}</h1>
        </div>
    );
}

export default LandingPage;