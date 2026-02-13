import type {
  AttendanceStatus,
  EventAttendance,
  EventRegistration,
  EventType,
  Prisma,
} from "@prisma/generated/client";
import { prisma } from "@db/prisma";

/**
 * Create a new event.
 * @param eventData - Data for the new event.
 */
export async function create(eventData: Prisma.EventCreateInput) {
  return await prisma.event.create({ data: eventData });
}

/**
 * Find all events.
 * @returns All events in the database.
 */
export async function findAll() {
  return await prisma.event.findMany();
}

/**
 * Find an event by its ID.
 * @param eventId - The ID of the event.
 */
export async function findById(eventId: number) {
  return await prisma.event.findUnique({
    where: { id: eventId },
  });
}

/**
 * Update an event by its ID.
 * @param eventId - The ID of the event.
 * @param updateData - The data to update.
 */
export async function update(eventId: number, updateData: Prisma.EventUpdateInput) {
  return await prisma.event.update({
    where: { id: eventId },
    data: updateData,
  });
}

/**
 * Delete an event by its ID.
 * @param eventId - The ID of the event.
 */
export async function deleteById(eventId: number) {
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
    include: {
      user: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
        },
      },
    },
  });
}

/**
 * List registrations for an event.
 * @param eventId - The ID of the event.
 */
export async function listRegistrations(eventId: number) {
  return await prisma.eventRegistration.findMany({
    where: { eventId },
    include: {
      user: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
        },
      },
    },
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

/**
 * Update user attendance for an event.
 * @param eventId - The ID of the event.
 * @param userId - The ID of the user.
 * @param attending - Whether the user is attending or not.
 */
export async function updateUserAttendance(
  eventId: number,
  userId: number,
  status: AttendanceStatus,
) {
  // Add or update attendance record
  return await prisma.eventAttendance.upsert({
    where: { userId_eventId: { userId, eventId } },
    create: { userId, eventId, status },
    update: { status },
  });
}

/** Remove user attendance for an event.
 * @param eventId - The ID of the event.
 * @param userId - The ID of the user.
 */
export async function removeUserAttendance(eventId: number, userId: number) {
  return await prisma.eventAttendance.deleteMany({
    where: { eventId, userId },
  });
}

/**
 * Register a user for an event.
 * @param eventId - The ID of the event.
 * @param userId - The ID of the user.
 */
export async function registerUser(eventId: number, userId: number) {
  return await prisma.eventRegistration.create({
    data: { eventId, userId },
  });
}

/**
 * Unregister a user from an event.
 * @param eventId - The ID of the event.
 * @param userId - The ID of the user.
 */
export async function unregisterUser(eventId: number, userId: number) {
  return await prisma.eventRegistration.deleteMany({
    where: { eventId, userId },
  });
}
