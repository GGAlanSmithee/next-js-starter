// https://emailregex.com/
const emailRegex =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

const validateEmail = (email: string) => {
  if (!email) throw Error("email is required")
  if (!emailRegex.test(email)) throw Error("invalid email")
}

// https://stackoverflow.com/a/12090265
const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,64}$/

const validatePassword = (password: string) => {
  if (!password) throw Error("password is required")
  if (!passwordRegex.test(password))
    throw Error("password must be 8 characters with one number and one special character")
}

const validateNewPassword = (password: string, repeatedPassword: string) => {
  validatePassword(password)
  if (password !== repeatedPassword) throw Error("passwords doesn't match")
}

export { validateEmail, validatePassword, validateNewPassword }
