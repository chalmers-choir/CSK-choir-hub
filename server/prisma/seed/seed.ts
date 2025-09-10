import { PrismaClient } from "@prisma/client";

import seedUsers from "./seedUsers";
import seedRoles from "./seedRoles";
import seedGroups from "./seedGroups";
import seedSongs from "./seedSongs";
import seedBooks from "./seedBooks";
import seedEvents from "./seedEvents";
import seedTags from "./seedTags";
import seedEventRegistrations from "./seedEventRegistrations";
import seedEventAttendances from "./seedEventAttendances";
import seedUserSongKnowledges from "./seedSongKnowledges";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // Create Users
  // TODO: Create more users
  const users = await seedUsers(prisma);
  console.log("Users created:", Object.keys(users).length);

  // Create Groups + Assign Users to Groups
  // TODO: Assign the new users to Groups
  const groups = await seedGroups(prisma, users);
  console.log("Groups created:", Object.keys(groups).length);
  
  // Create Roles + Assign Roles to Users and Groups
  // TODO: Assign the new users to Roles
  const roles = await seedRoles(prisma, groups, users);
  console.log("Roles created:", Object.keys(roles).length);

  // Create Books
  const books = await seedBooks(prisma);
  console.log("Books created:", Object.keys(books).length);

  const tags = await seedTags(prisma);

  // Create Songs + Assign Songs to Books + Assign Tags to Songs
  // TODO: Create more songs
  const songs = await seedSongs(prisma, books, tags);
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
