import express from "express";
import { createEvent, deleteEvent, getEvent, getEvents, updateEvent } from "../controller/events.js";

const router = express.Router();


// Get all the events created.
router.get("/", getEvents);

// Get an event by Id.
router.get("/:userId", getEvent);

// Create a new event.
router.post("/", createEvent);

// Update an created event.
router.patch("/:userId", updateEvent);

// delete an event.
router.delete("/:userId", deleteEvent);

export default router;