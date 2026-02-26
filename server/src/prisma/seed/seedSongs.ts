import { type PrismaClient } from "@prisma/generated/client";
import { type Song, Voice } from "@prisma/generated/client";

import { type Books } from "./seedBooks";
import { type Tags } from "./seedTags";

export default async function seedRoles(
  prisma: PrismaClient,
  books: Books,
  tags: Tags,
): Promise<Songs> {
  // Create Songs
  const island = await prisma.song.create({
    data: {
      title: "Island",
      startingTones: "A",
      voices: [Voice.T1, Voice.T2, Voice.B1, Voice.B2],
      tags: { connect: [{ id: tags.student.id }] },
    },
  });

  const utandig = await prisma.song.create({
    data: {
      title: "Utan dig",
      startingTones: "E",
      voices: [Voice.S1, Voice.S2, Voice.A1, Voice.A2],
      tags: { connect: [{ id: tags.serenad.id }] },
    },
  });

  const helan = await prisma.song.create({
    data: {
      title: "Helan går",
      startingTones: "C",
      voices: [Voice.S, Voice.A, Voice.T, Voice.B],
      tags: { connect: [{ id: tags.student.id }] },
    },
  });

  const bastu = await prisma.song.create({
    data: {
      title: "Bastufadäs",
      startingTones: "F",
      voices: [Voice.S1, Voice.S2, Voice.A1, Voice.A2, Voice.T1, Voice.T2, Voice.B1, Voice.B2],
      tags: { connect: [{ id: tags.chalmers.id }] },
    },
  });

  return {
    island,
    utandig,
    helan,
    bastu,
  };
}

export interface Songs {
  island: Song;
  utandig: Song;
  helan: Song;
  bastu: Song;
}
