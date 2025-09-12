import { bookModel, songModel } from '@db';
import { NotFoundError } from '@utils';

export async function getAllBooks() {
  return await bookModel.findAll();
}

export async function getBookById(bookId: number) {
  const book = await bookModel.findById(bookId);
  if (!book) {
    throw new NotFoundError('Book not found');
  }
  return book;
}

export async function createBook(data: { name: string }) {
  return await bookModel.create(data);
}

export async function deleteBook(bookId: number) {
  await bookModel.deleteById(bookId);
}

export async function addSongToBook(bookId: number, songId: number) {
  const song = await songModel.findById(songId);
  const book = await bookModel.findById(bookId);
  if (!song || !book) {
    throw new NotFoundError('Either the song or the book was not found');
  }

  return await bookModel.addSong(bookId, songId);
}

export async function removeSongFromBook(bookId: number, songId: number) {
  return await bookModel.removeSong(bookId, songId);
}
