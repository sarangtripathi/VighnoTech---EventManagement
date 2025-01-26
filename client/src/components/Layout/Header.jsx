import { Link } from 'react-router-dom';
import React, { useEffect,useState } from 'react'
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import  {ToastContainer,toast }from "react-toastify"
// import { handleError, handleSuccess } from '../utils';
// import { useAuth } from '../../contexts/AuthContext';

const Header = () => {
  const [loggedInUser,setLoggedInUser]=useState();
  const [products,setProducts]=useState([]);
  const navigate=useNavigate();
  
  useEffect(()=>{
        setLoggedInUser(localStorage.getItem('loggedInUser'))
  },[])


  const handleLogout=(e)=>{
    localStorage.removeItem('token');
    localStorage.removeItem('loggedInUser');
    toast.success('User LoggedOut')
    setTimeout(()=>{
         navigate('/login');
    },1000)

  }
//   const { user, logoutUser } = useAuth();

  return (
    <header className="bg-blue-600 text-white">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">VighnoTech Event Management</Link>
        <nav>
          {/* {user ? ( */}
            <>
              {/* <span className="mr-4">Welcome, {user.username}</span> */}
              <span className="mr-4">Welcome, Kalluuuuwaaaaaaaaaaa</span>
              {/* <button className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded">
                Logout
              </button> */}
            </>
          {/* ) : ( */}
            <>
              {/* <Link to="/login" className="mr-4 hover:underline">Login</Link> */}
              <button  className="ml-4 border rounded px-3 py-1 bg-red-400 font-semibold" onClick={handleLogout}>Logout</button>
              {/* <Link to="/register" className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded">
                Register
              </Link> */}
            </>
          {/* )} */}
        </nav>
      </div>
    </header>
  );
};

export default Header;