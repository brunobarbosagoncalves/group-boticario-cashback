import { itemModel } from "database/models"
import response from "services/response"

class itemBusiness {
  async findItem({ id, pagination }) {
    return itemModel
      .findOne({ ...pagination, where: { id } })
      .then(data => response.success(data))
      .catch(err => response.error(err))
  }
  async findItemByConditions({ conditions, pagination }) {
    return itemModel
      .findAll({ ...pagination, where: conditions })
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
