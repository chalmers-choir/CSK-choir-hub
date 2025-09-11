import { eventService } from '@services';
import { Request, Response } from 'express';

// Get all events
export const getEventsHandler = async (req: Request, res: Response) => {
  try {
    const events = await eventService.getAllEvents();
    res.json({ events });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

// Delete an event by ID
export const deleteEventHandler = async (req: Request, res: Response) => {
  try {
    const eventId = parseInt(req.params.id, 10);
    if (isNaN(eventId)) return res.status(400).json({ error: 'Invalid event ID' });

    await eventService.deleteEvent(eventId);
    return res.status(204).send();
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
};
