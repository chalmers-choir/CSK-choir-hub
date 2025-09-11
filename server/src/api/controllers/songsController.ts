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
