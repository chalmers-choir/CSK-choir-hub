/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Attendance } from '../models/Attendance';
import type { AttendanceStatus } from '../models/AttendanceStatus';
import type { CSKEvent } from '../models/CSKEvent';
import type { CSKEventSummary } from '../models/CSKEventSummary';
import type { Registration } from '../models/Registration';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class EventsService {
    /**
     * List events
     * Returns all events in chronological order.
     * @returns any Events fetched
     * @throws ApiError
     */
    public static getEvents(): CancelablePromise<{
        events: Array<CSKEvent>;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/events',
        });
    }
    /**
     * Create event
     * Creates a new event (Admins only).
     * @returns any Event created
     * @throws ApiError
     */
    public static addEvent({
        requestBody,
    }: {
        /**
         * Event data
         */
        requestBody: CSKEventSummary,
    }): CancelablePromise<{
        event: CSKEvent;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/events',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Get event
     * Returns an event by ID.
     * @returns any Event fetched
     * @throws ApiError
     */
    public static getEventById({
        eventId,
    }: {
        /**
         * ID of the event
         */
        eventId: number,
    }): CancelablePromise<{
        event: CSKEvent;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/events/{eventId}',
            path: {
                'eventId': eventId,
            },
        });
    }
    /**
     * Update event
     * Updates an existing event by ID (Admins only).
     * @returns any Event updated
     * @throws ApiError
     */
    public static updateEvent({
        eventId,
        requestBody,
    }: {
        /**
         * ID of the event
         */
        eventId: number,
        /**
         * Event fields to update
         */
        requestBody: {
            name?: string;
            type?: 'REHEARSAL' | 'CONCERT' | 'GIG' | 'PARTY' | 'MEETING' | 'OTHER';
            description?: string;
            dateStart?: string;
            dateEnd?: string;
            place?: string;
            requiresAttendance?: boolean;
            requiresRegistration?: boolean;
        },
    }): CancelablePromise<{
        event?: CSKEvent;
    }> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/events/{eventId}',
            path: {
                'eventId': eventId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Delete event
     * Deletes an event by ID (Admins only).
     * @returns void
     * @throws ApiError
     */
    public static deleteEvent({
        eventId,
    }: {
        /**
         * ID of the event
         */
        eventId: number,
    }): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/events/{eventId}',
            path: {
                'eventId': eventId,
            },
        });
    }
    /**
     * Register user for event
     * Marks a user's registration for the specified event.
     * @returns any Registration created
     * @throws ApiError
     */
    public static markRegistration({
        eventId,
        requestBody,
    }: {
        /**
         * ID of the event
         */
        eventId: number,
        requestBody: {
            userId: number;
            comments?: string;
            dietaryRestrictions?: string;
        },
    }): CancelablePromise<{
        registration: Registration;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/events/{eventId}/registrations',
            path: {
                'eventId': eventId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Unregister user from event
     * Removes a user's registration for the specified event.
     * @returns void
     * @throws ApiError
     */
    public static unmarkRegistration({
        eventId,
        requestBody,
    }: {
        /**
         * ID of the event
         */
        eventId: number,
        /**
         * Registration details
         */
        requestBody: {
            userId: number;
        },
    }): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/events/{eventId}/registrations',
            path: {
                'eventId': eventId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Update attendance
     * Marks a user's attendance for the specified event.
     * @returns any Attendance updated
     * @throws ApiError
     */
    public static markAttendance({
        eventId,
        requestBody,
    }: {
        /**
         * ID of the event
         */
        eventId: number,
        requestBody: {
            status?: AttendanceStatus;
            userId: number;
        },
    }): CancelablePromise<{
        attendance: Attendance;
    }> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/events/{eventId}/attendances',
            path: {
                'eventId': eventId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
}
