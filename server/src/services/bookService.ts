import { bookModel } from '@db';

export async function getAllBooks() {
  return bookModel.findAll();
}

export async function getBookById(bookId: number) {
  return bookModel.findById(bookId);
}

export async function createBook(data: { name: string }) {
  return bookModel.create(data);
}

export async function deleteBook(bookId: number) {
  await bookModel.deleteById(bookId);
}
