import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSuccess = (msg) => {
    toast.success(msg, {
      position: "top-right",
    });
  };

  const handleError = (msg) => {
    toast.error(msg, {
      position: "top-right",
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      return handleError("Email and password are required");
    }

    try {
      const response = await fetch("http://localhost:6080/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();
      const { token, user, message } = result;

      if (response.ok) {
        handleSuccess("Login successful");
        localStorage.setItem("token", token);
        localStorage.setItem("loggedInUser", user.username);
        setTimeout(() => {
          navigate("/dashboard");
        }, 1000);
      } else {
        setError(message || "Invalid credentials");
        handleError(message || "Invalid credentials");
      }
    } catch (err) {
      setError("An unexpected error occurred");
      handleError("An unexpected error occurred");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-md p-8">
        <h1 className="text-2xl font-semibold text-gray-800 text-center mb-6">
          Login
        </h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-4 py-2 border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Login
          </button>
        </form>
        <div className="flex justify-center mt-2">
          <span className="text-gray-600">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-500 hover:underline">
              Signup
            </Link>
          </span>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </div>
  );
};

export default Login;