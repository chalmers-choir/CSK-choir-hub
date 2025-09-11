import { eventService } from '@services';
import { Request, Response } from 'express';

// Get all events
export const getEvents = async (req: Request, res: Response) => {
  try {
    const events = await eventService.getAllEvents();
    res.json({ events });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

// Delete an event by ID
export const deleteEvent = async (req: Request, res: Response) => {
  try {
    const eventId = parseInt(req.params.id, 10);
    if (isNaN(eventId)) return res.status(400).json({ error: 'Invalid event ID' });

    await eventService.deleteEvent(eventId);
    return res.status(204).send();
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
};

// Create a new event
export const createEvent = async (req: Request, res: Response) => {
  try {
    const { name, type, description, dateStart, place } = req.body;
    if (!name || !dateStart || !place) {
      return res.status(400).json({ error: 'Name, start date, and place are required' });
    }

    const newEvent = await eventService.createEvent({ name, type, description, dateStart, place });
    return res.status(201).json({ event: newEvent });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
};

// Update an event by ID
export const updateEvent = async (req: Request, res: Response) => {
  try {
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
    return res.status(200).json({ event: updatedEvent });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
};
