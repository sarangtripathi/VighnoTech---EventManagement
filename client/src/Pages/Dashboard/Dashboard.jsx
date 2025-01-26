import React, { useEffect,useState } from 'react'
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import  {ToastContainer,toast }from "react-toastify"
// import { handleError, handleSuccess } from '../utils';
import Footer from '../../components/Layout/Footer.jsx'

const DashBoard = () => {
  const [loggedInUser,setLoggedInUser]=useState();
  const [products,setProducts]=useState([]);
  const navigate=useNavigate();
  
  useEffect(()=>{
        setLoggedInUser(localStorage.getItem('loggedInUser'))
  },[])

  const handleLogout=(e)=>{
    localStorage.removeItem('token');
    localStorage.removeItem('loggedInUser');
    // handleSuccess('User LoggedOut')
    setTimeout(()=>{
         navigate('/login');
    },1000)

  } 
  return (
    <div>DashBoard</div>
   
  )
}

export default DashBoard