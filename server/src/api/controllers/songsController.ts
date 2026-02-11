import * as songService from '@services/songService';
import { BadRequestError } from '@utils/errors';
import { NextFunction, Request, Response } from 'express';

// Get all songs
export const getSongs = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const songs = await songService.getAllSongs();
    res.json({ songs });
  } catch (error) {
    next(error);
  }
};

// Create a new song
export const createSong = async (req: Request, res: Response, next: NextFunction) => {
  const { title } = req.body;
  if (!title) return next(new BadRequestError('Song title is required'));

  try {
    const newSong = await songService.createSong({ title });
    return res.status(201).json(newSong);
  } catch (error) {
    next(error);
  }
};

// Delete a song by ID
export const deleteSong = async (req: Request, res: Response, next: NextFunction) => {
  const songId = parseInt(req.params.id, 10);
  if (isNaN(songId)) return next(new BadRequestError('Invalid song ID'));

  try {
    await songService.deleteSong(songId);
    return res.status(204).send();
  } catch (error) {
    next(error);
  }
};

// Assign a tag to a song
export const assignTagToSong = async (req: Request, res: Response, next: NextFunction) => {
  const songId = parseInt(req.params.id, 10);
  const { tagId } = req.body;

  if (isNaN(songId) || !tagId) {
    return next(new BadRequestError('Invalid song ID or tag ID'));
  }

  try {
    await songService.addTag(songId, tagId);
    return res.status(204).send();
  } catch (error) {
    next(error);
  }
};

// Remove a tag from a song
export const removeTagFromSong = async (req: Request, res: Response, next: NextFunction) => {
  const songId = parseInt(req.params.id, 10);
  const { tagId } = req.body;

  if (isNaN(songId) || !tagId) return next(new BadRequestError('Invalid song ID or tag ID'));

  try {
    await songService.removeTag(songId, tagId);
    return res.status(204).send();
  } catch (error) {
    next(error);
  }
};
