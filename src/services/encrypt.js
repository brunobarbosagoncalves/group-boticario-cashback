import crypto from "crypto"

//Load envs
require("services/environment")

const TOKEN_KEY = process.env.TOKEN_KEY
const ALGORITHM = "sha256"

const encrypt = data => {
  let hmac = crypto.createHmac(ALGORITHM, TOKEN_KEY)
  return hmac.update(data).digest("hex")
}

const encryptCompare = (password, hash) => encrypt(password) === hash

export { encrypt, encryptCompare }
