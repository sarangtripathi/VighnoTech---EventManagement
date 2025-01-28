import React, { useState, useEffect } from "react";
import EventForm from "../../components/Events/EventForm";
import EventList from "../../components/Events/EventList";
import {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
} from "../../services/api";

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
      setEvents(
        events.map((event) => (event._id === id ? updatedEvent : event))
      );
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
    <div>
      <h1 className="text-3xl font-bold mb-6">Event Management Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-bold mb-4">
            {editingEvent ? "Edit Event" : "Create New Event"}
          </h2>
          <EventForm
            onSubmit={editingEvent ? handleUpdateEvent : handleCreateEvent}
            initialData={editingEvent}
          />
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-4">Event List</h2>
          <EventList
            events={events}
            onEdit={setEditingEvent}
            onDelete={handleDeleteEvent}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
