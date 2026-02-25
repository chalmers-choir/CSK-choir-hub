/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Attendance } from './Attendance';
import type { CSKEventSummary } from './CSKEventSummary';
import type { Registration } from './Registration';
export type CSKEvent = (CSKEventSummary & {
    id: number;
    attendees?: Array<Attendance>;
    registrations?: Array<Registration>;
});

