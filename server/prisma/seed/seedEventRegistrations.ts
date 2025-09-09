import { PrismaClient } from "@prisma/client";
import { Users } from "./seedUsers";
import { Events } from "./seedEvents";

export default async function seedEventRegistration(prisma: PrismaClient, users: Users, events: Events): Promise<void> {
}