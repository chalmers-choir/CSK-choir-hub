import { eventModel } from '@db';
import { EventType } from '@prisma/client';

export async function getAllEvents() {
  return eventModel.findAll();
}

export async function deleteEvent(eventId: number) {
  await eventModel.deleteById(eventId);
}

export async function createEvent(eventData: {
  name: string;
  description?: string;
  dateStart: Date;
  type: EventType;
  place: string;
}) {
  return eventModel.create(eventData);
}

export async function updateEvent(
  eventId: number,
  updateData: {
    name?: string;
    description?: string;
    dateStart?: Date;
    type?: EventType;
    place?: string;
  },
) {
  return eventModel.update(eventId, updateData);
}
