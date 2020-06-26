import db from "database/models"
import response from "services/response"
import { encrypt } from "services/encrypt"
import { encryptToken } from "services/token"

class publicBusiness {
  constructor() {}
  async loginUser(body) {
    if (!body.email || !body.password)
      return response.error({}, { message: `Email and password required` })

    const encryptPass = await encrypt(body.password)

    return await db.userModel
      .findOne({ where: { password: encryptPass, email: body.email } })
      .then(async data => {
        if (!data) return response.success(data, { message: "User not found" })
        return await encryptToken({
          id: data.id,
          name: data.name,
          email: data.email,
          document: data.document
        })
          .then(data => response.success(`Bearer ${data}`))
          .catch(err =>
            response.error(err, {
              status: 500,
              message: "Login error, try again later"
            })
          )
      })
      .catch(err => response.error(err))
  }
}

export default new publicBusiness()
