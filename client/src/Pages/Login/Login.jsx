
import React from 'react'
import { Link } from 'react-router-dom'
import  {ToastContainer,toast }from "react-toastify";
import {useState} from "react"
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';


const Login = () => {
    const [loginInfo,setloginInfo]=useState({
        email:'',
        password:''
    });


    const navigate=useNavigate();
    const handleChange=(e)=>{
        const {username,value}=e.target;
        console.log(username,value);
        const copyloginInfo={...loginInfo};
        copyloginInfo[username]=value;
        setloginInfo(copyloginInfo);
    }

    console.log("loginInfo->",loginInfo)

    const handleSuccess=(msg)=>{
        toast.success(msg,{
            position:'top-right'
        })
    }

    const handleError=(msg)=>{
        toast.error(msg,{
            position:'top-right',
        })
    }

    const handleLogin= async(e)=>{
        e.preventDefault();
        const {email,password}=loginInfo;
        if( !email || !password){
            return handleError(' email and password are required')
        }
        try{
            const url="http://localhost:6080/api/auth/login";
            const response = await fetch(url,{
                method:"POST",
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(loginInfo)
            });

            const result = await response.json();

            const {success, message,jwtToken,name, error}=result;
            if(success){
                handleSuccess(message);
                localStorage.setItem('token',jwtToken);
                localStorage.setItem('loggedInUser',name);
                setTimeout(()=>{
                    navigate('/home')
                },1000)
            }else if(error){
                const details=error?.details[0].message;
                handleError(details);
            }else if(!success){
                handleError(message);
            }
            console.log(result);

        }catch(error){
            handleError(error);

        }

    }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
  <div className="w-full max-w-md bg-white rounded-3xl shadow-md p-8">
    <h1 className="text-2xl font-semibold text-gray-800 text-center mb-6">Login</h1>
    <form onSubmit={handleLogin}>
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">Email</label>
        <input
          name="email"
          type="email"
          onChange={handleChange}
          autoFocus
          placeholder="Enter your email"
          value={loginInfo.email}
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
          value={loginInfo.password}
          className="w-full px-4 py-2 border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
  )
}

export default Login