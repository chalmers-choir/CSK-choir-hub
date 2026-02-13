import { songModel, tagModel } from "@db";

/**
 * Gets all songs in the database.
 * @returns All songs in the database
 */
export async function getAllSongs() {
  return await songModel.findAll();
}

/**
 * Create new song
 * @param data Data for the new song
 * @returns The created song
 */
export async function createSong(data: { title: string }) {
  return await songModel.createSong(data);
}

/**
 * Delete a song by its ID
 * @param songId
 */
export async function deleteSong(songId: number) {
  await songModel.deleteById(songId);
}

/**
 * Get a song by its ID
 * @param songId
 * @returns The song with the given ID
 */
export async function getSongById(songId: number) {
  return await songModel.findById(songId);
}

/**
 * Add a tag to a song.
 * @param songId - The ID of the song.
 * @param tagId - The ID of the tag.
 * @returns The result of the operation.
 */
export async function addTag(songId: number, tagId: number) {
  return await tagModel.assignToSong(tagId, songId);
}

/**
 * Remove a tag from a song.
 * @param songId - The ID of the song.
 * @param tagId - The ID of the tag.
 * @returns The result of the operation.
 */
export async function removeTag(songId: number, tagId: number) {
  return await tagModel.removeFromSong(tagId, songId);
}
