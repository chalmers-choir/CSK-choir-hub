import { PrismaClient } from "@prisma/client";

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
    
    return { alice, bob, charles, diana, evan, fred, george, helen };
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
}