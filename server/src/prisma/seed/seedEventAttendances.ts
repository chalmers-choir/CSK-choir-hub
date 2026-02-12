import { AttendanceStatus, PrismaClient } from "@prisma/generated/client";
import { Events } from "./seedEvents";
import { Users } from "./seedUsers";

export default async function seedEventAttendances(
  prisma: PrismaClient,
  users: Users,
  events: Events,
): Promise<void> {
  await prisma.eventAttendance.createMany({
    data: [
      {
        userId: users.fred.id,
        eventId: events.rehearsal1.id,
        status: AttendanceStatus.PRESENT,
      },
      {
        userId: users.george.id,
        eventId: events.rehearsal1.id,
        status: AttendanceStatus.PRESENT,
      },
      {
        userId: users.charles.id,
        eventId: events.rehearsal1.id,
        status: AttendanceStatus.PRESENT,
      },
      {
        userId: users.diana.id,
        eventId: events.rehearsal1.id,
        status: AttendanceStatus.ABSENT,
      },
      {
        userId: users.evan.id,
        eventId: events.rehearsal1.id,
        status: AttendanceStatus.PRESENT,
      },
    ],
  });

  await prisma.eventAttendance.createMany({
    data: [
      {
        userId: users.alice.id,
        eventId: events.rehearsal2.id,
        status: AttendanceStatus.PRESENT,
      },
      {
        userId: users.bob.id,
        eventId: events.rehearsal2.id,
        status: AttendanceStatus.PRESENT,
      },
      {
        userId: users.charles.id,
        eventId: events.rehearsal2.id,
        status: AttendanceStatus.PRESENT,
      },
      {
        userId: users.diana.id,
        eventId: events.rehearsal2.id,
        status: AttendanceStatus.PRESENT,
      },
      {
        userId: users.evan.id,
        eventId: events.rehearsal2.id,
        status: AttendanceStatus.PRESENT,
      },
    ],
  });
}
