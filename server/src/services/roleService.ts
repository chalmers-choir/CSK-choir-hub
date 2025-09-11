import { roleModel } from '@db';

export async function getAllRoles() {
  return roleModel.findAll();
}

export async function deleteRole(roleId: number) {
  await roleModel.deleteById(roleId);
}

/**
 * Assign a role to a user.
 * @param {number} userId - The user ID.
 * @param {number} roleId - The role ID to assign.
 * @returns {Promise<void>}
 */
export async function assignUser(userId: number, roleId: number): Promise<void> {
  await roleModel.assignUser(userId, roleId);
}

/**
 * Remove a role from a user.
 * @param {number} userId - The user ID.
 * @param {number} roleId - The role to remove.
 * @returns {Promise<void>}
 */
export async function removeUser(roleId: number): Promise<void> {
  await roleModel.removeUser(roleId);
}
