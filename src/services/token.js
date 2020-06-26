import jwt from "jsonwebtoken"

require("services/environment")

const TOKEN_KEY = process.env.TOKEN_KEY

export const encryptToken = async data =>
  new Promise((res, rej) => {
    try {
      return jwt.sign(data, TOKEN_KEY, (err, token) => (err ? rej(err) : res(token)))
    } catch (error) {
      return rej(false)
    }
  })

export const decryptToken = async data =>
  new Promise((res, rej) => {
    try {
      return jwt.verify(data.split(" ")[1], TOKEN_KEY, (err, token) =>
        err ? rej(err) : res(token)
      )
    } catch (error) {
      return rej(false)
    }
  })
