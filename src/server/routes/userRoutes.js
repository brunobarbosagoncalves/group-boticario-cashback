import { Router } from "express"
import { userBusiness } from "server/business"
import checkPagination from "server/middleware/checkPagination"

const router = Router()

router.get("/find-by-conditions", checkPagination, async (req, res, next) => {
  const { limit, offset, ...conditions } = req.query
  const pagination = {
    limit,
    offset
  }
  const userResponse = await userBusiness.findUserByConditions({ conditions, pagination })
  res.status(userResponse.status).send(userResponse)
})

router.get("/:id", async (req, res, next) => {
  const id = req.params.id

  const userResponse = await userBusiness.findUser(id)

  return res.status(userResponse.status).send(userResponse)
})

router.post("/", async (req, res, next) => {
  const body = req.body
  const userResponse = await userBusiness.createUser(body)
  res.status(userResponse.status).send(userResponse)
})

router.put("/:id", async (req, res, next) => {
  const id = req.params.id
  const body = req.body
  const userResponse = await userBusiness.updateUser(id, body)
  res.status(userResponse.status).send(userResponse)
})

export default router
