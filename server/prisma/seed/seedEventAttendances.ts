import { PrismaClient } from "@prisma/client";
import { Events } from "./seedEvents";
import { Users } from "./seedUsers";


export default async function seedEventAttendances(prisma: PrismaClient, users: Users, events: Events): Promise<void> {

}