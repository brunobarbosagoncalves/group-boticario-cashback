import { Op } from "sequelize"
import moment from "moment"

import db from "database/models"
import response from "services/response"
import { userBusiness } from "server/business"

const { purchaseModel, itemModel, productModel, userModel } = db

class purchaseBusiness {
  async findPurchase({ id, pagination }) {
    return purchaseModel
      .findOne({
        ...pagination,
        where: { id },
        include: [
          {
            model: itemModel,
            include: [{ model: productModel }]
          }
        ]
      })
      .then(data => response.success(data))
      .catch(err => response.error(err))
  }

  async findMyPurchase({ userId, pagination }) {
    return purchaseModel
      .findAll({
        ...pagination,
        where: { userId },
        include: [
          {
            model: itemModel,
            include: [{ model: productModel }]
          }
        ]
      })
      .then(data => response.success(data))
      .catch(err => response.error(err))
  }

  async findPurchaseByConditions({ conditions, pagination }) {
    return purchaseModel
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
  async findPurchaseBetweenDates({ conditions, pagination }) {
    //check date is valid
    const startDate = moment(conditions.startDate)
    const endDate = moment(conditions.endDate)

    if (!startDate.isValid() || !endDate.isValid())
      return response.error({}, { message: "Date start or end invalid are format" })

    return purchaseModel
      .findAll({
        ...pagination,
        where: {
          date: {
            [Op.between]: [startDate.format("YYYY-MM-DD"), endDate.format("YYYY-MM-DD")]
          }
        }
      })
      .then(data => response.success(data))
      .catch(err => response.error(err))
  }
  async createPurchase(body) {
    if (!moment(body.date).isValid()) return response.err({}, { message: "field date is invalid" })
    if (!moment(body.userId)) return response.err({}, { message: "UserId invalid" })

    //rule business
    if (body.document == "15350946056") body.status = "OK"

    return purchaseModel
      .create(body)
      .then(data => response.success(data, { status: 201 }))
      .catch(err => response.error(err))
  }
  async updatePurchase(id, body) {
    return purchaseModel
      .update(body, { where: { id } })
      .then(data => response.success(data))
      .catch(err => response.error(err))
  }
  async updatePurchaseBetweenDates({ conditions, body }) {
    const startDate = moment(conditions.startDate)
    const endDate = moment(conditions.endDate)

    if (!startDate.isValid() || !endDate.isValid())
      return response.error({}, { message: "startDate or endDate invalid" })

    return purchaseModel
      .update(body, {
        where: {
          date: {
            [Op.between]: [startDate.format("YYYY-MM-DD"), endDate.format("YYYY-MM-DD")]
          }
        }
      })
      .then(data => response.success(data))
      .catch(err => response.error(err))
  }

  async deletePurchase(id) {
    return purchaseModel
      .update({ isDeleted: true }, { where: { id } })
      .then(data => response.success(data))
      .catch(err => response.error(err))
  }
}

export default purchaseBusiness = new purchaseBusiness()
