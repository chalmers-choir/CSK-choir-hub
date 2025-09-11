import * as bookService from '@services/bookService';
import { Request, Response } from 'express';

// Get all books
export const getBooksHandler = async (req: Request, res: Response) => {
  try {
    const books = await bookService.getAllBooks();
    res.json({ books });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a book by ID
export const deleteBookHandler = async (req: Request, res: Response) => {
  try {
    const bookId = parseInt(req.params.id, 10);
    if (isNaN(bookId)) return res.status(400).json({ error: 'Invalid book ID' });

    await bookService.deleteBook(bookId);
    return res.status(204).send();
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
};
