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
    <div className="max-w-4xl mx-auto">
       <Link to="/dashboard" className="text-l font-semibold  text-blue-500"><u> &#8592; Go To DashBoard</u></Link>
      <h2 className="text-3xl font-bold mt-6 ">User Profile</h2>
      
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        {/* <h2 className="text-2xl font-semibold mb-4">User Information</h2> */}

        <p><strong>Username:</strong> {user}</p>
     
      </div>
      <div>
        <h2 className="text-2xl font-semibold mb-4">Your Events</h2>
        {userEvents.length > 0 ? (
          <div className="space-y-4">
            {userEvents.map(event => (
              <EventItem key={event._id} event={event} />
            ))}
          </div>
        ) : (
          <p>You haven't created any events yet.</p>
        )}
      </div>
    </div>
  );
};

export default Profile;