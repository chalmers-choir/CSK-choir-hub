import { KnowledgeLevel, type PrismaClient, Voice } from "@prisma/generated/client";

import { type Songs } from "./seedSongs";
import { type Users } from "./seedUsers";

export default async function seedSongKnowledges(
  prisma: PrismaClient,
  users: Users,
  songs: Songs,
): Promise<void> {
  await prisma.songKnowledge.createMany({
    data: [
      {
        userId: users.alice.id,
        songId: songs.island.id,
        level: KnowledgeLevel.PARTY,
        voice: Voice.A,
      },
      {
        userId: users.alice.id,
        songId: songs.island.id,
        level: KnowledgeLevel.GIG,
        voice: Voice.B,
      },
      {
        userId: users.bob.id,
        songId: songs.utandig.id,
        level: KnowledgeLevel.UTANTILL,
        voice: Voice.T,
      },
      {
        userId: users.bob.id,
        songId: songs.bastu.id,
        level: KnowledgeLevel.PARTY,
        voice: Voice.S,
      },
      {
        userId: users.charles.id,
        songId: songs.bastu.id,
        level: KnowledgeLevel.PARTY,
        voice: Voice.S,
      },
      {
        userId: users.diana.id,
        songId: songs.bastu.id,
        level: KnowledgeLevel.UTANTILL,
        voice: Voice.A,
      },
    ],
  });
}
