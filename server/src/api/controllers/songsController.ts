import * as songService from '@services/songService';
import { Request, Response } from 'express';

// Get all songs
export const getSongs = async (req: Request, res: Response) => {
  const songs = await songService.getAllSongs();
  res.json({ songs });
};

// Create a new song
export const createSong = async (req: Request, res: Response) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: 'Song name is required' });

  const newSong = await songService.createSong({ name });
  return res.status(201).json(newSong);
};

// Delete a song by ID
export const deleteSong = async (req: Request, res: Response) => {
  const songId = parseInt(req.params.id, 10);
  if (isNaN(songId)) return res.status(400).json({ error: 'Invalid song ID' });

  await songService.deleteSong(songId);
  return res.status(204).send();
};

// Assign a tag to a song
export const assignTagToSong = async (req: Request, res: Response) => {
  const songId = parseInt(req.params.id, 10);
  const { tagId } = req.body;

  if (isNaN(songId) || !tagId) {
    return res.status(400).json({ error: 'Invalid song ID or tag ID' });
  }

  await songService.addTag(songId, tagId);
  return res.status(204).send();
};

// Remove a tag from a song
export const removeTagFromSong = async (req: Request, res: Response) => {
  const songId = parseInt(req.params.id, 10);
  const { tagId } = req.body;

  if (isNaN(songId) || !tagId) {
    return res.status(400).json({ error: 'Invalid song ID or tag ID' });
  }

  await songService.removeTag(songId, tagId);
  return res.status(204).send();
};
