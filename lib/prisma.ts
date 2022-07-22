process.removeAllListeners("warning")

import { PrismaClient, PrismaPromise } from "@prisma/client"

// NOTE(Alan): This wrapper makes prisma not hot-reload in dev since that creates multiple db connections

let prisma: PrismaClient

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient()
} else {
  // @ts-ignore
  if (!global.prisma) {
    // @ts-ignore
    global.prisma = new PrismaClient()
  }

  // @ts-ignore
  prisma = global.prisma
}

const prismaTransaction = (queries: Promise<any>[]) =>
  prisma.$transaction(queries as PrismaPromise<any>[])

export { prisma, prismaTransaction }
