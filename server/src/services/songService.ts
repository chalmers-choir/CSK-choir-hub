import { songModel } from '@db';

export async function getAllSongs() {
  return songModel.findAll();
}

export async function deleteSong(songId: number) {
  await songModel.deleteById(songId);
}

export async function getSongById(songId: number) {
  return songModel.findById(songId);
}
