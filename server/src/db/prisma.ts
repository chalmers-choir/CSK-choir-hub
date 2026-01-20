import { PrismaClient } from '@prisma/client';

const globalForPrisma = global as unknown as { prisma?: PrismaClient };

const logPrismaQueries = process.env.LOG_PRISMA === 'true';

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: logPrismaQueries ? ['query', 'error', 'warn'] : ['error', 'warn'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
