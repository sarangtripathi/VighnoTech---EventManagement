import React from "react";
import Button from "../UI/Button";

const EventItem = ({ event, onEdit, onDelete }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h3 className="text-xl font-bold mb-2">{event.title}</h3>
      <p className="text-gray-600 mb-2">{event.description}</p>
      <p className="text-sm text-gray-500 mb-1">
        <span className="font-semibold">Date & Time:</span>{" "}
        {new Date(event.dateTime).toLocaleString()}
      </p>
      <p className="text-sm text-gray-500 mb-1">
        <span className="font-semibold">Location:</span> {event.location}
      </p>
      <p className="text-sm text-gray-500 mb-4">
        <span className="font-semibold">Capacity:</span> {event.capacity}
      </p>
      <div className="flex justify-end space-x-2">
        <Button onClick={onEdit} className="bg-yellow-500 hover:bg-yellow-600">
          Edit
        </Button>
        <Button onClick={onDelete} className="bg-red-500 hover:bg-red-600">
          Delete
        </Button>
      </div>
    </div>
  );
};

export default EventItem;
