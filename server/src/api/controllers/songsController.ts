import * as songService from '@services/songService';
import { Request, Response } from 'express';

// Get all songs
export const getSongs = async (req: Request, res: Response) => {
  try {
    const songs = await songService.getAllSongs();
    res.json({ songs });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a song by ID
export const deleteSong = async (req: Request, res: Response) => {
  try {
    const songId = parseInt(req.params.id, 10);
    if (isNaN(songId)) return res.status(400).json({ error: 'Invalid song ID' });

    await songService.deleteSong(songId);
    return res.status(204).send();
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
};

// Assign a tag to a song
export const assignTagToSong = async (req: Request, res: Response) => {
  try {
    const songId = parseInt(req.params.id, 10);
    const { tagId } = req.body;

    if (isNaN(songId) || !tagId) {
      return res.status(400).json({ error: 'Invalid song ID or tag ID' });
    }

    await songService.addTag(songId, tagId);
    return res.status(200).json({ message: 'Tag added to song successfully' });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
};

// Remove a tag from a song
export const removeTagFromSong = async (req: Request, res: Response) => {
  try {
    const songId = parseInt(req.params.id, 10);
    const { tagId } = req.body;

    if (isNaN(songId) || !tagId) {
      return res.status(400).json({ error: 'Invalid song ID or tag ID' });
    }

    await songService.removeTag(songId, tagId);
    return res.status(200).json({ message: 'Tag removed from song successfully' });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
};
