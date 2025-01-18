import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000/api';

export const getAuthHeaders = () => ({
    Authorization: `Token ${localStorage.getItem("token")}`,
});

export const fetchClasses = async () => {
    try {
        const res = await axios.get(`${API_BASE_URL}/classes/`, {
            headers: getAuthHeaders(),
        });
        return res.data;
    } catch (err) {
        console.error("Error fetching classes:", err.response?.data || err);
        throw err;
    }
};

export const addClasses = async ({ class_name, class_semester }) => {
    try {
        const res = await axios.post(
            `${API_BASE_URL}/classes/`,
            { class_name, class_semester },
            { headers: getAuthHeaders() },
        );
        return res.data;
    } catch (err) {
        console.error("Error adding class:", err.response?.data || err.message);
        throw err;
    }
};