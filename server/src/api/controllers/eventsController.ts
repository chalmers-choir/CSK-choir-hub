import { eventService } from '@services';
import { BadRequestError } from '@utils/errors';
import { NextFunction, Request, Response } from 'express';

// Get all events
export const getEvents = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const events = await eventService.getAllEvents();
    return res.json({ events });
  } catch (error) {
    return next(error);
  }
};

// Delete an event by ID
export const deleteEvent = async (req: Request, res: Response, next: NextFunction) => {
  const eventId = parseInt(req.params.id, 10);
  if (isNaN(eventId)) return next(new BadRequestError('Invalid event ID'));

  try {
    await eventService.deleteEvent(eventId);
    return res.status(204).send();
  } catch (error) {
    return next(error);
  }
};

// Create a new event
export const createEvent = async (req: Request, res: Response, next: NextFunction) => {
  const { name, type, description, dateStart, place } = req.body;
  if (!name || !dateStart || !place)
    return next(new BadRequestError('Name, start date, and place are required'));

  try {
    const newEvent = await eventService.createEvent({ name, type, description, dateStart, place });
    return res.status(201).json({ event: newEvent });
  } catch (error) {
    return next(error);
  }
};

// Update an event by ID
export const updateEvent = async (req: Request, res: Response, next: NextFunction) => {
  const eventId = parseInt(req.params.id, 10);
  if (isNaN(eventId)) return next(new BadRequestError('Invalid event ID'));

  const { name, type, description, dateStart, place } = req.body;
  if (!name && !dateStart && !place && !type && !description)
    return next(new BadRequestError('At least one field is required to update'));

  try {
    const updatedEvent = await eventService.updateEvent(eventId, {
      name,
      type,
      description,
      dateStart,
      place,
    });
    return res.json({ event: updatedEvent });
  } catch (error: any) {
    return next(error);
  }
};

// Update user attendance for an event
export const updateUserAttendance = async (req: Request, res: Response, next: NextFunction) => {
  const eventId = parseInt(req.params.id, 10);
  if (isNaN(eventId)) return next(new BadRequestError('Invalid event ID'));

  const { userId, status } = req.body;
  if (!userId || !status) return next(new BadRequestError('User ID and status are required'));

  try {
    const updatedAttendance = await eventService.updateUserAttendance(eventId, userId, status);
    return res.json({ attendance: updatedAttendance });
  } catch (error: any) {
    return next(error);
  }
};

// Register a user for an event
export const registerUserForEvent = async (req: Request, res: Response, next: NextFunction) => {
  const eventId = parseInt(req.params.id, 10);
  if (isNaN(eventId)) return next(new BadRequestError('Invalid event ID'));

  const { userId } = req.body;
  if (!userId) return next(new BadRequestError('User ID is required'));

  try {
    const registration = await eventService.registerUser(eventId, userId);
    return res.status(201).json({ registration });
  } catch (error: any) {
    return next(error);
  }
};

// Unregister a user from an event
export const unregisterUserFromEvent = async (req: Request, res: Response, next: NextFunction) => {
  const eventId = parseInt(req.params.id, 10);
  if (isNaN(eventId)) return next(new BadRequestError('Invalid event ID'));

  const { userId } = req.body;
  if (!userId) return next(new BadRequestError('User ID is required'));

  try {
    await eventService.unregisterUser(eventId, userId);
    return res.status(204).send();
  } catch (error: any) {
    return next(error);
  }
};
