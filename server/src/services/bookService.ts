import { bookModel } from "@db";
import { NotFoundError } from "@utils";

export async function getAllBooks() {
  return await bookModel.findAll();
}

export async function getBookById(bookId: number) {
  const book = await bookModel.findById(bookId);

  if (!book) throw new NotFoundError("Book not found");

  return book;
}

export async function createBook(data: { title: string }) {
  return await bookModel.create(data);
}

export async function deleteBook(bookId: number) {
  await bookModel.deleteById(bookId);
}

export async function addSongToBook(bookId: number, songId: number) {
  return await bookModel.addSong(bookId, songId);
}

export async function removeSongFromBook(bookId: number, songId: number) {
  return await bookModel.removeSong(bookId, songId);
}
