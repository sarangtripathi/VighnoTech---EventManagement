import React, { useState, useEffect } from "react";
import Input from "../UI/Input";
import Button from "../UI/Button";

const EventForm = ({ onSubmit, initialData }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [location, setLocation] = useState("");
  const [capacity, setCapacity] = useState("");

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setDescription(initialData.description);
      setDateTime(initialData.dateTime.slice(0, 16));
      setLocation(initialData.location);
      setCapacity(initialData.capacity);
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(initialData ? initialData._id : {
      title,
      description,
      dateTime,
      location,
      capacity: parseInt(capacity),
    });
    resetForm();
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setDateTime("");
    setLocation("");
    setCapacity("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        type="text"
        placeholder="Event Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
        rows="4"
        placeholder="Event Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      ></textarea>
      <Input
        type="datetime-local"
        value={dateTime}
        onChange={(e) => setDateTime(e.target.value)}
        required
      />
      <Input
        type="text"
        placeholder="Event Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        required
      />
      <Input
        type="number"
        placeholder="Capacity"
        value={capacity}
        onChange={(e) => setCapacity(e.target.value)}
        required
      />
      <Button type="submit" className="px-2 py-1 bg-red-500 ">
        {initialData ? "Update Event" : "Create Event"}
      </Button>
    </form>
  );
};

export default EventForm;
