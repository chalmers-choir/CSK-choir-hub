/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Role } from '../models/Role';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class RolesService {
    /**
     * List roles
     * @returns any Roles fetched
     * @throws ApiError
     */
    public static getRoles(): CancelablePromise<{
        roles?: Array<Role>;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/roles',
        });
    }
    /**
     * Create role
     * Creates a new role.
     * @returns any Role created
     * @throws ApiError
     */
    public static createRole({
        requestBody,
    }: {
        requestBody: {
            name: string;
            description?: string;
        },
    }): CancelablePromise<{
        role?: Role;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/roles',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Delete role
     * Deletes a role (Admins only).
     * @returns void
     * @throws ApiError
     */
    public static deleteRole({
        roleId,
    }: {
        /**
         * ID of the role
         */
        roleId: number,
    }): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/roles/{roleId}',
            path: {
                'roleId': roleId,
            },
        });
    }
    /**
     * Assign user to role
     * Assigns a user to a role (Admins only).
     * @returns void
     * @throws ApiError
     */
    public static assignUserToRole({
        roleId,
        requestBody,
    }: {
        /**
         * ID of the role
         */
        roleId: number,
        requestBody: {
            userId: number;
        },
    }): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/roles/{roleId}/user',
            path: {
                'roleId': roleId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Remove user from role
     * Removes the user assignment from the role (Admins only).
     * @returns void
     * @throws ApiError
     */
    public static removeUserFromRole({
        roleId,
    }: {
        /**
         * ID of the role
         */
        roleId: number,
    }): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/roles/{roleId}/user',
            path: {
                'roleId': roleId,
            },
        });
    }
}
