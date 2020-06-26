import { Op } from "sequelize"
import db from "database/models"
import response from "services/response"

const { logModel } = db

class logBusiness {
  async findLog({ id, pagination }) {
    return logModel
      .findOne({ ...pagination, where: { id } })
      .then(data => response.success(data))
      .catch(err => response.error(err))
  }
  async findLogByConditions({ conditions, pagination }) {
    return logModel
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
  async createLog(body) {
    return logModel
      .create(body)
      .then(data => response.success(data))
      .catch(err => response.error(err))
  }
  async updateLog(id, body) {
    return logModel
      .update(body, { where: { id } })
      .then(data => response.success(data))
      .catch(err => response.error(err))
  }
  async deleteLog(id) {
    return logModel
      .update({ isDeleted: true }, { where: { id } })
      .then(data => response.success(data))
      .catch(err => response.error(err))
  }
}

export default logBusiness = new logBusiness()
