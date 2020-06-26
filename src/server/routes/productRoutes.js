import { Router } from "express"
import { productBusiness } from "server/business"
import checkPagination from "server/middleware/checkPagination"

const router = Router()

router.get("/find-by-conditions", checkPagination, async (req, res, next) => {
  const { limit, offset, ...conditions } = req.query
  const pagination = {
    limit,
    offset
  }
  const productResponse = await productBusiness.findProductByConditions({ conditions, pagination })
  res.status(productResponse.status).send(productResponse)
})

router.get("/between-ids", async (req, res, next) => {
  const ids = req.query.ids
  const productResponse = await productBusiness.findBetweenIdsProduct(ids)
  res.status(productResponse.status).send(productResponse)
})

router
  .get("/:id", async (req, res, next) => {
    const { limit, offset } = req.query
    const id = req.params.id
    const pagination = {
      limit,
      offset
    }
    const productResponse = await productBusiness.findProduct({ id, pagination })
    res.status(productResponse.status).send(productResponse)
  })
  .put("/:id", async (req, res, next) => {
    const id = req.params.id
    const body = req.body
    const productResponse = await productBusiness.createProduct(id, body)
    res.status(productResponse.status).send(productResponse)
  })

router.post("/", async (req, res, next) => {
  const body = req.body
  const productResponse = await productBusiness.createProduct(body)
  res.status(productResponse.status).send(productResponse)
})

router

export default router
