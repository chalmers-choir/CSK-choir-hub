import { prisma } from "@db";
import { type KnowledgeLevel, type Voice } from "@prisma/generated/client";

/**
 * Update the knowledge level of a user for a specific song.
 * @param songId - The ID of the song.
 * @param userId - The ID of the user.
 */
export async function updateUserSongKnowledgeLevel(
  userId: number,
  songId: number,
  voice: Voice,
  level: KnowledgeLevel,
) {
  return await prisma.songKnowledge.upsert({
    where: {
      userId_songId_voice: {
        userId: userId,
        songId: songId,
        voice: voice,
      },
    },
    create: {
      user: { connect: { id: userId } },
      song: { connect: { id: songId } },
      voice: voice,
      level: level,
    },
    update: {
      level: level,
    },
  });
}

/**
 * Remove a user's knowledge level for a specific song.
 * @param userId - The ID of the user.
 * @param songId - The ID of the song.
 */
export async function removeUserSongKnowledgeLevel(userId: number, songId: number, voice: Voice) {
  return await prisma.songKnowledge.deleteMany({
    where: { userId: userId, songId: songId, voice: voice },
  });
}
