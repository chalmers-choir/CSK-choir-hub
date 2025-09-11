import * as roleModel from '@db';

export async function getAllRoles() {
  return roleModel.findAll();
}

export async function deleteRole(roleId: number) {
  await roleModel.deleteById(roleId);
}
