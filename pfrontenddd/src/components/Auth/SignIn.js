import React, { useState } from 'react';
import axios from 'axios';

const AuthForm = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        password: '',
        role: 'victim'
    });

    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = isLogin
            ? 'http://localhost:5000/api/auth/login'
            : 'http://localhost:5000/api/auth/register';

        try {
            const dataToSend = isLogin
                ? {
                    phone: formData.phone,
                    password: formData.password
                }
                : formData;

            const res = await axios.post(url, dataToSend);
            setMessage(res.data.message);

            if (isLogin && res.data.token) {
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('role', res.data.role);
                // Redirect logic here
            }
        } catch (err) {
            setMessage(err.response?.data?.message || 'Something went wrong');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-pink-100 to-purple-200">
            <div className="bg-white rounded-3xl shadow-xl p-10 w-full max-w-md">
                <h2 className="text-3xl font-semibold text-center text-pink-600 mb-6">
                    {isLogin ? 'Welcome Back' : 'Join NammaSuraksha'}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {!isLogin && (
                        <>
                            <input
                                type="text"
                                name="name"
                                placeholder="Full Name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400"
                                required
                            />
                            <input
                                type="text"
                                name="role"
                                placeholder="Role (e.g., victim)"
                                value={formData.role}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400"
                                required
                            />
                        </>
                    )}
                    <input
                        type="text"
                        name="phone"
                        placeholder="Phone Number"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400"
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400"
                        required
                    />
                    <button
                        type="submit"
                        className="w-full bg-pink-500 hover:bg-pink-600 text-white py-2 rounded-xl transition-all duration-300"
                    >
                        {isLogin ? 'Login' : 'Register'}
                    </button>
                </form>

                <p
                    onClick={() => setIsLogin(!isLogin)}
                    className="mt-4 text-center text-sm text-pink-600 hover:underline cursor-pointer"
                >
                    {isLogin ? "Don't have an account? Register" : "Already have an account? Login"}
                </p>

                {message && (
                    <div className="mt-4 text-center text-sm text-red-500">
                        {message}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AuthForm;
