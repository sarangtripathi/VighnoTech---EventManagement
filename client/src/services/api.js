import axios from "axios";

const API_URL = "http://localhost:6080/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user && user.token) {
    config.headers["Authorization"] = `Bearer ${user.token}`;
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

export default api;
