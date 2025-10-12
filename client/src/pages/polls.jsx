import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

const Polls = () => {
    const navigate = useNavigate();

    const [polls, setPolls] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState({});
    const email = localStorage.getItem("email");
    const userId = localStorage.getItem("userId");

    useEffect(() => {
        fetchPolls();
    }, []);

    const fetchPolls = async () => {
        try {
            const result = await axios.get("/api/poll");
            const { statusCode, data } = result.data;
            if (statusCode === 200) {
                setPolls(data);
            }
        } catch (error) {
            const message = error?.response?.data?.message || "Error fetching polls";
            alert(message);
        }
    };

    const handleVote = async (pollId) => {
        const optionIndex = selectedOptions[pollId];
        if (optionIndex === undefined) return alert("Please select an option");

        try {
            let reqBody = { voterId: userId, optionIndex, pollId };
            const res = await axios.post("/api/vote", reqBody);
            const { statusCode, message } = res.data.data;
            if (statusCode === 200) {
                alert(message);
            }
            await fetchPolls();
            setSelectedOptions((prev) => ({ ...prev, [pollId]: null }));
        } catch (error) {
            const { message } = error?.response?.data || "Error submitting vote";
            alert(message);
        }
    };

    const handleLogout = () => {
        alert("Logged out!");
        localStorage.clear();
        navigate("/");
    };

    return (
        <div className="flex flex-col items-center justify-start min-h-screen p-4 bg-gray-100">
            <div className="w-full flex justify-between">
                <h2 className="text-2xl font-semibold mb-6">Polls</h2>
                <span className="font-bold">{email}</span>
            </div>

            <div className="w-full flex justify-center items-center gap-6">
                {polls.map((poll) => {
                    const totalVotes = poll.options.reduce((sum, o) => sum + o.votes, 0);

                    //Check if user has already voted in this poll
                    const hasVoted = poll.voters.includes(userId);

                    return (
                        <div key={poll._id} className="bg-white p-4 rounded shadow w-full max-w-md">
                            <h3 className="font-semibold mb-3">{poll.question}</h3>

                            {poll.options.map((opt, i) => {
                                const percentage = totalVotes ? Math.round((opt.votes / totalVotes) * 100) : 0;
                                return (
                                    <div key={i} className="mb-2 flex items-center w-full gap-2">
                                        {!hasVoted ? (
                                            <label className="flex items-center justify-between w-full gap-2">
                                                <span className="w-1/3">{opt.text}</span>
                                                <input
                                                    type="radio"
                                                    name={poll._id}
                                                    checked={selectedOptions[poll._id] === i}
                                                    onChange={() =>
                                                        setSelectedOptions((prev) => ({ ...prev, [poll._id]: i }))
                                                    }
                                                />
                                            </label>
                                        ) : (
                                            <div className="flex items-center w-full gap-2">
                                                <span className="w-1/4">{opt.text}</span>
                                                <div className="flex-1 bg-gray-200 h-4 rounded">
                                                    <div
                                                        className="bg-green-500 h-4 rounded"
                                                        style={{ width: `${percentage}%` }}
                                                    ></div>
                                                </div>
                                                <small className="ml-2 text-gray-600">
                                                    {opt.votes} votes ({percentage}%)
                                                </small>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}

                            {!poll.voters.includes(userId) && (
                                <button
                                    onClick={() => handleVote(poll._id)}
                                    className="mt-3 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                                >
                                    Vote
                                </button>
                            )}
                        </div>
                    );
                })}
            </div>

            <button
                onClick={handleLogout}
                className="mt-6 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
            >
                Logout
            </button>
        </div>
    );
};

export default Polls;
