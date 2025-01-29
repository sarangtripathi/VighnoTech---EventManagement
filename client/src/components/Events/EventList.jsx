import React, { useState } from "react";
import EventItem from "./EventItem";
import Input from "../UI/Input";

const EventList = ({ events, onEdit, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [filterLocation, setFilterLocation] = useState("");

  const filteredEvents = events
    .filter((event) => {
      const matchesSearch = event.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesDate = filterDate
        ? event.dateTime.startsWith(filterDate)
        : true;
      const matchesLocation = filterLocation
        ? event.location.toLowerCase().includes(filterLocation.toLowerCase())
        : true;
      return matchesSearch && matchesDate && matchesLocation;
    })
    // Sort by dateTime in ascending order (latest events first)
    .sort((a, b) => new Date(a.dateTime) - new Date(b.dateTime));

  return (
    <div>
      <div className="mb-4 space-y-2">
        <Input
          type="text"
          placeholder="Search events..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Input
          type="date"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Filter by location"
          value={filterLocation}
          onChange={(e) => setFilterLocation(e.target.value)}
        />
      </div>

      <div className="bg-white shadow-md rounded-lg p-4 max-h-96 overflow-y-auto">
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event) => (
            <EventItem
              key={event._id}
              event={event}
              onEdit={() => onEdit(event)}
              onDelete={() => onDelete(event._id)}
            />
          ))
        ) : (
          <p className="text-gray-500 text-center">No events available</p>
        )}
      </div>
    </div>
  );
};

export default EventList;
