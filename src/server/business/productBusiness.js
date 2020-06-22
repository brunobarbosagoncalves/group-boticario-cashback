import { productModel } from "database/models"
import response from "services/response"

class productBusiness {
  async findProduct({ id, pagination }) {
    return productModel
      .findOne({ ...pagination, where: { id } })
      .then(data => response.success(data))
      .catch(err => response.error(err))
  }
  async findProductByConditions({ conditions, pagination }) {
    return productModel
      .findAll({ ...pagination, where: conditions })
      .then(data => response.success(data))
      .catch(err => response.error(err))
  }
  async createProduct(body) {
    return productModel
      .create(body)
      .then(data => response.success(data))
      .catch(err => response.error(err))
  }
  async updateProduct(id, body) {
    return productModel
      .update(body, { where: { id } })
      .then(data => response.success(data))
      .catch(err => response.error(err))
  }
  async deleteProduct(id) {
    return productModel
      .update({ isDeleted: true }, { where: { id } })
      .then(data => response.success(data))
      .catch(err => response.error(err))
  }
}

export default productBusiness = new productBusiness()
