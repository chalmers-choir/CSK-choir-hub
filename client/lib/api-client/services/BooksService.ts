/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Book } from '../models/Book';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class BooksService {
    /**
     * List books
     * Returns all song books.
     * @returns any Books fetched
     * @throws ApiError
     */
    public static getBooks(): CancelablePromise<{
        books?: Array<Book>;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/books',
        });
    }
    /**
     * Create book
     * Creates a new book (Admins only).
     * @returns any Book created
     * @throws ApiError
     */
    public static createBook({
        requestBody,
    }: {
        /**
         * Book to create
         */
        requestBody: {
            title: string;
        },
    }): CancelablePromise<{
        book?: Book;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/books',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Get book
     * Returns a book by ID.
     * @returns any Book fetched
     * @throws ApiError
     */
    public static getBookById({
        bookId,
    }: {
        /**
         * ID of the book
         */
        bookId: number,
    }): CancelablePromise<{
        book?: Book;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/books/{bookId}',
            path: {
                'bookId': bookId,
            },
        });
    }
    /**
     * Delete book
     * Deletes a book by ID (Admins only).
     * @returns void
     * @throws ApiError
     */
    public static deleteBook({
        bookId,
    }: {
        /**
         * ID of the book
         */
        bookId: number,
    }): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/books/{bookId}',
            path: {
                'bookId': bookId,
            },
        });
    }
    /**
     * Add song to book
     * Adds a song to the specified book (Admins only).
     * @returns void
     * @throws ApiError
     */
    public static addSongToBook({
        bookId,
        requestBody,
    }: {
        /**
         * ID of the book
         */
        bookId: number,
        /**
         * Song to add
         */
        requestBody: {
            songId: number;
        },
    }): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/books/{bookId}/songs',
            path: {
                'bookId': bookId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Remove song from book
     * Removes a song from the specified book (Admins only).
     * @returns void
     * @throws ApiError
     */
    public static removeSongFromBook({
        bookId,
        songId,
    }: {
        /**
         * ID of the book
         */
        bookId: number,
        /**
         * ID of the song
         */
        songId: number,
    }): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/books/{bookId}/songs/{songId}',
            path: {
                'bookId': bookId,
                'songId': songId,
            },
        });
    }
}
