import { createUser } from "lib/auth-functions"
import { prisma } from "lib/prisma"
import { validateEmail, validateNewPassword } from "lib/validations"

import type { NextApiRequest, NextApiResponse } from "next"

const handler = async (req: NextApiRequest, res: NextApiResponse<string>) => {
  try {
    const { email, password, repeatedPassword } = req.body

    validateEmail(email)
    validateNewPassword(password, repeatedPassword)

    const existingUser = await prisma.user.count({
      where: {
        email,
      },
    })

    if (existingUser > 0) return res.status(400).send("email already registered")

    await createUser({ email, password })

    res.status(200).send("Account registered")
  } catch (e) {
    if (e instanceof Error) res.status(400).send(e.message)
  }
}

export default handler
