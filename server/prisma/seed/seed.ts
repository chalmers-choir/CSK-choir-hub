import { PrismaClient } from "@prisma/client";

import seedUsers from "./seedUsers";
import seedRoles from "./seedRoles";
import seedGroups from "./seedGroups";
import seedSongs from "./seedSongs";
import seedBooks from "./seedBooks";
import seedEvents from "./seedEvents";
import seedEventRegistrations from "./seedEventRegistrations";
import seedEventAttendances from "./seedEventAttendances";
import seedUserSongKnowledges from "./seedSongKnowledges";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // Create Users
  const users = await seedUsers(prisma);
  console.log("Users created:", Object.keys(users).length);

  // Create Groups
  const groups = await seedGroups(prisma, users);
  console.log("Groups created:", Object.keys(groups).length);

  // Create Roles
  const roles = await seedRoles(prisma, groups, users);
  console.log("Roles created:", Object.keys(roles).length);

  // Create Books
  const books = await seedBooks(prisma);
  console.log("Books created:", Object.keys(books).length);

  // Create Songs
  const songs = await seedSongs(prisma, books);
  console.log("Songs created:", Object.keys(songs).length);

  // Create Events
  const events = await seedEvents(prisma);
  console.log("Events created:", Object.keys(events).length);

  // Create Event Registrations
  await seedEventRegistrations(prisma, users, events);

  // Create Event Attendance
  await seedEventAttendances(prisma, users, events);

  // Create User Song Knowledge
  await seedUserSongKnowledges(prisma, users, songs);

  console.log("Seeding finished.");
}

main()
    .catch(e => console.error(e))
    .finally(async () => {
        await prisma.$disconnect();
    });
