import * as bookService from '@services/bookService';
import { Request, Response } from 'express';

// Get all books
export const getBooks = async (req: Request, res: Response) => {
  const books = await bookService.getAllBooks();
  res.json({ books });
};

// Get a book by ID
export const getBookWithId = async (req: Request, res: Response) => {
  const bookId = parseInt(req.params.bookId, 10);
  if (isNaN(bookId)) return res.status(400).json({ error: 'Invalid book ID' });

  const book = await bookService.getBookById(bookId);

  return res.json({ book });
};

// Create a new book
export const createBook = async (req: Request, res: Response) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ error: 'Name is required' });
  }

  const newBook = await bookService.createBook({ name });
  return res.status(201).json({ book: newBook });
};

// Delete a book by ID
export const deleteBook = async (req: Request, res: Response) => {
  const bookId = parseInt(req.params.bookId, 10);
  if (isNaN(bookId)) return res.status(400).json({ error: 'Invalid book ID' });

  await bookService.deleteBook(bookId);
  return res.status(204).send();
};

// Add a song to a book
export const addSongToBook = async (req: Request, res: Response) => {
  const bookId = parseInt(req.params.bookId, 10);
  if (isNaN(bookId)) return res.status(400).json({ error: 'Invalid book ID' });

  const { songId } = req.body;
  if (!songId) {
    return res.status(400).json({ error: 'songId is required' });
  }

  await bookService.addSongToBook(bookId, songId);
  return res.status(204).send();
};

// Remove a song from a book
export const removeSongFromBook = async (req: Request, res: Response) => {
  const bookId = parseInt(req.params.bookId, 10);
  if (isNaN(bookId)) return res.status(400).json({ error: 'Invalid book ID' });

  const { songId } = req.body;
  if (!songId) {
    return res.status(400).json({ error: 'songId is required' });
  }

  await bookService.removeSongFromBook(bookId, songId);
  return res.status(204).send();
};
