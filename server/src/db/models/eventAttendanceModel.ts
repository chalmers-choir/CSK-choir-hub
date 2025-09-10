import { prisma } from '@db/prisma';

import { AttendanceStatus } from '@prisma/client';

/**
 * Update the attendance status of a user for a specific event.
 * @param eventId - The ID of the event.
 * @param userId - The ID of the user.
 */
export async function updateUserEventAttendanceStatus(userId: number, eventId: number, status: AttendanceStatus) {
  return await prisma.eventAttendance.create({
    data: { 
        user: { connect: { id: userId } }, 
        event: { connect: { id: eventId } },
        status: status
    }
  });
}

/**
 * Remove a user's attendance for a specific event.
 * @param userId - The ID of the user.
 * @param eventId - The ID of the event.
 */
export async function removeUserEventAttendance(userId: number, eventId: number) {
    return await prisma.eventAttendance.deleteMany({
      where: { userId: userId, eventId: eventId }
    });
}