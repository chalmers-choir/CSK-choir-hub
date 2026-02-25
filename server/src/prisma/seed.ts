import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/generated/client";

import seedBooks from "./seed/seedBooks";
import seedEventAttendances from "./seed/seedEventAttendances";
import seedEventRegistrations from "./seed/seedEventRegistrations";
import seedEvents from "./seed/seedEvents";
import seedGroups from "./seed/seedGroups";
import seedRoles from "./seed/seedRoles";
import seedUserSongKnowledges from "./seed/seedSongKnowledges";
import seedSongs from "./seed/seedSongs";
import seedTags from "./seed/seedTags";
import seedUsers from "./seed/seedUsers";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });

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
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
