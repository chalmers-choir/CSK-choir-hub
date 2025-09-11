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

export async function addTag(songId: number, tagId: number) {
  return songModel.addTag(songId, tagId);
}

export async function removeTag(songId: number, tagId: number) {
  return songModel.removeTag(songId, tagId);
}
