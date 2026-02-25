/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { LoginUserInput } from '../models/LoginUserInput';
import type { RegisterUserInput } from '../models/RegisterUserInput';
import type { User } from '../models/User';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AuthService {
    /**
     * Register a new user
     * @returns any User registered
     * @throws ApiError
     */
    public static registerUser({
        requestBody,
    }: {
        requestBody: RegisterUserInput,
    }): CancelablePromise<{
        user?: User;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/auth/register',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Login a user
     * @returns any Login successful
     * @throws ApiError
     */
    public static loginUser({
        requestBody,
    }: {
        requestBody: LoginUserInput,
    }): CancelablePromise<{
        user?: User;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/auth/login',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Logout current user
     * @returns any Session cleared
     * @throws ApiError
     */
    public static logout(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/auth/logout',
        });
    }
    /**
     * Validate session
     * @returns any Current authenticated user
     * @throws ApiError
     */
    public static authenticate(): CancelablePromise<{
        user?: User;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/auth/authenticate',
            errors: {
                401: `Not authenticated`,
            },
        });
    }
}
