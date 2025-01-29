import React from 'react'
import { Link } from 'react-router-dom'

const Profile = () => {
  return (
    <div>
      <Link to="/dashboard" className="text-2xl font-semibold mb-6"><u> &#8592; Go To DashBoard</u></Link>
    </div>
  );
}

export default Profile