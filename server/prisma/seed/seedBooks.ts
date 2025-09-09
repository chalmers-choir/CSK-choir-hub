import { PrismaClient } from "@prisma/client";
import { Book } from "@prisma/client";

  
export default async function seedRoles(prisma: PrismaClient): Promise<Books> {

    // Create Books
    const utantill = await prisma.book.create({
        data: {
            name: "Utanill",
        },
    })

    const grona = await prisma.book.create({
        data: {
            name: "Gröna Boken",
        },
    })

    const svarta = await prisma.book.create({
        data: {
            name: "Lilla Svarta",
        },
    })

    return {
        utantill,
        grona,
        svarta
    }


}

export interface Books {
  utantill: Book;
  grona: Book;
  svarta: Book;
}