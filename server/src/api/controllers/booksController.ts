import * as bookService from '@services/bookService';
import { Request, Response } from 'express';

// Get all books
export const getBooks = async (req: Request, res: Response) => {
  try {
    const books = await bookService.getAllBooks();
    res.json({ books });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

// Get a book by ID
export const getBookWithId = async (req: Request, res: Response) => {
  try {
    const bookId = parseInt(req.params.bookId, 10);
    if (isNaN(bookId)) return res.status(400).json({ error: 'Invalid book ID' });

    const book = await bookService.getBookById(bookId);
    if (!book) return res.status(404).json({ error: 'Book not found' });

    return res.json({ book });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
};

// Create a new book
export const createBook = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }

    const newBook = await bookService.createBook({ name });
    return res.status(201).json({ book: newBook });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
};

// Delete a book by ID
export const deleteBook = async (req: Request, res: Response) => {
  try {
    const bookId = parseInt(req.params.bookId, 10);
    if (isNaN(bookId)) return res.status(400).json({ error: 'Invalid book ID' });

    await bookService.deleteBook(bookId);
    return res.status(204).send();
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
};

// Add a song to a book
export const addSongToBook = async (req: Request, res: Response) => {
  try {
    const bookId = parseInt(req.params.bookId, 10);
    if (isNaN(bookId)) return res.status(400).json({ error: 'Invalid book ID' });
    const { songId } = req.body;
    if (!songId) {
      return res.status(400).json({ error: 'songId is required' });
    }

    await bookService.addSongToBook(bookId, songId);
    return res.status(200).json({ message: 'Song added to book successfully' });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
};

// Remove a song from a book
export const removeSongFromBook = async (req: Request, res: Response) => {
  try {
    const { bookId, songId } = req.body;
    if (!bookId || !songId) {
      return res.status(400).json({ error: 'bookId and songId are required' });
    }

    await bookService.removeSongFromBook(bookId, songId);
    return res.status(200).json({ message: 'Song removed from book successfully' });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
};
