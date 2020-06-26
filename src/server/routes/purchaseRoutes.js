import { Router } from "express"
import moment from "moment"
import { purchaseBusiness, productBusiness, userBusiness, itemBusiness } from "server/business"
import checkPagination from "server/middleware/checkPagination"
import response from "services/response"
import { decryptToken } from "services/token"
import apiCashbackExternal from "api/apiCashbackExternal"

const router = Router()

router.get("/cashback-external", async (req, res, next) => {
  const responseApi = await apiCashbackExternal.getData()

  const respData = response.success(responseApi.data.body)

  return res.status(respData.status).send(respData)
})

router.get("/find-by-conditions", checkPagination, async (req, res, next) => {
  const { limit, offset, ...conditions } = req.query
  const pagination = {
    limit,
    offset
  }
  const purchaseResponse = await purchaseBusiness.findPurchaseByConditions({
    conditions,
    pagination
  })
  res.status(purchaseResponse.status).send(purchaseResponse)
})

router.get("/:id", async (req, res, next) => {
  const { limit, offset } = req.query
  const id = req.params.id
  const pagination = {
    limit,
    offset
  }
  const purchaseResponse = await purchaseBusiness.findPurchase({ id, pagination })
  res.status(purchaseResponse.status).send(purchaseResponse)
})

router.post("/", async (req, res, next) => {
  const body = req.body

  const user = await decryptToken(req.get("Authorization"))

  body.userId = user.id
  body.document = user.document
  body.date = moment().format()

  const idListProduct = body.itens.map(item => item.id).join(",")

  const productListResponse = await productBusiness.findBetweenIdsProduct(idListProduct)

  if (productListResponse.hasError) {
    response.error({}, { status: 500, message: "Try again later" })
    return res.status(response.info().status).send(response.info())
  }

  //format itens to save
  let itens = productListResponse.data
    .map(product => ({
      productId: product.id,
      valueUnit: product.value,
      item: body.itens.filter(itemList => itemList.id == product.id)[0]
    }))
    .map(product => ({
      ...product,
      quantity: product.item.quantity,
      value: product.item.quantity * product.valueUnit,
      item: {}
    }))

  //purchase value
  body.value = itens.reduce((acum, item) => (acum += item.value), 0.0).toFixed(2)
  //calc cashback
  body.cashback =
    body.value <= 1000 ? body.value * 0.1 : body.value > 1500 ? body.value * 0.2 : 0.15
  //create purchase
  const purchaseResponse = await purchaseBusiness.createPurchase(body)
  //check if error
  if (purchaseResponse.hasError) return res.status(purchaseResponse.status).send(purchaseResponse)
  //add purchaseId in item
  itens = itens.map(item => ({ ...item, purchaseId: purchaseResponse.data.id }))
  //save itens
  await Promise.all(itens.map(item => itemBusiness.createItem(item)))
  //return purchase
  return res.status(purchaseResponse.status).send(purchaseResponse)
})

router.put("/:id", async (req, res, next) => {
  const id = req.params.id
  const body = req.body
  const purchaseResponse = await purchaseBusiness.createPurchase(id, body)
  res.status(purchaseResponse.status).send(purchaseResponse)
})

router.get("/", checkPagination, async (req, res, next) => {
  const user = await decryptToken(req.get("Authorization"))
  const pagination = {
    limit: req.query.limit,
    offset: req.query.offset
  }
  const purchaseResponse = await purchaseBusiness.findMyPurchase({ userId: user.id, pagination })
  res.status(purchaseResponse.status).send(purchaseResponse)
})

export default router
