import { PrismaClient } from "@prisma/client";
import { Song, Voice } from "@prisma/client";
import { Books } from "./seedBooks";
import { Tags } from "./seedTags";


export default async function seedRoles(prisma: PrismaClient, books: Books, tags: Tags): Promise<Songs> {

    // Create Songs
    const island = await prisma.song.create({
        data: {
            name: "Island",
            page: 50,
            startingTones: "A",
            voices: [Voice.T1, Voice.T2, Voice.B1, Voice.B2],
            books: { connect: [{ id: books.utantill.id }, { id: books.svarta.id }] },
            tags: { connect: [{ id: tags.student.id } ] }
        },
    })

    const utandig = await prisma.song.create({
        data: {
            name: "Utan dig",
            page: 86,
            startingTones: "E",
            voices: [Voice.S1, Voice.S2, Voice.A1, Voice.A2],
            books: { connect: [{ id: books.utantill.id }, { id: books.grona.id }] },
            tags: { connect: [{ id: tags.serenad.id } ] }
        },
    })

    const helan = await prisma.song.create({
        data: {
            name: "Helan går",
            page: 12,
            startingTones: "C",
            voices: [Voice.S, Voice.A, Voice.T, Voice.B],
            books: { connect: [{ id: books.utantill.id }] },
            tags: { connect: [{ id: tags.student.id } ] }
        },
    })

    const bastu = await prisma.song.create({
        data: {
            name: "I bastun",
            page: 34,
            startingTones: "F",
            voices: [Voice.S1, Voice.S2, Voice.A1, Voice.A2, Voice.T1, Voice.T2, Voice.B1, Voice.B2],
            books: { connect: [{ id: books.utantill.id }] },
            tags: { connect: [{ id: tags.chalmers.id } ] }
        },
    })

    return {
        island,
        utandig,
        helan,
        bastu
    }


}

export interface Songs {
  island: Song;
  utandig: Song;
  helan: Song;
  bastu: Song;
}