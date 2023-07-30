import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

export async function main() {
    console.log("init");

    const newDealer = await prisma.dealer.create({
        data: {},
    })
    
    const users = await prisma.dealer.findMany()
    console.log(users);
}