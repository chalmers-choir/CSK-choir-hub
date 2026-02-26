import { prisma } from "@db";
import { type Prisma } from "@prisma/generated/client";

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
  return prisma.book.findMany();
}

/**
 * Find a book by its ID.
 * @param bookId Book ID
 */
export async function findById(bookId: number) {
  return prisma.book.findUnique({
    where: { id: bookId },
    include: {
      bookSongs: {
        include: {
          song: true,
        },
      },
    },
  });
}

/**
 * Assign a book to a song.
 * @param bookId Book ID
 * @param songId Song ID
 */
export async function addSong(bookId: number, songId: number) {
  return prisma.book.update({
    where: { id: bookId },
    data: {
      bookSongs: {
        create: {
          song: { connect: { id: songId } },
        },
      },
    },
  });
}

/**
 * Remove a song from a book.
 * @param bookId Book ID
 * @param songId Song ID
 */
export async function removeSong(bookId: number, songId: number) {
  return prisma.book.update({
    where: { id: bookId },
    data: {
      bookSongs: {
        delete: {
          bookId_songId: {
            bookId,
            songId,
          },
        },
      },
    },
  });
}
