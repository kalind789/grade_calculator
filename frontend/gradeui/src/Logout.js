import axios from "axios";
import { useNavigate } from "react-router-dom";

const Logout = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const token = localStorage.getItem("token");

            // Send request to the logout API
            await axios.post('http://127.0.0.1:8000/api/logout/', {}, {
                headers: {
                    Authorization: `Token ${token}`,
                },
            });

            // Clear the token from localStorage
            localStorage.removeItem("token");

            // Redirect to the landing page
            navigate('/');
        } catch (err) {
            console.error("Error during logout:", err);
        }
    };

    return (
        <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded">
            Logout
        </button>
    );
};

export default Logout;