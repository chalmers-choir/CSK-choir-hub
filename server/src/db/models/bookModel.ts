import { prisma } from '@db/prisma';

import { Prisma } from '@prisma/client';

/**
 * Create a new song in the database.
 * @param data Book creation data (title, author, etc.)
 */
export async function create(data: Prisma.BookCreateInput) {
    return prisma.book.create({ data });
}

/**
 * Delete a book by its ID.
 * @param id Book ID
 */
export async function deleteById(bookId: number) {
    return prisma.book.delete({ where: { id: bookId } });
}

/**
 * List books
 */
export async function findAll() {
    return prisma.book.findMany({
        include: {
            songs: true,
        },
    });
}

/**
 * Assign a book to a song.
 * @param bookId Book ID
 * @param songId Song ID
 */
export async function assignSongToBook(bookId: number, songId: number) {
    return prisma.book.update({
        where: { id: bookId },
        data: {
            songs: {
                connect: { id: songId },
            },
        },
    });
}

/**
 * Remove a song from a book.
 * @param bookId Book ID
 * @param songId Song ID
 */
export async function removeSongFromBook(bookId: number, songId: number) {
    return prisma.book.update({
        where: { id: bookId },
        data: {
            songs: {
                disconnect: { id: songId },
            },
        },
    });
}