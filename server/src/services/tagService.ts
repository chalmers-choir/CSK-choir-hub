import * as tagModel from '@db';

export async function getAllTags() {
  return tagModel.findAll();
}

export async function createTag(tagData: { name: string }) {
  return tagModel.create(tagData);
}

export async function deleteTag(tagId: number) {
  await tagModel.deleteById(tagId);
}
