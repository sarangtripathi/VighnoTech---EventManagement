import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { getUserEvents } from '../../services/api';
import EventItem from '../../components/Events/EventItem';
import { Link } from 'react-router-dom';

const Profile = () => {
  const { user } = useAuth();
  const [userEvents, setUserEvents] = useState([]);

  useEffect(() => {
    const fetchUserEvents = async () => {
      try {
        const events = await getUserEvents();
        setUserEvents(events);
      } catch (error) {
        console.error('Error fetching user events:', error);
      }
    };

    fetchUserEvents();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Go To Dashboard Link */}
      <Link to="/dashboard" className="text-lg font-semibold text-blue-600 hover:text-blue-800 transition duration-200">
        &#8592; Go To Dashboard
      </Link>

      {/* User Profile Header */}
      <h2 className="text-3xl font-bold mt-6 text-blue-800">User Profile</h2>
      
      {/* User Info Card */}
      <div className="bg-white shadow-lg rounded-lg p-6 mb-6 bg-yellow-50">
        <p className="text-lg font-semibold text-blue-600">Username: <span className="text-xl text-blue-800">{user}</span></p>
      </div>

      {/* User Events */}
      <div>
        <h2 className="text-2xl font-semibold mb-4 text-blue-800">Your Events</h2>
        {userEvents.length > 0 ? (
          <div className="space-y-4">
            {userEvents.map(event => (
              <EventItem key={event._id} event={event} showEditDeleteButtons={false} />
            ))}
          </div>
        ) : (
          <p className="text-gray-600">You haven't created any events yet.</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
