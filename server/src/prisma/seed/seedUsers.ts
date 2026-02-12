import { PrismaClient } from '@prisma/generated/client';
import bcrypt from 'bcryptjs';

export default async function seedUsers(prisma: PrismaClient): Promise<Users> {
  const alice = await prisma.user.create({
    data: {
      email: 'alice@example.com',
      username: 'alice',
      passwordHash: await bcrypt.hash('password', 10),
      firstName: 'Alice',
      lastName: 'Alto',
      dietaryPreferences: 'Vegetarian',
    },
  });

  const bob = await prisma.user.create({
    data: {
      email: 'bob@example.com',
      username: 'bob',
      passwordHash: await bcrypt.hash('password', 10),
      firstName: 'Bob',
      lastName: 'Bass',
    },
  });

  const charles = await prisma.user.create({
    data: {
      email: 'charles@example.com',
      username: 'charles',
      passwordHash: await bcrypt.hash('password', 10),
      firstName: 'Charles',
      lastName: 'Capo',
    },
  });

  const diana = await prisma.user.create({
    data: {
      email: 'diana@example.com',
      username: 'diana',
      passwordHash: await bcrypt.hash('password', 10),
      firstName: 'Diana',
      lastName: 'Diva',
      dietaryPreferences: 'Vegan',
    },
  });

  const evan = await prisma.user.create({
    data: {
      email: 'evan@example.com',
      username: 'evan',
      passwordHash: await bcrypt.hash('password', 10),
      firstName: 'Evan',
      lastName: 'Echo',
    },
  });

  const fred = await prisma.user.create({
    data: {
      email: 'fred@example.com',
      username: 'fred',
      passwordHash: await bcrypt.hash('password', 10),
      firstName: 'Fred',
      lastName: 'Fermata',
    },
  });

  const george = await prisma.user.create({
    data: {
      email: 'george@example.com',
      username: 'george',
      passwordHash: await bcrypt.hash('password', 10),
      firstName: 'George',
      lastName: 'Guitar',
    },
  });

  const helen = await prisma.user.create({
    data: {
      email: 'helen@example.com',
      username: 'helen',
      passwordHash: await bcrypt.hash('password', 10),
      firstName: 'Helen',
      lastName: 'Harmony',
      dietaryPreferences: 'Gluten-Free',
    },
  });

  const liam = await prisma.user.create({
    data: {
      email: 'liam@example.com',
      username: 'liam',
      passwordHash: await bcrypt.hash('password', 10),
      firstName: 'Liam',
      lastName: 'Lyric',
    },
  });

  const lucas = await prisma.user.create({
    data: {
      email: 'lucas@example.com',
      username: 'lucas',
      passwordHash: await bcrypt.hash('password', 10),
      firstName: 'Lucas',
      lastName: 'Lyric',
      webRole: 'ADMIN',
    },
  });

  const isak = await prisma.user.create({
    data: {
      email: 'isak@example.com',
      username: 'isak',
      passwordHash: await bcrypt.hash('password', 10),
      firstName: 'Isak',
      lastName: 'Inspiration',
    },
  });

  const elin = await prisma.user.create({
    data: {
      email: 'elin@example.com',
      username: 'elin',
      passwordHash: await bcrypt.hash('password', 10),
      firstName: 'Elin',
      lastName: 'Elegance',
    },
  });

  const ellen = await prisma.user.create({
    data: {
      email: 'ellen@example.com',
      username: 'ellen',
      passwordHash: await bcrypt.hash('password', 10),
      firstName: 'Ellen',
      lastName: 'Elegance',
    },
  });

  const elinor = await prisma.user.create({
    data: {
      email: 'elinor@example.com',
      username: 'elinor',
      passwordHash: await bcrypt.hash('password', 10),
      firstName: 'Elinor',
      lastName: 'Elegance',
    },
  });

  const ingrid = await prisma.user.create({
    data: {
      email: 'ingrid@example.com',
      username: 'ingrid',
      passwordHash: await bcrypt.hash('password', 10),
      firstName: 'Ingrid',
      lastName: 'Inspiration',
    },
  });

  const vera = await prisma.user.create({
    data: {
      email: 'vera@example.com',
      username: 'vera',
      passwordHash: await bcrypt.hash('password', 10),
      firstName: 'Vera',
      lastName: 'Vocal',
    },
  });

  const hilding = await prisma.user.create({
    data: {
      email: 'hilding@example.com',
      username: 'hilding',
      passwordHash: await bcrypt.hash('password', 10),
      firstName: 'Hilding',
      lastName: 'Harmony',
    },
  });

  const felix = await prisma.user.create({
    data: {
      email: 'felix@example.com',
      username: 'felix',
      passwordHash: await bcrypt.hash('password', 10),
      firstName: 'Felix',
      lastName: 'Forte',
    },
  });

  const linn = await prisma.user.create({
    data: {
      email: 'linn@example.com',
      username: 'linn',
      passwordHash: await bcrypt.hash('password', 10),
      firstName: 'Linn',
      lastName: 'Lyric',
    },
  });

  const thore = await prisma.user.create({
    data: {
      email: 'thore@example.com',
      username: 'thore',
      passwordHash: await bcrypt.hash('password', 10),
      firstName: 'Thore',
      lastName: 'Tenor',
    },
  });

  const rebekka = await prisma.user.create({
    data: {
      email: 'rebekka@example.com',
      username: 'rebekka',
      passwordHash: await bcrypt.hash('password', 10),
      firstName: 'Rebekka',
      lastName: 'Rhapsody',
    },
  });

  const robert = await prisma.user.create({
    data: {
      email: 'robert@example.com',
      username: 'robert',
      passwordHash: await bcrypt.hash('password', 10),
      firstName: 'Robert',
      lastName: 'Rhapsody',
    },
  });

  const julia = await prisma.user.create({
    data: {
      email: 'julia@example.com',
      username: 'julia',
      passwordHash: await bcrypt.hash('password', 10),
      firstName: 'Julia',
      lastName: 'Jazz',
    },
  });

  const mathias = await prisma.user.create({
    data: {
      email: 'mathias@example.com',
      username: 'mathias',
      passwordHash: await bcrypt.hash('password', 10),
      firstName: 'Mathias',
      lastName: 'Melody',
    },
  });

  const elisabeth = await prisma.user.create({
    data: {
      email: 'elisabeth@example.com',
      username: 'elisabeth',
      passwordHash: await bcrypt.hash('password', 10),
      firstName: 'Elisabeth',
      lastName: 'Elegance',
    },
  });

  const maria = await prisma.user.create({
    data: {
      email: 'maria@example.com',
      username: 'maria',
      passwordHash: await bcrypt.hash('password', 10),
      firstName: 'Maria',
      lastName: 'Melody',
    },
  });

  return {
    alice,
    bob,
    charles,
    diana,
    evan,
    fred,
    george,
    helen,
    liam,
    lucas,
    isak,
    elin,
    ellen,
    elinor,
    ingrid,
    hilding,
    vera,
    felix,
    linn,
    thore,
    rebekka,
    robert,
    julia,
    mathias,
    elisabeth,
    maria,
  };
}

export interface Users {
  alice: { id: number };
  bob: { id: number };
  charles: { id: number };
  diana: { id: number };
  evan: { id: number };
  fred: { id: number };
  george: { id: number };
  helen: { id: number };

  liam: { id: number };
  lucas: { id: number };
  isak: { id: number };
  elin: { id: number };
  ellen: { id: number };
  elinor: { id: number };
  vera: { id: number };
  ingrid: { id: number };

  hilding: { id: number };
  felix: { id: number };
  linn: { id: number };
  thore: { id: number };
  rebekka: { id: number };
  robert: { id: number };
  julia: { id: number };

  mathias: { id: number };
  elisabeth: { id: number };
  maria: { id: number };
}
