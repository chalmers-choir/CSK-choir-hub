import { prisma } from '@db/prisma';
import type { EventAttendance, EventRegistration, EventType, Prisma } from '@prisma/client';

/**
 * Create a new event.
 * @param eventData - Data for the new event.
 */
export async function createEvent(eventData: Prisma.EventCreateInput) {
  return await prisma.event.create({ data: eventData });
}

/**
 * Find an event by its ID.
 * @param eventId - The ID of the event.
 */
export async function findEventById(eventId: number) {
  return await prisma.event.findUnique({ where: { id: eventId } });
}

/**
 * Update an event by its ID.
 * @param eventId - The ID of the event.
 * @param updateData - The data to update.
 */
export async function updateEvent(eventId: number, updateData: Prisma.EventUpdateInput) {
  return await prisma.event.update({
    where: { id: eventId },
    data: updateData,
  });
}

/**
 * Delete an event by its ID.
 * @param eventId - The ID of the event.
 */
export async function deleteEvent(eventId: number) {
  return await prisma.event.delete({ where: { id: eventId } });
}

/**
 * List events with optional filters.
 * @param filters - Optional filters: type.
 */
export async function listEvents(filters?: { type?: EventType }) {
  const where: Prisma.EventWhereInput = {};
  if (filters) {
    if (filters.type) where.type = filters.type;
  }
  return await prisma.event.findMany({ where });
}

/**
 * List attendees for an event.
 * @param eventId - The ID of the event.
 */
export async function listAttendees(eventId: number) {
  return await prisma.eventAttendance.findMany({
    where: { eventId },
    include: { user: true },
  });
}

/**
 * Find events by user (events a user is attending or registered for).
 * @param userId - The ID of the user.
 */
export async function findEventsByUser(userId: number) {
  // Events attended by user
  const attended = await prisma.eventAttendance.findMany({
    where: { userId },
    include: { event: true },
  });

  // Events registered by user
  const registered = await prisma.eventRegistration.findMany({
    where: { userId },
    include: { event: true },
  });
  return {
    attending: attended.map((a: EventAttendance) => a.eventId),
    registered: registered.map((r: EventRegistration) => r.eventId),
  };
}
