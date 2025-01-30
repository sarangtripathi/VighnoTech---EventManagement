import React, { useState, useEffect } from "react";
import EventForm from "../../components/Events/EventForm";
import EventList from "../../components/Events/EventList";
import { getEvents, createEvent, updateEvent, deleteEvent } from "../../services/api";

const Dashboard = () => {
  const [events, setEvents] = useState([]);
  const [editingEvent, setEditingEvent] = useState(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const fetchedEvents = await getEvents();
      setEvents(fetchedEvents);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const handleCreateEvent = async (eventData) => {
    console.log("Form Data:", eventData);
    try {
      const newEvent = await createEvent(eventData);
      setEvents([...events, newEvent]);
    } catch (error) {
      console.error("Error creating event:", error);
    }
  };

  const handleUpdateEvent = async (id, eventData) => {
    try {
      const updatedEvent = await updateEvent(id, eventData);
      setEvents(events.map((event) => (event._id === id ? updatedEvent : event)));
      setEditingEvent(null);
    } catch (error) {
      console.error("Error updating event:", error);
    }
  };

  const handleDeleteEvent = async (id) => {
    try {
      await deleteEvent(id);
      setEvents(events.filter((event) => event._id !== id));
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-4xl font-semibold text-blue-600 mb-8 text-center">
        <u>Event Dashboard</u>
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

        <div className="bg-white shadow-lg rounded-xl p-6 mb-8 md:mb-0">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            {editingEvent ? "Edit Event" : "Create New Event"}
          </h2>
          <EventForm
            onSubmit={editingEvent ? handleUpdateEvent : handleCreateEvent}
            initialData={editingEvent}
          />
        </div>

        <div className="bg-white shadow-lg rounded-xl p-6">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Your Events</h2>
          <EventList
            events={events}
            onEdit={setEditingEvent}
            onDelete={handleDeleteEvent}
            showEditDeleteButtons={true}
          />
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
