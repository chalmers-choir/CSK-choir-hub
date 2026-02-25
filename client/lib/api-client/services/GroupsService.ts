/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Group } from '../models/Group';
import type { GroupType } from '../models/GroupType';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class GroupsService {
    /**
     * List groups
     * @returns any Groups fetched
     * @throws ApiError
     */
    public static getGroups({
        type,
    }: {
        /**
         * Filter groups by type
         */
        type?: GroupType,
    }): CancelablePromise<{
        groups?: Array<Group>;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/groups',
            query: {
                'type': type,
            },
        });
    }
    /**
     * Create group
     * Creates a new group (Admins only).
     * @returns any Group created
     * @throws ApiError
     */
    public static addGroup({
        requestBody,
    }: {
        /**
         * Group to create
         */
        requestBody: {
            name: string;
            type: GroupType;
            description?: string;
        },
    }): CancelablePromise<{
        group?: Group;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/groups',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Update group
     * Updates name/description (Admins only).
     * @returns any Group updated
     * @throws ApiError
     */
    public static updateGroup({
        groupId,
        requestBody,
    }: {
        /**
         * ID of the group
         */
        groupId: number,
        /**
         * Group fields to update
         */
        requestBody: {
            name?: string;
            description?: string;
        },
    }): CancelablePromise<{
        group?: Group;
    }> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/groups/{groupId}',
            path: {
                'groupId': groupId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Delete group
     * Deletes a group (Admins only).
     * @returns void
     * @throws ApiError
     */
    public static deleteGroup({
        groupId,
    }: {
        /**
         * ID of the group
         */
        groupId: number,
    }): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/groups/{groupId}',
            path: {
                'groupId': groupId,
            },
        });
    }
    /**
     * Add user to group
     * Adds a user to the group (Admins only).
     * @returns void
     * @throws ApiError
     */
    public static addUserToGroup({
        groupId,
        requestBody,
    }: {
        /**
         * ID of the group
         */
        groupId: number,
        requestBody: {
            userId: number;
        },
    }): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/groups/{groupId}/users',
            path: {
                'groupId': groupId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Remove user from group
     * Removes a user from the group (Admins only).
     * @returns void
     * @throws ApiError
     */
    public static removeUserFromGroup({
        groupId,
        userId,
    }: {
        /**
         * ID of the group
         */
        groupId: number,
        /**
         * ID of the user to remove
         */
        userId: number,
    }): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/groups/{groupId}/users',
            path: {
                'groupId': groupId,
            },
            query: {
                'userId': userId,
            },
        });
    }
    /**
     * Add role to group
     * Assigns a role to the group (Admins only).
     * @returns void
     * @throws ApiError
     */
    public static addRoleToGroup({
        groupId,
        requestBody,
    }: {
        /**
         * ID of the group
         */
        groupId: number,
        requestBody: {
            roleId: number;
        },
    }): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/groups/{groupId}/roles',
            path: {
                'groupId': groupId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Remove role from group
     * Removes a role from the group (Admins only).
     * @returns void
     * @throws ApiError
     */
    public static removeRoleFromGroup({
        groupId,
        roleId,
    }: {
        /**
         * ID of the group
         */
        groupId: number,
        /**
         * ID of the role to remove
         */
        roleId: number,
    }): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/groups/{groupId}/roles',
            path: {
                'groupId': groupId,
                'roleId': roleId,
            },
        });
    }
    /**
     * Add subgroup
     * Adds a subgroup to a parent group (Admins only).
     * @returns void
     * @throws ApiError
     */
    public static addGroupToGroup({
        groupId,
        requestBody,
    }: {
        /**
         * ID of the parent group
         */
        groupId: number,
        requestBody: {
            subgroupId: number;
        },
    }): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/groups/{groupId}/groups',
            path: {
                'groupId': groupId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Remove subgroup
     * Removes a subgroup from a parent group (Admins only).
     * @returns void
     * @throws ApiError
     */
    public static removeGroupFromGroup({
        groupId,
        subgroupId,
    }: {
        /**
         * ID of the parent group
         */
        groupId: number,
        /**
         * ID of the subgroup to remove
         */
        subgroupId: number,
    }): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/groups/{groupId}/groups',
            path: {
                'groupId': groupId,
                'subgroupId': subgroupId,
            },
        });
    }
}
