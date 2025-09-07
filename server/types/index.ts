import { Choir, Voice } from "@prisma/client";

export interface RegisterInput {
    email: string;
    password: string;
    username: string;
    firstName: string;
    lastName: string;
    choir: Choir;
    voice: Voice;
}