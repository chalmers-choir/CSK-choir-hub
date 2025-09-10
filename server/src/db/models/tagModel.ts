import { prisma } from '@db/prisma';

import { Prisma } from '@prisma/client';

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
 * Assign a tag to a song.
 * @param tagId Tag ID
 * @param songId Song ID
 */
export async function assignTagToSong(tagId: number, songId: number) {
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
export async function removeTagFromSong(tagId: number, songId: number) {
    return prisma.tag.update({
        where: { id: tagId },
        data: {
            songs: {
                disconnect: { id: songId },
            },
        },
    });
}