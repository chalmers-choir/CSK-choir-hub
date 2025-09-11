import { groupModel } from '@db';

export async function getAllGroups() {
  return groupModel.findAll();
}

export async function deleteGroup(groupId: number) {
  await groupModel.deleteById(groupId);
}
