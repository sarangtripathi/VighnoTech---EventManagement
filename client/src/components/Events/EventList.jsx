import React, { useState } from "react";
import EventItem from "./EventItem";
import Input from "../UI/Input";

const EventList = ({ events, onEdit, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [filterLocation, setFilterLocation] = useState("");

  const filteredEvents = events.filter((event) => {
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
  });

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
      <div className="space-y-4">
        {filteredEvents.map((event) => (
          <EventItem
            key={event._id}
            event={event}
            onEdit={() => onEdit(event)}
            onDelete={() => onDelete(event._id)}
          />
        ))}
      </div>
    </div>
  );
};

export default EventList;
