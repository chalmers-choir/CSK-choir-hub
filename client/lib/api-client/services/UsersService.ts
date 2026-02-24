/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { UpdateUserInput } from '../models/UpdateUserInput';
import type { User } from '../models/User';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class UsersService {
    /**
     * List users
     * @returns any Users fetched
     * @throws ApiError
     */
    public static getUsers(): CancelablePromise<{
        users?: Array<User>;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/users',
        });
    }
    /**
     * Get user
     * @returns any User fetched
     * @throws ApiError
     */
    public static getUser({
        userId,
    }: {
        /**
         * ID of the user
         */
        userId: number,
    }): CancelablePromise<{
        user?: User;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/users/{userId}',
            path: {
                'userId': userId,
            },
        });
    }
    /**
     * Delete user
     * Deletes a user (Admins only).
     * @returns void
     * @throws ApiError
     */
    public static deleteUser({
        userId,
    }: {
        /**
         * ID of the user
         */
        userId: number,
    }): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/users/{userId}',
            path: {
                'userId': userId,
            },
        });
    }
    /**
     * Update user
     * Updates a user's information.
     * @returns any User updated
     * @throws ApiError
     */
    public static updateUser({
        userId,
        requestBody,
    }: {
        /**
         * ID of the user
         */
        userId: number,
        requestBody: UpdateUserInput,
    }): CancelablePromise<{
        user?: User;
    }> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/users/{userId}',
            path: {
                'userId': userId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
}
