import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { useNavigate } from 'react-router';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            setError('');
            if (!email || !password) {
                setError('Please enter the required fields.');
                return;
            }
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                setError('Please enter a valid email address.');
                return;
            }
            setLoading(true);
            let reqBody = {
                userId: uuidv4(),
                email,
                password
            }
            let result = await axios.post("/api/register-user", reqBody);
            const { statusCode, message } = result.data
            if (statusCode == 201 || statusCode == 200) {
                const { userId, email } = result.data.data;
                localStorage.setItem("userId", userId);
                localStorage.setItem("email", email);
                alert(message)
                navigate("/polls");
                setEmail('');
                setPassword('');
            }
        } catch (error) {
            const { message } = error.response.data
            alert(message)
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form
                onSubmit={handleSubmit}
                className="bg-white shadow-md rounded-lg p-8 w-full max-w-sm"
            >
                <h2 className="text-2xl font-semibold text-center mb-6 text-gray-700">
                    Login / Signup
                </h2>

                {error && (
                    <div className="bg-red-100 text-red-600 text-sm p-2 rounded mb-4">
                        {error}
                    </div>
                )}

                <label
                    htmlFor="email"
                    className="block text-gray-700 text-sm font-medium mb-1"
                >
                    Email
                </label>
                <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="you@example.com"
                />

                <label
                    htmlFor="password"
                    className="block text-gray-700 text-sm font-medium mb-1"
                >
                    Password
                </label>
                <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="••••••••"
                />

                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full text-white py-2 rounded-md font-medium transition-colors ${loading
                        ? 'bg-blue-400 cursor-not-allowed'
                        : 'bg-blue-600 hover:bg-blue-700'
                        }`}
                >
                    {loading ? 'Signing in…' : 'Sign in'}
                </button>
            </form>
        </div>
    );
};

export default Login;
