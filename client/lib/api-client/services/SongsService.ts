/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Song } from '../models/Song';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class SongsService {
    /**
     * List songs
     * @returns any Songs fetched
     * @throws ApiError
     */
    public static getSongs(): CancelablePromise<{
        songs?: Array<Song>;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/songs',
        });
    }
    /**
     * Create song
     * Creates a new song (Admins only).
     * @returns Song Song created
     * @throws ApiError
     */
    public static createSong({
        requestBody,
    }: {
        requestBody: {
            name: string;
        },
    }): CancelablePromise<Song> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/songs',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Delete song
     * Deletes a song (Admins only).
     * @returns void
     * @throws ApiError
     */
    public static deleteSong({
        songId,
    }: {
        /**
         * ID of the song
         */
        songId: number,
    }): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/songs/{songId}',
            path: {
                'songId': songId,
            },
        });
    }
    /**
     * Assign tag to song
     * Assigns an existing tag to a song (Admins only).
     * @returns void
     * @throws ApiError
     */
    public static assignTagToSong({
        songId,
        requestBody,
    }: {
        /**
         * ID of the song
         */
        songId: number,
        requestBody: {
            tagId: number;
        },
    }): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/songs/{songId}/tags',
            path: {
                'songId': songId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Remove tag from song
     * Removes a tag from a song (Admins only).
     * @returns void
     * @throws ApiError
     */
    public static removeTagFromSong({
        songId,
        requestBody,
    }: {
        /**
         * ID of the song
         */
        songId: number,
        requestBody: {
            tagId: number;
        },
    }): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/songs/{songId}/tags',
            path: {
                'songId': songId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
}
