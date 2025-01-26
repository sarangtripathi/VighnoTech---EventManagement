import React,{useEffect, useState} from 'react'
import Footer from '../../components/Layout/Footer.jsx'

const DashBoard = () => {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (loggedInUser) {
      setUsername(loggedInUser);
    }
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Welcome, {username}!</h1>
    </div>
  );
}

export default DashBoard