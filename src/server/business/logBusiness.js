import { logModel } from "database/models"
import response from "services/response"

class logBusiness {
  async findLog({ id, pagination }) {
    return logModel
      .findOne({ ...pagination, where: { id } })
      .then(data => response.success(data))
      .catch(err => response.error(err))
  }
  async findLogByConditions({ conditions, pagination }) {
    return logModel
      .findAll({ ...pagination, where: conditions })
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
