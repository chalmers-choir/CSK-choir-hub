import * as songModel from '@db';

export async function getAllSongs() {
  return songModel.findAll();
}

export async function deleteSong(songId: number) {
  await songModel.deleteById(songId);
}
