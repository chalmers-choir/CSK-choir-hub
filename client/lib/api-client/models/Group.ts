/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { GroupSummary } from './GroupSummary';
export type Group = (GroupSummary & {
    description?: string;
    members: Array<number>;
    roles: Array<number>;
    parents: Array<number>;
    children: Array<number>;
});

