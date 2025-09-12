import { eventService } from '@services';
import { Request, Response } from 'express';

// Get all events
export const getEvents = async (req: Request, res: Response) => {
  const events = await eventService.getAllEvents();
  res.json({ events });
};

// Delete an event by ID
export const deleteEvent = async (req: Request, res: Response) => {
  const eventId = parseInt(req.params.id, 10);
  if (isNaN(eventId)) return res.status(400).json({ error: 'Invalid event ID' });

  await eventService.deleteEvent(eventId);
  return res.status(204).send();
};

// Create a new event
export const createEvent = async (req: Request, res: Response) => {
  const { name, type, description, dateStart, place } = req.body;
  if (!name || !dateStart || !place) {
    return res.status(400).json({ error: 'Name, start date, and place are required' });
  }

  const newEvent = await eventService.createEvent({ name, type, description, dateStart, place });
  return res.status(201).json({ event: newEvent });
};

// Update an event by ID
export const updateEvent = async (req: Request, res: Response) => {
  const eventId = parseInt(req.params.id, 10);
  if (isNaN(eventId)) return res.status(400).json({ error: 'Invalid event ID' });

  const { name, type, description, dateStart, place } = req.body;
  if (!name && !dateStart && !place && !type && !description) {
    return res.status(400).json({ error: 'At least one field is required to update' });
  }

  const updatedEvent = await eventService.updateEvent(eventId, {
    name,
    type,
    description,
    dateStart,
    place,
  });
  return res.json({ event: updatedEvent });
};

// Update user attendance for an event
export const updateUserAttendance = async (req: Request, res: Response) => {
  const eventId = parseInt(req.params.id, 10);
  if (isNaN(eventId)) return res.status(400).json({ error: 'Invalid event ID' });

  const { userId, status } = req.body;
  if (!userId || !status) {
    return res.status(400).json({ error: 'User ID and status are required' });
  }

  const updatedAttendance = await eventService.updateUserAttendance(eventId, userId, status);
  return res.json({ attendance: updatedAttendance });
};

// Register a user for an event
export const registerUserForEvent = async (req: Request, res: Response) => {
  const eventId = parseInt(req.params.id, 10);
  if (isNaN(eventId)) return res.status(400).json({ error: 'Invalid event ID' });

  const { userId } = req.body;
  if (!userId) {
    return res.status(400).json({ error: 'User ID is required' });
  }

  const registration = await eventService.registerUser(eventId, userId);
  return res.status(201).json({ registration });
};

// Unregister a user from an event
export const unregisterUserFromEvent = async (req: Request, res: Response) => {
  const eventId = parseInt(req.params.id, 10);
  if (isNaN(eventId)) return res.status(400).json({ error: 'Invalid event ID' });

  const { userId } = req.body;
  if (!userId) {
    return res.status(400).json({ error: 'User ID is required' });
  }

  await eventService.unregisterUser(eventId, userId);
  return res.status(204).send();
};
