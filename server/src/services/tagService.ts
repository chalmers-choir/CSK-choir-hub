import { tagModel } from '@db';
import { NotFoundError } from '@utils';

/**
 * Get all tags from the database.
 * @returns All tags from the database
 */
export async function getAllTags() {
  return await tagModel.findAll();
}

/**
 * Create a new tag.
 * @param tagData - Data for the new tag
 * @returns The created tag
 */
export async function createTag(tagData: { name: string }) {
  return await tagModel.create(tagData);
}

/**
 * Delete a tag by its ID.
 * @param tagId - ID of the tag to delete
 */
export async function deleteTag(tagId: number) {
  await tagModel.deleteById(tagId);
}

/**
 * Update a tag by its ID.
 * @param tagId ID of the tag to update
 * @param tagData Data to update the tag
 * @returns The updated tag
 */
export async function updateTag(tagId: number, tagData: { name: string }) {
  const tag = await tagModel.findById(tagId);
  if (!tag) throw new NotFoundError('Tag not found');

  return await tagModel.update(tagId, tagData);
}
