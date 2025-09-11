import { prisma } from '@db/prisma';
import { KnowledgeLevel, Prisma, Tag, Voice } from '@prisma/client';

/**
 * Create a new song in the database.
 * @param data Song creation data (title, composer, etc.)
 */
export async function createSong(data: Prisma.SongCreateInput) {
  return prisma.song.create({ data });
}

export async function findAll() {
  return prisma.song.findMany({
    include: {
      books: true,
      tags: true,
    },
  });
}

/**
 * Find a song by its unique ID.
 * @param id Song ID
 */
export async function findById(songId: number) {
  return prisma.song.findUnique({ where: { id: songId } });
}

/**
 * Update a song by its ID.
 * @param id Song ID
 * @param data Fields to update
 */
export async function updateSong(songId: number, data: Prisma.SongUpdateInput) {
  return prisma.song.update({
    where: { id: songId },
    data,
  });
}

/**
 * Delete a song by its ID.
 * @param id Song ID
 */
export async function deleteById(songId: number) {
  return prisma.song.delete({ where: { id: songId } });
}

/**
 * List songs with optional filters for bookId, voice, and tags.
 * @param filters Optional filter object
 */
export async function listSongs(filters?: { bookId?: number; tags?: Tag[] }) {
  const where: Prisma.SongWhereInput = {};
  if (filters?.bookId) {
    where.books = { some: { id: filters.bookId } };
  }
  if (filters?.tags && filters.tags.length > 0) {
    where.tags = { some: { name: { in: filters.tags.map((tag) => tag.name) } } };
  }
  return prisma.song.findMany({ where });
}

/**
 * Assign a song to a user, marking their knowledge or learning level.
 * @param userId User ID
 * @param songId Song ID
 * @param knowledgeLevel Level of knowledge (e.g., 'learning', 'known', etc.)
 */
export async function assignSongToUser(
  userId: number,
  songId: number,
  voice: Voice,
  level: KnowledgeLevel,
) {
  return prisma.songKnowledge.upsert({
    where: {
      userId_songId_voice: {
        userId,
        songId,
        voice,
      },
    },
    update: { level },
    create: { userId, songId, voice, level },
  });
}

/**
 * Remove a user's knowledge/assignment for a song.
 * @param userId User ID
 * @param songId Song ID
 */
export async function removeSongKnowledge(userId: number, songId: number, voice: Voice) {
  return prisma.songKnowledge.delete({
    where: { userId_songId_voice: { userId, songId, voice } },
  });
}

/**
 * List all users who know a given song (optionally filtered by knowledge level).
 * @param songId Song ID
 * @param knowledgeLevel Optional knowledge level filter
 */
export async function listUsersKnowingSong(songId: number, knowledgeLevel?: KnowledgeLevel) {
  return prisma.songKnowledge.findMany({
    where: {
      songId,
      ...(knowledgeLevel ? { knowledgeLevel } : {}),
    },
    include: { user: true },
  });
}

/**
 * List all songs assigned/known by a user (optionally filtered by knowledge level).
 * @param userId User ID
 * @param knowledgeLevel Optional knowledge level filter
 */
export async function listSongsForUser(userId: number, knowledgeLevel?: KnowledgeLevel) {
  return prisma.songKnowledge.findMany({
    where: {
      userId,
      ...(knowledgeLevel ? { knowledgeLevel } : {}),
    },
    include: { song: true },
  });
}
