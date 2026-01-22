import { eventModel, userModel } from '@db';
import { AttendanceStatus, EventType } from '@prisma/generated/client';
import { NotFoundError } from '@utils';

/**
 * Get all events in the system.
 * @returns All events in the system.
 */
export async function getAllEvents() {
  return await eventModel.findAll();
}

/**
 * Delete an event by ID.
 * @param eventId - The ID of the event to delete.
 */
export async function deleteEvent(eventId: number) {
  await eventModel.deleteById(eventId);
}

/**
 * Create a new event.
 * @param eventData - The event data.
 * @returns The created event.
 */
export async function createEvent(eventData: {
  name: string;
  description?: string;
  dateStart: Date;
  type: EventType;
  place: string;
}) {
  return await eventModel.create(eventData);
}

/**
 * Update an event by ID.
 * @param eventId - The ID of the event to update.
 * @param updateData - The updated event data.
 * @returns The updated event.
 */
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
  return await eventModel.update(eventId, updateData);
}

/**
 * Update user attendance for an event.
 * @param eventId - The ID of the event.
 * @param userId - The ID of the user.
 * @param status - The attendance status.
 * @returns The updated attendance record.
 */
export async function updateUserAttendance(
  eventId: number,
  userId: number,
  status?: AttendanceStatus,
) {
  if (status) {
    return await eventModel.updateUserAttendance(eventId, userId, status);
  } else {
    return await eventModel.removeUserAttendance(eventId, userId);
  }
}

/**
 * Register a user for an event.
 * @param eventId - The ID of the event.
 * @param userId - The ID of the user.
 * @returns {Promise<void>}
 */
export async function registerUser(eventId: number, userId: number) {
  const user = await userModel.findById(userId);
  if (!user) throw new NotFoundError('User not Found');

  const event = await eventModel.findById(eventId);
  if (!event) throw new NotFoundError('Event not Found');

  return await eventModel.registerUser(eventId, userId);
}

/**
 * Unregister a user from an event.
 * @param eventId - The ID of the event.
 * @param userId - The ID of the user.
 * @returns {Promise<void>}
 */
export async function unregisterUser(eventId: number, userId: number) {
  return await eventModel.unregisterUser(eventId, userId);
}
