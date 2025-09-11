import { Events } from './seedEvents';
import { Users } from './seedUsers';
import { PrismaClient } from '@prisma/client';

export default async function seedEventRegistration(
  prisma: PrismaClient,
  users: Users,
  events: Events,
): Promise<void> {
  await prisma.eventRegistration.createMany({
    data: [
      {
        userId: users.alice.id,
        eventId: events.party1.id,
      },
      {
        userId: users.bob.id,
        eventId: events.party1.id,
      },
      {
        userId: users.charles.id,
        eventId: events.party1.id,
      },
      {
        userId: users.diana.id,
        eventId: events.party1.id,
      },
      {
        userId: users.evan.id,
        eventId: events.party1.id,
      },
    ],
  });

  await prisma.eventRegistration.createMany({
    data: [
      {
        userId: users.alice.id,
        eventId: events.gig2.id,
      },
      {
        userId: users.bob.id,
        eventId: events.gig1.id,
      },
      {
        userId: users.charles.id,
        eventId: events.gig1.id,
      },
      {
        userId: users.diana.id,
        eventId: events.gig2.id,
      },
      {
        userId: users.evan.id,
        eventId: events.gig1.id,
      },
    ],
  });
}
