import sequelize, { Op } from "sequelize"
import moment from "moment"
import db from "database/models"
import response from "services/response"
import { encrypt } from "services/encrypt"
import { encryptToken } from "services/token"
import { cronBusiness, purchaseBusiness } from "server/business"

class userBusiness {
  constructor() {}

  async findUser(id) {
    return db.userModel
      .findOne({ where: { id } })
      .then(data => response.success(data))
      .catch(err => response.error(err))
  }
  async findUserByConditions({ conditions, pagination }) {
    return await db.userModel
      .findAll({
        ...pagination,
        where: {
          [Op.and]: [
            Object.entries(conditions).map(item => ({ [item[0]]: { [Op.like]: `%${item[1]}%` } }))
          ]
        }
      })
      .then(data => response.success(data))
      .catch(err => response.error(err))
  }
  async createUser(body) {
    if (!body.document || !body.name || !body.email || !body.password)
      return response.error({}, { message: `Fileds user are required` })

    return await db.userModel
      .create(body)
      .then(data => response.success(data, { status: 201 }))
      .catch(err => response.error(err))
  }
  async updateUser(id, body) {
    return await db.userModel
      .update(body, { where: { id } })
      .then(data => response.success(data))
      .catch(err => response.error(err))
  }
  async deleteUser(id) {
    return await db.userModel
      .update({ isDeleted: true }, { where: { id } })
      .then(data => response.success(data))
      .catch(err => response.error(err))
  }
  async loginUser(body) {
    if (!body.email || !body.password)
      return response.error({}, { message: `Email and password required` })

    const encryptPass = await encrypt(body.password)

    return await db.userModel
      .findOne({ where: { password: encryptPass, email: body.email } })
      .then(async data => {
        if (!data) return response.success(data, { message: "User not found" })
        return await encryptToken({ id: data.id, name: data.name, email: data.email })
          .then(data => response.success(`${data}`))
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

export default new userBusiness()
