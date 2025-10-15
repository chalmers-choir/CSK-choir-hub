import { PrismaClient } from '@prisma/client';
import { Event, EventType } from '@prisma/client';

export default async function seedUsers(prisma: PrismaClient): Promise<Events> {
  const rehearsal1 = await prisma.event.create({
    data: {
      name: 'Repetition 1',
      description: 'Första repetitionen för terminen',
      dateStart: new Date('2024-08-15T18:00:00Z'),
      dateEnd: new Date('2024-08-15T20:00:00Z'),
      place: 'Musikens Hus, Sal A',
      type: EventType.REHEARSAL,
      requiresAttendance: true,
    },
  });

  const rehearsal2 = await prisma.event.create({
    data: {
      name: 'Repetition 2',
      description: 'Andra repetitionen för terminen',
      dateStart: new Date('2024-08-22T18:00:00Z'),
      dateEnd: new Date('2024-08-22T20:00:00Z'),
      place: 'Musikens Hus, Sal A',
      type: EventType.REHEARSAL,
      requiresAttendance: true,
    },
  });

  const rehearsal3 = await prisma.event.create({
    data: {
      name: 'Repetition 3',
      description: 'Tredje repetitionen för terminen',
      dateStart: new Date('2024-08-29T18:00:00Z'),
      dateEnd: new Date('2024-08-29T20:00:00Z'),
      place: 'Musikens Hus, Sal A',
      type: EventType.REHEARSAL,
      requiresAttendance: true,
    },
  });

  const concert1 = await prisma.event.create({
    data: {
      name: 'Höstkonsert',
      description: 'Vår årliga höstkonsert',
      dateStart: new Date('2024-10-15T19:00:00Z'),
      dateEnd: new Date('2024-10-15T21:00:00Z'),
      place: 'Stora Konserthuset',
      type: EventType.CONCERT,
      requiresAttendance: true,
    },
  });

  const concert2 = await prisma.event.create({
    data: {
      name: 'Julkonsert',
      description: 'Vår traditionella julkonsert',
      dateStart: new Date('2024-12-20T18:00:00Z'),
      dateEnd: new Date('2024-12-20T20:00:00Z'),
      place: 'Domkyrkan',
      type: EventType.CONCERT,
      requiresAttendance: true,
    },
  });

  const party1 = await prisma.event.create({
    data: {
      name: 'Sommarfest',
      description: 'Årlig sommarfest för alla medlemmar',
      dateStart: new Date('2024-06-30T17:00:00Z'),
      dateEnd: new Date('2024-06-30T22:00:00Z'),
      place: 'Medlems trädgård',
      type: EventType.PARTY,
      requiresRegistration: true,
    },
  });

  const meeting1 = await prisma.event.create({
    data: {
      name: 'Årsmöte',
      description: 'Vårt årliga årsmöte',
      dateStart: new Date('2024-03-10T18:00:00Z'),
      dateEnd: new Date('2024-03-10T20:00:00Z'),
      place: 'Föreningslokalen',
      type: EventType.MEETING,
      requiresRegistration: true,
    },
  });

  const gig1 = await prisma.event.create({
    data: {
      name: 'Bröllopssång',
      description: 'Vi sjunger på ett bröllop',
      dateStart: new Date('2024-09-05T15:00:00Z'),
      dateEnd: new Date('2024-09-05T16:00:00Z'),
      place: 'Sankt Peters Kyrka',
      type: EventType.GIG,
      requiresRegistration: true,
    },
  });

  const gig2 = await prisma.event.create({
    data: {
      name: 'Företagsgig',
      description: 'Vi uppträder på ett företagsevent',
      dateStart: new Date('2024-11-12T19:00:00Z'),
      dateEnd: new Date('2024-11-12T20:00:00Z'),
      place: 'Företagets Konferensrum',
      type: EventType.GIG,
      requiresRegistration: true,
    },
  });

  const gig3 = await prisma.event.create({
    data: {
      name: 'Mock gig',
      description: 'Det här är ett mock gig',
      dateStart: new Date('2025-10-15T19:00:00Z'),
      dateEnd: new Date('2025-10-15T20:00:00Z'),
      place: 'Mockplats',
      type: EventType.GIG,
      requiresRegistration: true,
    },
  });

  const gig4 = await prisma.event.create({
    data: {
      name: 'Mock gig 2',
      description: 'Det här är ett mock gig samma dag som ett annat',
      dateStart: new Date('2025-10-15T19:00:00Z'),
      dateEnd: new Date('2025-10-15T20:00:00Z'),
      place: 'Mockplats',
      type: EventType.GIG,
      requiresRegistration: true,
    },
  });

  return {
    rehearsal1,
    rehearsal2,
    rehearsal3,
    concert1,
    concert2,
    party1,
    meeting1,
    gig1,
    gig2,
  };
}

export interface Events {
  rehearsal1: Event;
  rehearsal2: Event;
  rehearsal3: Event;
  concert1: Event;
  concert2: Event;
  party1: Event;
  meeting1: Event;
  gig1: Event;
  gig2: Event;
}
