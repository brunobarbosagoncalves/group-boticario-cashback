import { Router } from "express"
import { cronBusiness } from "server/business"
import checkPagination from "server/middleware/checkPagination"

const router = Router()

router.get("/simule-cashback-purchase-month", async (req, res, next) => {
  const { limit, offset, ...conditions } = req.query
  const pagination = {
    limit,
    offset
  }

  const cronResponse = await cronBusiness.calcCashbackPurchase({ conditions, pagination })
  res.status(cronResponse.status).send(cronResponse)
})

export default router
