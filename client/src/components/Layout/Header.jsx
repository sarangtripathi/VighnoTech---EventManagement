import React,{useEffect} from 'react';
import { Link } from 'react-router-dom';


const Header = () => {
  const username = localStorage.getItem('loggedInUser'); // Fetch the username from localStorage
  const logoutUser = () => {
    localStorage.removeItem('loggedInUser'); // Remove the username from localStorage
    localStorage.removeItem('token'); // Remove the token from localStorage
    window.location.reload(); // Refresh the page to reflect changes
  };
  

  return (
    <header className="bg-blue-600 text-white">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">Event Manager</Link>
        <nav>
          {username ? (
            <>
              <span className="mr-4">Welcome, {username}</span>
              <button
                onClick={logoutUser}
                className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              {/* <Link to="/login" className="mr-4 hover:underline">Login</Link> */}
              <Link
                to="/signup"
                className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded"
              >
                Register
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;