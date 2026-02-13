import { PrismaClient } from "@prisma/generated/client";
import { Tag } from "@prisma/generated/client";

export default async function seedRoles(prisma: PrismaClient): Promise<Tags> {
  // Create Tags
  const student = await prisma.tag.create({
    data: {
      name: "Student",
    },
  });

  const serenad = await prisma.tag.create({
    data: {
      name: "Serenad",
    },
  });

  const chalmers = await prisma.tag.create({
    data: {
      name: "Chalmers",
    },
  });

  return {
    student,
    serenad,
    chalmers,
  };
}

export interface Tags {
  student: Tag;
  serenad: Tag;
  chalmers: Tag;
}
