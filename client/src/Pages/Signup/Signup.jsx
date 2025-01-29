import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
    const [signupInfo, setSignupInfo] = useState({
        username: '',
        email: '',
        password: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        const copySignupInfo = { ...signupInfo };
        copySignupInfo[name] = value;
        setSignupInfo(copySignupInfo);
    };

    const handleSuccess = (msg) => {
        toast.success(msg, {
            position: 'top-right'
        });
    };

    const handleError = (msg) => {
        toast.error(msg, {
            position: 'top-right'
        });
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        const { username, email, password } = signupInfo;

        if (!username || !email || !password) {
            return handleError('Username, email, and password are required');
        }

         try {
           const url = "http://localhost:6080/api/auth/register";
           const response = await fetch(url, {
             method: "POST",
             headers: {
               "Content-Type": "application/json",
             },
             body: JSON.stringify(signupInfo),
           });

           const result = await response.json();
           console.log("Signup Response:", result); 

           if (response.status === 201 && result.token) {
             handleSuccess("Signup successful!");
             setTimeout(() => {
               console.log("Navigating to login...");
               navigate("/login");
             }, 1000);
           } else {
             handleError(result.message || "An error occurred");
           }
         } catch (error) {
           handleError("An unexpected error occurred");
         }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
                <h1 className="text-2xl font-semibold text-gray-800 text-center mb-6">Signup</h1>
                <form onSubmit={handleSignup}>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2">Username</label>
                        <input
                            onChange={handleChange}
                            name="username"
                            type="text"
                            autoFocus
                            placeholder="Enter your username"
                            value={signupInfo.username}
                            className="w-full px-4 py-2 border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2">Email</label>
                        <input
                            name="email"
                            type="email"
                            onChange={handleChange}
                            placeholder="Enter your email"
                            value={signupInfo.email}
                            className="w-full px-4 py-2 border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 font-medium mb-2">Password</label>
                        <input
                            name="password"
                            type="password"
                            onChange={handleChange}
                            placeholder="Enter your password"
                            value={signupInfo.password}
                            className="w-full px-4 py-2 border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
                    >
                        Signup
                    </button>
                </form>
                <div className="flex justify-center mt-2">
                    <span className="text-gray-600">
                        Already have an account?{' '}
                        <Link to="/login" className="text-blue-500 hover:underline">
                            Login
                        </Link>
                    </span>
                </div>
            </div>
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
        </div>
    );
};

export default Signup;