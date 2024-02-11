import { PrismaClient } from '@prisma/client'

//Create database connection
export const prisma = new PrismaClient({
    log: ['query', 'info', 'warn', "error"],
})