/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CSKEventType } from './CSKEventType';
export type CSKEventSummary = {
    name: string;
    type: CSKEventType;
    description?: string;
    dateStart: string;
    dateEnd?: string;
    place: string;
    requiresAttendance: boolean;
    requiresRegistration: boolean;
};

