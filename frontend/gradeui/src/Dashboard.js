import React, { useState, useEffect } from "react";
import { fetchClasses, addClasses, getAuthHeaders } from "./utils/api";
import axios from "axios";
import Logout from "./Logout";

const Dashboard = () => {
    const [user, setUser] = useState('');
    const [classes, setClasses] = useState([]);
    const [className, setClassName] = useState('');
    const [classSemester, setClassSemester] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [loading, setLoading] = useState(true);

    const getUser = async () => {
        try {
            const res = await axios.get('http://127.0.0.1:8000/api/dashboard/', {
                headers: {
                    Authorization: `Token ${localStorage.getItem("token")}`,
                },
            });
            setUser(res.data.username);
        } catch (err) {
            console.error("Error fetching user data:", err);
        }
    };

    const handleAddClass = async () => {
        try {
            await addClasses({ class_name: className, class_semester: classSemester });
            const updatedClasses = await fetchClasses();
            setClasses(updatedClasses);
            setClassName('');
            setClassSemester('');
            setShowForm(false);
        } catch (err) {
            console.error("Error adding class:", err);
            alert("Failed to add class. Please try again.");
        }
    };

    useEffect(() => {
        getUser();
        fetchClasses()
            .then((data) => setClasses(data))
            .catch(() => alert("Failed to fetch classes. Please try again."))
            .finally(() => setLoading(false));
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <header className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Welcome, {user}!</h1>
                <Logout />
            </header>

            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Your Classes</h2>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                >
                    {showForm ? "Cancel" : "Add Class"}
                </button>
            </div>

            {showForm && (
                <div className="bg-white p-4 rounded shadow mb-6">
                    <h3 className="text-lg font-semibold mb-4">Add a New Class</h3>
                    <div className="flex flex-col gap-4">
                        <input
                            type="text"
                            placeholder="Class Name"
                            value={className}
                            onChange={(e) => setClassName(e.target.value)}
                            className="border p-2 rounded w-full"
                        />
                        <input
                            type="text"
                            placeholder="Class Semester"
                            value={classSemester}
                            onChange={(e) => setClassSemester(e.target.value)}
                            className="border p-2 rounded w-full"
                        />
                        <button
                            onClick={handleAddClass}
                            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
                        >
                            Add Class
                        </button>
                    </div>
                </div>
            )}

            {loading ? (
                <div className="text-center text-gray-500">Loading classes...</div>
            ) : classes.length === 0 ? (
                <div className="text-center text-gray-500">You haven't added any classes yet.</div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {classes.map((cls) => (
                        <div
                            key={cls.id}
                            className="bg-white shadow rounded-lg p-4 border-l-4 border-blue-500 hover:border-blue-600 hover:shadow-lg transition-all"
                        >
                            <h3 className="text-lg font-semibold">{cls.class_name}</h3>
                            <p className="text-gray-600">{cls.class_semester}</p>
                            <button
                                onClick={() => alert(`Viewing details for ${cls.class_name}`)}
                                className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                            >
                                View Details
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Dashboard;