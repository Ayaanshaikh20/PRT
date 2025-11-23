import { useState } from "react";
import axios from "axios";

const FeedbackForm = () => {
    const [form, setForm] = useState({ name: "", email: "", message: "" });
    const [status, setStatus] = useState({ type: "", msg: "" });
    const [submitting, setSubmitting] = useState(false);

    function handleChange(e) {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus({ type: "", msg: "" });

        if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
            setStatus({ type: "error", msg: "All fields are required." });
            return;
        }

        try {
            setSubmitting(true);
            await axios.post(`/api/feedback`, form);
            setStatus({ type: "success", msg: "Feedback sent successfully!" });
            setForm({ name: "", email: "", message: "" });
        } catch (err) {
            console.error(err);
            setStatus({
                type: "error",
                msg: err.response?.data?.error || "Something went wrong",
            });
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <div className="max-w-xl mx-auto p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                Submit Feedback
            </h2>

            {/* Status Message */}
            {status.msg && (
                <div
                    className={`mb-4 p-3 rounded text-white ${status.type === "success" ? "bg-green-500" : "bg-red-500"
                        }`}
                >
                    {status.msg}
                </div>
            )}

            {/* Form Card */}
            <form
                onSubmit={handleSubmit}
                className="bg-white shadow-lg rounded-lg border-2 p-6 space-y-4"
            >
                {/* Name */}
                <div>
                    <label className="block text-gray-700 font-medium mb-1">Name*</label>
                    <input
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        placeholder="Enter your name"
                    />
                </div>

                {/* Email */}
                <div>
                    <label className="block text-gray-700 font-medium mb-1">Email*</label>
                    <input
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        placeholder="Enter your email"
                    />
                </div>

                {/* Message */}
                <div>
                    <label className="block text-gray-700 font-medium mb-1">
                        Message*
                    </label>
                    <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        rows={5}
                        className="w-full border rounded-lg px-3 py-2 resize-none focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        placeholder="Write your feedback..."
                    />
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={submitting}
                    className={`w-full py-2 rounded-lg text-white font-semibold transition ${submitting
                            ? "bg-blue-300 cursor-not-allowed"
                            : "bg-blue-600 hover:bg-blue-700"
                        }`}
                >
                    {submitting ? "Sending..." : "Submit"}
                </button>
            </form>
        </div>
    );
};

export default FeedbackForm;
