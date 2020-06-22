import { Router } from "express"
import { purchaseBusinness } from "server/business"
import checkPagination from "server/middleware/checkPagination"

const router = Router()

router.get("/:id", async (req, res, next) => {
  const { limit, offset } = req.query
  const id = req.params.id
  const pagination = {
    limit,
    offset
  }
  const purchaseResponse = await purchaseBusinness.findPurchase({ id, pagination })
  res.status(purchaseResponse.status).send(purchaseResponse)
})
router.get("/find-purchase-by-conditions", checkPagination, async (req, res, next) => {
  const { limit, offset, ...conditions } = req.query
  const pagination = {
    limit,
    offset
  }
  const purchaseResponse = await purchaseBusinness.findPurchaseByConditions({
    conditions,
    pagination
  })
  res.status(purchaseResponse.status).send(purchaseResponse)
})

router.post("/", async (req, res, next) => {
  const body = req.body
  const purchaseResponse = await purchaseBusinness.createPurchase(body)
  res.status(purchaseResponse.status).send(purchaseResponse)
})

router.put("/:id", async (req, res, next) => {
  const body = req.body
  const purchaseResponse = await purchaseBusinness.createPurchase({ id, body })
  res.status(purchaseResponse.status).send(purchaseResponse)
})

export default router
