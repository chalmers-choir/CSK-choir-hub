/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Tag } from '../models/Tag';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class TagsService {
    /**
     * List tags
     * @returns any Tags fetched
     * @throws ApiError
     */
    public static getTags(): CancelablePromise<{
        tags?: Array<Tag>;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/tags',
        });
    }
    /**
     * Create tag
     * Creates a new tag (Admins only).
     * @returns any Tag created
     * @throws ApiError
     */
    public static createTag({
        requestBody,
    }: {
        requestBody: {
            name: string;
        },
    }): CancelablePromise<{
        tag?: Tag;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/tags',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Delete tag
     * Deletes a tag (Admins only).
     * @returns void
     * @throws ApiError
     */
    public static deleteTag({
        tagId,
    }: {
        /**
         * ID of the tag
         */
        tagId: number,
    }): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/tags/{tagId}',
            path: {
                'tagId': tagId,
            },
        });
    }
}
