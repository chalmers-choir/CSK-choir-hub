import { prisma } from "@db";
import { type Prisma } from "@prisma/generated/client";

/**
 * Create a new song in the database.
 * @param data Tag creation data (name, etc.)
 */
export async function create(data: Prisma.TagCreateInput) {
  return prisma.tag.create({ data });
}

/**
 * Delete a tag by its ID.
 * @param id Tag ID
 */
export async function deleteById(tagId: number) {
  return prisma.tag.delete({ where: { id: tagId } });
}

/**
 * List tags
 */
export async function findAll() {
  return prisma.tag.findMany({});
}

/**
 * Find a tag by its ID.
 * @param id Tag ID
 */
export async function findById(tagId: number) {
  return prisma.tag.findUnique({ where: { id: tagId } });
}

/**
 * Update a tag by its ID.
 * @param id Tag ID
 * @param data Tag update data (name, etc.)
 */
export async function update(tagId: number, data: Prisma.TagUpdateInput) {
  return prisma.tag.update({ where: { id: tagId }, data });
}

/**
 * Assign a tag to a song.
 * @param tagId Tag ID
 * @param songId Song ID
 */
export async function assignToSong(tagId: number, songId: number) {
  return prisma.tag.update({
    where: { id: tagId },
    data: {
      songs: {
        connect: { id: songId },
      },
    },
  });
}

/**
 * Remove a song from a tag.
 * @param tagId Tag ID
 * @param songId Song ID
 */
export async function removeFromSong(tagId: number, songId: number) {
  return prisma.tag.update({
    where: { id: tagId },
    data: {
      songs: {
        disconnect: { id: songId },
      },
    },
  });
}
