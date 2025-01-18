import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
    const [message, setMessage] = useState();
    const navigate = useNavigate();

    const goToLogin = () => {
        navigate('/login');
    }
    const goToSignup = () => {
        navigate('/signup');
    }
    const fetchMessage = async () => {
        try {
            const res = await axios.get('http://127.0.0.1:8000/api/landing/');
            setMessage(res.data.message);
            console.log(message);
        } catch (err) {
            console.error("Error fetching data:", err);
        }
    };

    fetchMessage()
    return (
        <div class="container mx-auto flex flex-col justify-center items-center h-screen bg-">
            <div class="flex-col message-div border-black border-2 rounded-md inline-block p-4 bg-blue-200">
                <h1 class="font-serif text-2xl font-bold">{message}</h1>
            </div>
            <div class="buttons-div flex flex-row gap-4 mt-4">
                <button
                    onClick={goToLogin}
                    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >Log In</button>
                <button
                    onClick={goToSignup}
                    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >Sign Up</button>
            </div>
        </div >
    );
}

export default LandingPage;