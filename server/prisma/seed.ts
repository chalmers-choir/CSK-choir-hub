import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    console.log("Seeding database...");

    // Optional: clear existing data
    await prisma.userSongKnowledge.deleteMany();
    await prisma.eventSongs.deleteMany();
    await prisma.attendance.deleteMany();
    await prisma.registered.deleteMany();
    await prisma.song.deleteMany();
    await prisma.event.deleteMany();
    await prisma.user.deleteMany();

    // Create Users
    const [admin, john, jane, bob] = await Promise.all([
        prisma.user.create({
            data: {
                email: "admin@example.com",
                password: "hashed_password_123",
                username: "admin",
                first_name: "Alice",
                last_name: "Anderson",
                role: "ADMIN",
            },
        }),
        prisma.user.create({
            data: {
                email: "john.doe@example.com",
                password: "hashed_password_123",
                username: "johndoe",
                first_name: "John",
                last_name: "Doe",
                role: "USER",
            },
        }),
        prisma.user.create({
            data: {
                email: "jane.smith@example.com",
                password: "hashed_password_123",
                username: "janesmith",
                first_name: "Jane",
                last_name: "Smith",
                role: "USER",
            },
        }),
        prisma.user.create({
            data: {
                email: "bob.admin@example.com",
                password: "hashed_password_123",
                username: "bobadmin",
                first_name: "Bob",
                last_name: "Brown",
                role: "ADMIN",
            },
        }),
    ]);

    // Create Songs
    const [song1, song2, song3] = await Promise.all([
        prisma.song.create({
            data: {
                title: "Ave Maria",
                page: 12,
                starting_tones: "C Major",
                voices: "SATB",
            },
        }),
        prisma.song.create({
            data: {
                title: "Ode to Joy",
                page: 45,
                starting_tones: "D Major",
                voices: "SATB",
            },
        }),
        prisma.song.create({
            data: {
                title: "Hallelujah",
                page: 78,
                starting_tones: "G Major",
                voices: "SATB",
            },
        }),
    ]);

    // Create Events
    const [rehearsal, concert] = await Promise.all([
        prisma.event.create({
            data: {
                name: "Weekly Rehearsal",
                date: new Date("2025-09-10T18:00:00Z"),
                place: "Choir Hall",
                description: "Weekly practice session",
                type: "REHEARSAL",
                requiresAttendance: true,
                requiresRegistration: false,
            },
        }),
        prisma.event.create({
            data: {
                name: "Autumn Concert",
                date: new Date("2025-10-15T19:00:00Z"),
                place: "City Theater",
                description: "Annual autumn concert performance",
                type: "CONCERT",
                requiresAttendance: true,
                requiresRegistration: true,
            },
        }),
    ]);

    // Link Songs to Events
    await Promise.all([
        prisma.eventSongs.create({
            data: {
                eventId: rehearsal.id,
                songId: song1.id,
            },
        }),
        prisma.eventSongs.create({
            data: {
                eventId: rehearsal.id,
                songId: song2.id,
            },
        }),
        prisma.eventSongs.create({
            data: {
                eventId: concert.id,
                songId: song2.id,
            },
        }),
        prisma.eventSongs.create({
            data: {
                eventId: concert.id,
                songId: song3.id,
            },
        }),
    ]);

    // Add Registrations
    await Promise.all([
        prisma.registered.create({
            data: {
                userId: john.id,
                eventId: concert.id,
            },
        }),
        prisma.registered.create({
            data: {
                userId: jane.id,
                eventId: concert.id,
            },
        }),
    ]);

    // Add Attendance
    await Promise.all([
        prisma.attendance.create({
            data: {
                userId: john.id,
                eventId: rehearsal.id,
                status: "PRESENT",
            },
        }),
        prisma.attendance.create({
            data: {
                userId: jane.id,
                eventId: rehearsal.id,
                status: "ABSENT",
            },
        }),
        prisma.attendance.create({
            data: {
                userId: bob.id,
                eventId: rehearsal.id,
                status: "PRESENT",
            },
        }),
    ]);

    // Add UserSongKnowledge
    await Promise.all([
        prisma.userSongKnowledge.create({
            data: {
                userId: john.id,
                songId: song1.id,
                level: "GOOD",
            },
        }),
        prisma.userSongKnowledge.create({
            data: {
                userId: john.id,
                songId: song2.id,
                level: "BASIC",
            },
        }),
        prisma.userSongKnowledge.create({
            data: {
                userId: jane.id,
                songId: song3.id,
                level: "EXCELLENT",
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