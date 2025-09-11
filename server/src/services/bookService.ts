import * as bookModel from '@db';

export async function getAllBooks() {
  return bookModel.findAll();
}

export async function deleteBook(bookId: number) {
  await bookModel.deleteById(bookId);
}
