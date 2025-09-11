import { eventModel } from '@db';
import { AttendanceStatus, EventType } from '@prisma/client';

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

export async function updateUserAttendance(
  eventId: number,
  userId: number,
  status?: AttendanceStatus,
) {
  if (status) {
    return eventModel.updateUserAttendance(eventId, userId, status);
  } else {
    return eventModel.removeUserAttendance(eventId, userId);
  }
}

export async function registerUser(eventId: number, userId: number) {
  return eventModel.registerUser(eventId, userId);
}

export async function unregisterUser(eventId: number, userId: number) {
  return eventModel.unregisterUser(eventId, userId);
}
