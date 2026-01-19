import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';

const globalForPrisma = global as unknown as { prisma?: PrismaClient };

const logPrismaQueries = process.env.LOG_PRISMA === 'true';

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: logPrismaQueries ? ['query', 'error', 'warn'] : ['error', 'warn'],
    adapter: new PrismaPg(
      new Pool({
        connectionString: process.env.DATABASE_URL,
      }),
    ),
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
