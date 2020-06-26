import { Op } from "sequelize"

import db from "database/models"
import response from "services/response"

const { itemModel } = db

class itemBusiness {
  async findItem({ id, pagination }) {
    return itemModel
      .findOne({ ...pagination, where: { id } })
      .then(data => response.success(data))
      .catch(err => response.error(err))
  }
  async findItemByConditions({ conditions, pagination }) {
    return itemModel
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
  async createItem(body) {
    return itemModel
      .create(body)
      .then(data => response.success(data))
      .catch(err => response.error(err))
  }
  async updateItem(id, body) {
    return itemModel
      .update(body, { where: { id } })
      .then(data => response.success(data))
      .catch(err => response.error(err))
  }
  async deleteItem(id) {
    return itemModel
      .update({ isDeleted: true }, { where: { id } })
      .then(data => response.success(data))
      .catch(err => response.error(err))
  }
}

export default itemBusiness = new itemBusiness()
