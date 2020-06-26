import { Router } from "express"
import { itemBusiness } from "server/business"
import checkPagination from "server/middleware/checkPagination"

const router = Router()

router.get("/find-by-conditions", checkPagination, async (req, res, next) => {
  const { limit, offset, ...conditions } = req.query
  const pagination = {
    limit,
    offset
  }
  const itemResponse = await itemBusiness.findItemByConditions({ conditions, pagination })
  res.status(itemResponse.status).send(itemResponse)
})

router.get("/:id", async (req, res, next) => {
  const { limit, offset } = req.query
  const id = req.params.id
  const pagination = {
    limit,
    offset
  }
  const itemResponse = await itemBusiness.findItem({ id, pagination })
  res.status(itemResponse.status).send(itemResponse)
})

router.post("/", async (req, res, next) => {
  const body = req.body
  const itemResponse = await itemBusiness.createItem(body)
  res.status(itemResponse.status).send(itemResponse)
})

router.put("/:id", async (req, res, next) => {
  const id = req.params.id
  const body = req.body
  const itemResponse = await itemBusiness.createItem(id, body)
  res.status(itemResponse.status).send(itemResponse)
})

export default router
