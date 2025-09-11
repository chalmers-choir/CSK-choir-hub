import { bookModel } from '@db';

export async function getAllBooks() {
  return bookModel.findAll();
}

export async function getBookById(bookId: number) {
  return bookModel.findById(bookId);
}

export async function deleteBook(bookId: number) {
  await bookModel.deleteById(bookId);
}
