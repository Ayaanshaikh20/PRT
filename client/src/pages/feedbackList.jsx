import { useEffect, useState } from "react";
import axios from "axios";

const FeedbackList = () => {
    const [feedbacks, setFeedbacks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const res = await axios.get("/api/feedback");
            setFeedbacks(res.data);
        } catch (err) {
            setError("Failed to load feedback");
        } finally {
            setLoading(false);
        }
    };

    if (loading)
        return (
            <p className="text-center text-gray-600 mt-6 text-lg animate-pulse">
                Loading feedback...
            </p>
        );

    if (error)
        return (
            <p className="text-center text-red-500 font-semibold mt-6">{error}</p>
        );

    if (feedbacks.length === 0)
        return (
            <p className="text-center text-gray-500 mt-20 text-xl italic">
                No feedback available
            </p>
        );

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                All Feedbacks
            </h2>
            <div className="overflow-hidden border border-gray-200 shadow-md">
                <div className="max-h-96 overflow-y-auto">
                    <table className="min-w-full bg-white">
                        <thead>
                            <tr className="bg-gray-50 border-b">
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                                    Name
                                </th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                                    Email
                                </th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                                    Message
                                </th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-100">
                            {feedbacks.map((fb, index) => (
                                <tr
                                    key={index}
                                    className={`transition-colors duration-200 hover:bg-gray-50 ${index % 2 === 0 ? "bg-white" : "bg-gray-50/50"
                                        }`}
                                >
                                    <td className="px-6 py-4 text-gray-800 font-medium">{fb.name}</td>
                                    <td className="px-6 py-4 text-gray-600">{fb.email}</td>
                                    <td className="px-6 py-4 text-gray-700 leading-relaxed">
                                        {fb.message}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    );
};

export default FeedbackList;
