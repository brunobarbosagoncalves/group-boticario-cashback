import { purchaseModel } from "database/models"
import response from "services/response"

class purchaseBusiness {
  async findPurchase({ id, pagination }) {
    return purchaseModel
      .findOne({ ...pagination, where: { id } })
      .then(data => response.success(data))
      .catch(err => response.error(err))
  }
  async findPurchaseByConditions({ conditions, pagination }) {
    return purchaseModel
      .findAll({ ...pagination, where: conditions })
      .then(data => response.success(data))
      .catch(err => response.error(err))
  }
  async createPurchase(body) {
    return purchaseModel
      .create(body)
      .then(data => response.success(data))
      .catch(err => response.error(err))
  }
  async updatePurchase(id, body) {
    return purchaseModel
      .update(body, { where: { id } })
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
