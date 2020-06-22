import { Router } from "express"
import { itemBusinness } from "server/business"
import checkPagination from "server/middleware/checkPagination"

const router = Router()

router.get("/:id", async (req, res, next) => {
  const { limit, offset } = req.query
  const id = req.params.id
  const pagination = {
    limit,
    offset
  }
  const itemResponse = await itemBusinness.findItem({ id, pagination })
  res.status(itemResponse.status).send(itemResponse)
})
router.get("/find-item-by-conditions", checkPagination, async (req, res, next) => {
  const { limit, offset, ...conditions } = req.query
  const pagination = {
    limit,
    offset
  }
  const itemResponse = await itemBusinness.findItemByConditions({ conditions, pagination })
  res.status(itemResponse.status).send(itemResponse)
})

router.post("/", async (req, res, next) => {
  const body = req.body
  const itemResponse = await itemBusinness.createItem(body)
  res.status(itemResponse.status).send(itemResponse)
})

router.put("/:id", async (req, res, next) => {
  const body = req.body
  const itemResponse = await itemBusinness.createItem({ id, body })
  res.status(itemResponse.status).send(itemResponse)
})

export default router
