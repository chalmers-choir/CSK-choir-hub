import { type PrismaClient } from "@prisma/generated/client";
import { type Book } from "@prisma/generated/client";

export default async function seedBooks(prisma: PrismaClient): Promise<Books> {
  // Create Books
  const utantill = await prisma.book.create({
    data: {
      title: "Utanill",
    },
  });

  const grona = await prisma.book.create({
    data: {
      title: "Gröna Boken",
    },
  });

  const svarta = await prisma.book.create({
    data: {
      title: "Lilla Svarta",
    },
  });

  return {
    utantill,
    grona,
    svarta,
  };
}

export interface Books {
  utantill: Book;
  grona: Book;
  svarta: Book;
}
