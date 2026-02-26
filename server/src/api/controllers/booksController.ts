import * as bookService from "@services/bookService";
import { BadRequestError } from "@utils/errors";
import { type NextFunction, type Request, type Response } from "express";

// Get all books
export const getBooks = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const books = await bookService.getAllBooks();

    return res.json({ books });
  } catch (error) {
    return next(error);
  }
};

// Get a book by ID
export const getBookWithId = async (req: Request, res: Response, next: NextFunction) => {
  const bookId = parseInt(req.params.bookId, 10);

  if (isNaN(bookId)) return next(new BadRequestError("Invalid book ID"));

  try {
    const book = await bookService.getBookById(bookId);

    return res.json({ book });
  } catch (error) {
    return next(error);
  }
};

// Create a new book
export const createBook = async (req: Request, res: Response, next: NextFunction) => {
  const { title } = req.body;

  if (!title) return next(new BadRequestError("Title is required"));

  try {
    const newBook = await bookService.createBook({ title });

    return res.status(201).json({ book: newBook });
  } catch (error) {
    return next(error);
  }
};

// Delete a book by ID
export const deleteBook = async (req: Request, res: Response, next: NextFunction) => {
  const bookId = parseInt(req.params.bookId, 10);

  if (isNaN(bookId)) return next(new BadRequestError("Invalid book ID"));

  try {
    await bookService.deleteBook(bookId);

    return res.status(204).send();
  } catch (error) {
    return next(error);
  }
};

// Add a song to a book
export const addSongToBook = async (req: Request, res: Response, next: NextFunction) => {
  const bookId = parseInt(req.params.bookId, 10);

  if (isNaN(bookId)) return next(new BadRequestError("Invalid book ID"));

  const { songId } = req.body;

  if (!songId) return next(new BadRequestError("songId is required"));

  try {
    await bookService.addSongToBook(bookId, songId);

    return res.status(201).send();
  } catch (error) {
    return next(error);
  }
};

// Remove a song from a book
export const removeSongFromBook = async (req: Request, res: Response, next: NextFunction) => {
  const bookId = parseInt(req.params.bookId, 10);

  if (isNaN(bookId)) return next(new BadRequestError("Invalid book ID"));

  const { songId } = req.body;

  if (!songId) return next(new BadRequestError("songId is required"));

  try {
    await bookService.removeSongFromBook(bookId, songId);

    return res.status(204).send();
  } catch (error) {
    return next(error);
  }
};
