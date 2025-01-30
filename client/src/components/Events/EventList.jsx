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
    <div className="space-y-6">
      <div className="mb-4 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Input
            type="text"
            placeholder="Search events..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 transition-all duration-200"
          />

          <Input
            type="date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 transition-all duration-200"
          />

          <Input
            type="text"
            placeholder="Filter by location"
            value={filterLocation}
            onChange={(e) => setFilterLocation(e.target.value)}
            className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 transition-all duration-200"
          />
        </div>
      </div>

      <div className="bg-white shadow-lg rounded-lg max-h-96 overflow-y-auto space-y-4">
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event) => (
            <EventItem
              key={event._id}
              event={event}
              onEdit={() => onEdit(event)}
              onDelete={() => onDelete(event._id)}
              showEditDeleteButtons={true}
            />
          ))
        ) : (
          <p className="text-gray-500 text-center">No events available</p>
        )}
      </div>
      {/* <p className="text-gray-600 text-sm text-center">
        * You can edit/delete only your events.
      </p> */}
    </div>
  );
};

export default EventList;
