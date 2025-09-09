import { PrismaClient } from "@prisma/client";
import { Users } from "./seedUsers";
import { Songs } from "./seedSongs";


export default async function seedSongKnowledges(prisma: PrismaClient, users: Users, songs: Songs): Promise<void> {
}