import React from "react";
import Button from "../UI/Button";

const EventItem = ({ event, onEdit, onDelete, showEditDeleteButtons }) => {
  return (
    <div className="bg-white  rounded-xl p-6 m-4 hover:shadow-2xl transition-all duration-300">
      <h3 className="text-2xl font-semibold text-blue-800 mb-3">{event.title}</h3>
      <p className="text-gray-700 mb-4">{event.description}</p>
      <div className="flex justify-between text-sm text-gray-600 mb-3">
        <div>
          <span className="font-semibold">Date & Time:</span>{" "}
          {new Date(event.dateTime).toLocaleString()}
        </div>
        <div>
          <span className="font-semibold">Capacity:</span> {event.capacity}
        </div>
      </div>
      <p className="text-sm text-gray-600 mb-4">
        <span className="font-semibold">Location:</span> {event.location}
      </p>

      {/* Only show Edit and Delete buttons if showEditDeleteButtons is true */}
      {showEditDeleteButtons && (
        <div className="flex justify-end space-x-4 mt-4">
          <Button
            onClick={onEdit}
            className="bg-yellow-500 text-white hover:bg-yellow-600 focus:outline-none rounded-lg px-6 py-2 transition-all duration-300 transform hover:scale-105"
          >
            Edit
          </Button>
          <Button
            onClick={onDelete}
            className="bg-red-500 text-white hover:bg-red-600 focus:outline-none rounded-lg px-6 py-2 transition-all duration-300 transform hover:scale-105"
          >
            Delete
          </Button>
        </div>
      )}
    </div>
  );
};

export default EventItem;
