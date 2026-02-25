/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { GroupSummary } from './GroupSummary';
import type { KnownSong } from './KnownSong';
import type { RoleSummary } from './RoleSummary';
export type User = {
    id: number;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    groups: Array<GroupSummary>;
    roles: Array<RoleSummary>;
    knownSongs: Array<KnownSong>;
    dietaryPreferences?: string;
    webRole: 'USER' | 'ADMIN';
};

