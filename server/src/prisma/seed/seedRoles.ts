import { Groups } from './seedGroups';
import { Users } from './seedUsers';
import { PrismaClient } from '@prisma/generated/client';

export default async function seedRoles(
  prisma: PrismaClient,
  groups: Groups,
  users: Users,
): Promise<Roles> {
  const conductorKK = await prisma.role.create({
    data: {
      name: 'Dirigent för KK',
      description: 'Leder KK',
      groups: { connect: [{ id: groups.kk.id }] },
      user: { connect: { id: users.maria.id } },
    },
  });

  const conductorDK = await prisma.role.create({
    data: {
      name: 'Dirigent för DK',
      description: 'Leder DK',
      user: { connect: { id: users.elisabeth.id } },
      groups: { connect: [{ id: groups.dk.id }] },
    },
  });

  const conductorMK = await prisma.role.create({
    data: {
      name: 'Dirigent för MK',
      description: 'Leder MK',
      user: { connect: { id: users.mathias.id } },
      groups: { connect: [{ id: groups.mk.id }] },
    },
  });

  const concertMaster1 = await prisma.role.create({
    data: {
      name: '1a konsertmästaren',
      description: 'Viktigaste styrelseposten',
      user: { connect: { id: users.liam.id } },
      groups: { connect: [{ id: groups.styret.id }] },
    },
  });

  const consertMasterKK = await prisma.role.create({
    data: {
      name: 'Konsertmästare för KK',
      description: 'Planerar konserter i KK',
      groups: { connect: [{ id: groups.kk.id }, { id: groups.concertmasters.id }] },
    },
  });

  const consertMasterDK = await prisma.role.create({
    data: {
      name: 'Konsertmästare för DK',
      description: 'Planerar konserter i DK',
      groups: { connect: [{ id: groups.dk.id }, { id: groups.concertmasters.id }] },
    },
  });

  const consertMasterMK = await prisma.role.create({
    data: {
      name: 'Konsertmästare för MK',
      description: 'Planerar konserter i MK',
      groups: { connect: [{ id: groups.mk.id }, { id: groups.concertmasters.id }] },
    },
  });

  const treasurer = await prisma.role.create({
    data: {
      name: 'Kassör',
      description: 'Ansvarar för ekonomin',
      user: { connect: { id: users.vera.id } },
      groups: { connect: [{ id: groups.styret.id }] },
    },
  });

  const president = await prisma.role.create({
    data: {
      name: 'Ordförande',
      description: 'Leder styrelsen',
      user: { connect: { id: users.isak.id } },
      groups: { connect: [{ id: groups.styret.id }] },
    },
  });

  const vicePresident = await prisma.role.create({
    data: {
      name: 'Vice ordförande',
      description: 'Stödjer ordföranden',
      user: { connect: { id: users.lucas.id } },
      groups: { connect: [{ id: groups.styret.id }] },
    },
  });

  const secretary = await prisma.role.create({
    data: {
      name: 'Sekreterare',
      description: 'Ansvarar för protokoll och dokumentation',
      user: { connect: { id: users.elinor.id } },
      groups: { connect: [{ id: groups.styret.id }] },
    },
  });

  const prmaster = await prisma.role.create({
    data: {
      name: 'PR-ansvarig',
      description: 'Ansvarar för PR och marknadsföring',
      user: { connect: { id: users.ingrid.id } },
      groups: { connect: [{ id: groups.styret.id }] },
    },
  });

  const sexmaster = await prisma.role.create({
    data: {
      name: 'Sexmästare',
      description: 'Ansvarar för sociala aktiviteter',
      groups: { connect: [{ id: groups.styret.id }, { id: groups.partycommittee.id }] },
    },
  });

  const sexmastress = await prisma.role.create({
    data: {
      name: 'Sexmästarinna',
      description: 'Ansvarar för sociala aktiviteter',
      groups: { connect: [{ id: groups.partycommittee.id }] },
    },
  });

  const gigmaster = await prisma.role.create({
    data: {
      name: 'Gigmästare',
      description: 'Ansvarar för gig och framträdanden',
      user: { connect: { id: users.elin.id } },
      groups: { connect: [{ id: groups.styret.id }, { id: groups.gigmasters.id }] },
    },
  });

  const gigmasterKK = await prisma.role.create({
    data: {
      name: 'Gigmästare för KK',
      description: 'Ansvarar för gig och framträdanden i KK',
      groups: { connect: [{ id: groups.kk.id }, { id: groups.gigmasters.id }] },
    },
  });

  const gigmasterDK = await prisma.role.create({
    data: {
      name: 'Gigmästare för DK',
      description: 'Ansvarar för gig och framträdanden i DK',
      groups: { connect: [{ id: groups.dk.id }, { id: groups.gigmasters.id }] },
    },
  });

  const gigmasterMK = await prisma.role.create({
    data: {
      name: 'Gigmästare för MK',
      description: 'Ansvarar för gig och framträdanden i MK',
      user: { connect: { id: users.robert.id } },
      groups: { connect: [{ id: groups.mk.id }, { id: groups.gigmasters.id }] },
    },
  });

  return {
    conductorKK,
    conductorDK,
    conductorMK,
    concertMaster1,
    consertMasterKK,
    consertMasterDK,
    consertMasterMK,
    treasurer,
    president,
    vicePresident,
    secretary,
    prmaster,
    sexmaster,
    sexmastress,
    gigmaster,
    gigmasterKK,
    gigmasterDK,
    gigmasterMK,
  };
}

export interface Roles {
  conductorKK: { id: number };
  conductorDK: { id: number };
  conductorMK: { id: number };
  concertMaster1: { id: number };
  consertMasterKK: { id: number };
  consertMasterDK: { id: number };
  consertMasterMK: { id: number };
  treasurer: { id: number };
  president: { id: number };
  vicePresident: { id: number };
  secretary: { id: number };
  prmaster: { id: number };
  sexmaster: { id: number };
  sexmastress: { id: number };
  gigmaster: { id: number };
  gigmasterKK: { id: number };
  gigmasterDK: { id: number };
  gigmasterMK: { id: number };
}
