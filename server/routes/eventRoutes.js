import express from "express";
import {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
  getUserEvents,
} from "../controllers/eventController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.use(authMiddleware);

router.get("/", getEvents);
router.post("/", createEvent);
router.put("/:id", updateEvent);
router.delete("/:id", deleteEvent);
router.get("/user", getUserEvents);


export default router;

// const express = require("express");
// const router = express.router();
// const eventController = require("../controllers/eventController");
// const authMiddleware = require("../middlewares/authMiddleware");

// router.use(authMiddleware);

// router.get("/", eventController.getEvents);
// router.post("/", eventController.createEvent);
// router.put("/:id", eventController.updateEvent);
// router.delete("/:id", eventController.deleteEvent);
