import sequelize, { Op } from "sequelize"
import moment from "moment"
import db from "database/models"
import response from "services/response"
import { purchaseBusiness } from "server/business"

class cronBusiness {
  constructor() {}

  async calcCashbackMonthGroupByUserId({ conditions, pagination }) {
    const startDate = moment(conditions.startDate)
      .subtract(1, "month")
      .startOf("month")
      .set({ hour: 0, minute: 0, second: 0, millisecond: 0 })

    const endDate = moment(conditions.endDate)
      .clone()
      .endOf("month")
      .set({ hour: 23, minute: 59, second: 59, millisecond: 59 })

    if (!startDate.isValid() || !endDate.isValid()) {
      return response.error({}, { message: "startDate or endDate invalid" })
    }

    return await db.purchaseModel
      .findAll({
        ...pagination,
        attributes: ["id", "userId", [sequelize.fn("sum", sequelize.col("value")), "totalValue"]],
        where: {
          date: {
            [Op.between]: [startDate.format("YYYY-MM-DD"), endDate.format("YYYY-MM-DD")]
          }
        },
        raw: true,
        group: ["userId"]
      })
      .then(purchases =>
        purchases.map(purchase => ({
          ...purchase,
          totalValue: parseFloat(purchase.totalValue)
        }))
      )
      .reduce((acum, curr) => {
        let cashback = 0.0
        let percent = 0.1
        if (curr.totalValue <= 1000) {
          cashback = (curr.totalValue * 0.1).toFixed(2)
          percent = 0.1
        }
        if (curr.totalValue >= 1001 && curr.totalValue <= 1500) {
          cashback = (curr.totalValue * 0.15).toFixed(2)
          percent = 0.15
        }
        if (curr.totalValue >= 1501) {
          cashback = (curr.totalValue * 0.2).toFixed(2)
          percent = 0.2
        }

        return [...acum, { ...curr, cashback, percent }]
      }, [])
      .then(data => response.success(data))
      .catch(err => response.error(err))
  }

  async calcCashbackPurchase({ conditions }) {
    const purchasesResponse = await this.calcCashbackMonthGroupByUserId({
      conditions,
      pagination: {}
    })

    const purchsesMonth = await purchaseBusiness.findPurchaseBetweenDates({ conditions })

    await Promise.all(
      purchsesMonth.data.map(purchase =>
        purchaseBusiness.updatePurchase(purchase.id, {
          cashback:
            purchasesResponse.data.filter(purshaseSum => purshaseSum.userId == purchase.userId)[0]
              .percent * purchase.value
        })
      )
    )

    return await purchaseBusiness.findPurchaseBetweenDates({ conditions, pagination: {} })
  }
}

export default new cronBusiness()
