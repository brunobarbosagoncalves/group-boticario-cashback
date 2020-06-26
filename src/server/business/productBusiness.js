import { Op } from "sequelize"
import db from "database/models"
import response from "services/response"

const { productModel } = db

class productBusiness {
  async findProduct({ id, pagination }) {
    return productModel
      .findOne({ ...pagination, where: { id } })
      .then(data => response.success(data))
      .catch(err => response.error(err))
  }
  async findProductByConditions({ conditions, pagination }) {
    return productModel
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
  async findBetweenIdsProduct(ids) {
    const idList = ids.split(",") || []
    return productModel
      .findAll({ where: { id: { [Op.in]: idList } } })
      .then(data => response.success(data))
      .catch(err => response.error(err))
  }
}

export default productBusiness = new productBusiness()
