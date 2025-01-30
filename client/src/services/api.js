import axios from "axios";

const API_URL = "https://eventmanagement-backend-9wbu.onrender.com/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});


export const getEvents = () => api.get("/events").then((res) => res.data);
export const createEvent = (eventData) =>
  api.post("/events", eventData).then((res) => res.data);
export const updateEvent = (id, eventData) =>
  api.put(`/events/${id}`, eventData).then((res) => res.data);
export const deleteEvent = (id) =>
  api.delete(`/events/${id}`).then((res) => res.data);

export const getUserEvents = () => 
  api.get("/events/user").then((res) => res.data);


export default api;
