import React from 'react';
import { Link } from 'react-router-dom';
// import { useAuth } from '../../contexts/AuthContext';

const Header = () => {
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
              <Link to="/login" className="mr-4 hover:underline">Login</Link>
              <Link to="/register" className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded">
                Register
              </Link>
            </>
          {/* )} */}
        </nav>
      </div>
    </header>
  );
};

export default Header;