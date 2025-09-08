import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    console.log("Seeding database...");

    // Create Users
    const [admin, john, jane, bob] = await Promise.all([
        prisma.user.create({
            data: {
                email: "admin@example.com",
                passwordHash: "hashed_password_123",
                username: "admin",
                firstName: "Alice",
                lastName: "Anderson",
                choir: "KK",
                voice: "S1",
            },
        }),
        prisma.user.create({
            data: {
                email: "john.doe@example.com",
                passwordHash: "hashed_password_123",
                username: "johndoe",
                firstName: "John",
                lastName: "Doe",
                choir: "KK",
                voice: "A1",
            },
        }),
        prisma.user.create({
            data: {
                email: "jane.smith@example.com",
                passwordHash: "hashed_password_123",
                username: "janesmith",
                firstName: "Jane",
                lastName: "Smith",
                choir: "KK",
                voice: "T1",
            },
        }),
        prisma.user.create({
            data: {
                email: "bob.admin@example.com",
                passwordHash: "hashed_password_123",
                username: "bobadmin",
                firstName: "Bob",
                lastName: "Brown",
                choir: "KK",
                voice: "B1",
            },
        }),
    ]);

    // Create Songs
    const [song1, song2, song3] = await Promise.all([
        prisma.song.create({
            data: {
                name: "Ave Maria",
                page: 12,
                startingTones: "C Major",
                voices: ["S", "A", "T", "B"],
                bookId: 1
            },
        }),
        prisma.song.create({
            data: {
                name: "Ode to Joy",
                page: 45,
                startingTones: "D Major",
                voices: ["S", "A", "T", "B"],
                bookId: 1
            },
        }),
        prisma.song.create({
            data: {
                name: "Hallelujah",
                page: 78,
                startingTones: "G Major",
                voices: ["S", "A", "T", "B"],
                bookId: 1
            },
        }),
    ]);

    // Create Events
    const [rehearsal] = await Promise.all([
        prisma.event.create({
            data: {
                name: "Weekly Rehearsal",
                dateStart: new Date("2025-09-10T18:00:00Z"),
                dateEnd: new Date("2025-09-10T20:00:00Z"),
                place: "Choir Hall",
                description: "Weekly practice session",
                type: "REHEARSAL",
                requiresAttendance: true,
                requiresRegistration: false,
            },
        }),
    ]);

    // Add Registrations
    await Promise.all([
        prisma.eventRegistration.create({
            data: {
                userId: john.id,
                eventId: rehearsal.id,
            },
        }),
        prisma.eventRegistration.create({
            data: {
                userId: jane.id,
                eventId: rehearsal.id,
            },
        }),
    ]);

    // Add Attendance
    await Promise.all([
        prisma.eventAttendance.create({
            data: {
                userId: john.id,
                eventId: rehearsal.id,
                status: "PRESENT",
            },
        }),
        prisma.eventAttendance.create({
            data: {
                userId: jane.id,
                eventId: rehearsal.id,
                status: "ABSENT",
            },
        }),
        prisma.eventAttendance.create({
            data: {
                userId: bob.id,
                eventId: rehearsal.id,
                status: "PRESENT",
            },
        }),
    ]);

    // Add UserSongKnowledge
    await Promise.all([
        prisma.songKnowledge.create({
            data: {
                userId: john.id,
                songId: song1.id,
                voice: "A1",
                level: "OK",
            },
        }),
        prisma.songKnowledge.create({
            data: {
                userId: john.id,
                songId: song2.id,
                voice: "A1",
                level: "UTANTILL",
            },
        }),
        prisma.songKnowledge.create({
            data: {
                userId: jane.id,
                songId: song3.id,
                voice: "T1",
                level: "GIG",
            },
        }),
    ]);

    console.log("Seeding finished.");
}

main()
    .catch(e => console.error(e))
    .finally(async () => {
        await prisma.$disconnect();
    });