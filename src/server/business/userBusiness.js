import { userModel } from "database/models"
import response from "services/response"

class userBusiness {
  async findUser({ id, pagination }) {
    return userModel
      .findOne({ ...pagination, where: { id } })
      .then(data => response.success(data))
      .catch(err => response.error(err))
  }
  async findUserByConditions({ conditions, pagination }) {
    return userModel
      .findAll({ ...pagination, where: conditions })
      .then(data => response.success(data))
      .catch(err => response.error(err))
  }
  async createUser(body) {
    return userModel
      .create(body)
      .then(data => response.success(data))
      .catch(err => response.error(err))
  }
  async updateUser(id, body) {
    return userModel
      .update(body, { where: { id } })
      .then(data => response.success(data))
      .catch(err => response.error(err))
  }
  async deleteUser(id) {
    return userModel
      .update({ isDeleted: true }, { where: { id } })
      .then(data => response.success(data))
      .catch(err => response.error(err))
  }
}

export default userBusiness = new userBusiness()
