import bcrypt from "bcryptjs"
import { prisma } from "./prisma"

interface Credentials {
  email: string
  password: string
}

const comparePass = (userPw: string, dbPw: string) => bcrypt.compareSync(userPw, dbPw)

const getHash = (password: string) => {
  const salt = bcrypt.genSaltSync()
  const hash = bcrypt.hashSync(password, salt)

  return hash
}

const createUser = async ({ email, password }: Credentials) => {
  const user = await prisma.user.create({
    data: {
      email,
      password: getHash(password),
    },
  })

  return user
}

const authenticate = async ({ email, password }: Credentials) => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  })

  if (!user) {
    return null
  }

  if (!comparePass(password, user.password)) {
    return null
  }

  return user
}

const markAsSignedIn = async (email: string) => {
  await prisma.user.update({
    where: {
      email,
    },
    data: {
      activityStatus: "Active",
    },
  })
}

const markAsSignedOut = async (email: string) => {
  await prisma.user.update({
    where: {
      email,
    },
    data: {
      activityStatus: "Offline",
    },
  })
}

export type { Credentials }
export { createUser, authenticate, markAsSignedIn, markAsSignedOut }
