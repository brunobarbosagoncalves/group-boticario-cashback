import { Router } from "express"
import { productBusinness } from "server/business"
import checkPagination from "server/middleware/checkPagination"

const router = Router()

router.get("/:id", async (req, res, next) => {
  const { limit, offset } = req.query
  const id = req.params.id
  const pagination = {
    limit,
    offset
  }
  const productResponse = await productBusinness.findProduct({ id, pagination })
  res.status(productResponse.status).send(productResponse)
})
router.get("/find-product-by-conditions", checkPagination, async (req, res, next) => {
  const { limit, offset, ...conditions } = req.query
  const pagination = {
    limit,
    offset
  }
  const productResponse = await productBusinness.findProductByConditions({ conditions, pagination })
  res.status(productResponse.status).send(productResponse)
})

router.post("/", async (req, res, next) => {
  const body = req.body
  const productResponse = await productBusinness.createProduct(body)
  res.status(productResponse.status).send(productResponse)
})

router.put("/:id", async (req, res, next) => {
  const body = req.body
  const productResponse = await productBusinness.createProduct({ id, body })
  res.status(productResponse.status).send(productResponse)
})

export default router
