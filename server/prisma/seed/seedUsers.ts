import { PrismaClient } from '@prisma/client';

export default async function seedUsers(prisma: PrismaClient): Promise<Users> {
  const alice = await prisma.user.create({
    data: {
      email: 'alice@example.com',
      username: 'alice',
      passwordHash: 'hashedpassword1',
      firstName: 'Alice',
      lastName: 'Alto',
      dietaryPreferences: 'Vegetarian',
    },
  });

  const bob = await prisma.user.create({
    data: {
      email: 'bob@example.com',
      username: 'bob',
      passwordHash: 'hashedpassword2',
      firstName: 'Bob',
      lastName: 'Bass',
    },
  });

  const charles = await prisma.user.create({
    data: {
      email: 'charles@example.com',
      username: 'charles',
      passwordHash: 'hashedpassword3',
      firstName: 'Charles',
      lastName: 'Capo',
    },
  });

  const diana = await prisma.user.create({
    data: {
      email: 'diana@example.com',
      username: 'diana',
      passwordHash: 'hashedpassword4',
      firstName: 'Diana',
      lastName: 'Diva',
      dietaryPreferences: 'Vegan',
    },
  });

  const evan = await prisma.user.create({
    data: {
      email: 'evan@example.com',
      username: 'evan',
      passwordHash: 'hashedpassword5',
      firstName: 'Evan',
      lastName: 'Echo',
    },
  });

  const fred = await prisma.user.create({
    data: {
      email: 'fred@example.com',
      username: 'fred',
      passwordHash: 'hashedpassword6',
      firstName: 'Fred',
      lastName: 'Fermata',
    },
  });

  const george = await prisma.user.create({
    data: {
      email: 'george@example.com',
      username: 'george',
      passwordHash: 'hashedpassword7',
      firstName: 'George',
      lastName: 'Guitar',
    },
  });

  const helen = await prisma.user.create({
    data: {
      email: 'helen@example.com',
      username: 'helen',
      passwordHash: 'hashedpassword8',
      firstName: 'Helen',
      lastName: 'Harmony',
      dietaryPreferences: 'Gluten-Free',
    },
  });

  const liam = await prisma.user.create({
    data: {
      email: 'liam@example.com',
      username: 'liam',
      passwordHash: 'hashedpassword9',
      firstName: 'Liam',
      lastName: 'Lyric',
    },
  });

  const lucas = await prisma.user.create({
    data: {
      email: 'lucas@example.com',
      username: 'lucas',
      passwordHash: 'hashedpassword10',
      firstName: 'Lucas',
      lastName: 'Lyric',
    },
  });

  const isak = await prisma.user.create({
    data: {
      email: 'isak@example.com',
      username: 'isak',
      passwordHash: 'hashedpassword11',
      firstName: 'Isak',
      lastName: 'Inspiration',
    },
  });

  const elin = await prisma.user.create({
    data: {
      email: 'elin@example.com',
      username: 'elin',
      passwordHash: 'hashedpassword12',
      firstName: 'Elin',
      lastName: 'Elegance',
    },
  });

  const ellen = await prisma.user.create({
    data: {
      email: 'ellen@example.com',
      username: 'ellen',
      passwordHash: 'hashedpassword13',
      firstName: 'Ellen',
      lastName: 'Elegance',
    },
  });

  const elinor = await prisma.user.create({
    data: {
      email: 'elinor@example.com',
      username: 'elinor',
      passwordHash: 'hashedpassword14',
      firstName: 'Elinor',
      lastName: 'Elegance',
    },
  });

  const ingrid = await prisma.user.create({
    data: {
      email: 'ingrid@example.com',
      username: 'ingrid',
      passwordHash: 'hashedpassword15',
      firstName: 'Ingrid',
      lastName: 'Inspiration',
    },
  });

  const vera = await prisma.user.create({
    data: {
      email: 'vera@example.com',
      username: 'vera',
      passwordHash: 'hashedpassword17',
      firstName: 'Vera',
      lastName: 'Vocal',
    },
  });

  const hilding = await prisma.user.create({
    data: {
      email: 'hilding@example.com',
      username: 'hilding',
      passwordHash: 'hashedpassword16',
      firstName: 'Hilding',
      lastName: 'Harmony',
    },
  });

  const felix = await prisma.user.create({
    data: {
      email: 'felix@example.com',
      username: 'felix',
      passwordHash: 'hashedpassword18',
      firstName: 'Felix',
      lastName: 'Forte',
    },
  });

  const linn = await prisma.user.create({
    data: {
      email: 'linn@example.com',
      username: 'linn',
      passwordHash: 'hashedpassword19',
      firstName: 'Linn',
      lastName: 'Lyric',
    },
  });

  const thore = await prisma.user.create({
    data: {
      email: 'thore@example.com',
      username: 'thore',
      passwordHash: 'hashedpassword20',
      firstName: 'Thore',
      lastName: 'Tenor',
    },
  });

  const rebekka = await prisma.user.create({
    data: {
      email: 'rebekka@example.com',
      username: 'rebekka',
      passwordHash: 'hashedpassword21',
      firstName: 'Rebekka',
      lastName: 'Rhapsody',
    },
  });

  const robert = await prisma.user.create({
    data: {
      email: 'robert@example.com',
      username: 'robert',
      passwordHash: 'hashedpassword22',
      firstName: 'Robert',
      lastName: 'Rhapsody',
    },
  });

  const julia = await prisma.user.create({
    data: {
      email: 'julia@example.com',
      username: 'julia',
      passwordHash: 'hashedpassword23',
      firstName: 'Julia',
      lastName: 'Jazz',
    },
  });

  const mathias = await prisma.user.create({
    data: {
      email: 'mathias@example.com',
      username: 'mathias',
      passwordHash: 'hashedpassword24',
      firstName: 'Mathias',
      lastName: 'Melody',
    },
  });

  const elisabeth = await prisma.user.create({
    data: {
      email: 'elisabeth@example.com',
      username: 'elisabeth',
      passwordHash: 'hashedpassword25',
      firstName: 'Elisabeth',
      lastName: 'Elegance',
    },
  });

  const maria = await prisma.user.create({
    data: {
      email: 'maria@example.com',
      username: 'maria',
      passwordHash: 'hashedpassword26',
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
