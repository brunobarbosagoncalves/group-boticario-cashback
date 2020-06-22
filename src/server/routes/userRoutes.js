import { Router } from "express"
import { userBusinness } from "server/business"
import checkPagination from "server/middleware/checkPagination"

const router = Router()

router.get("/:id", async (req, res, next) => {
  const { limit, offset } = req.query
  const id = req.params.id
  const pagination = {
    limit,
    offset
  }
  const userResponse = await userBusinness.findUser({ id, pagination })
  res.status(userResponse.status).send(userResponse)
})
router.get("/find-user-by-conditions", checkPagination, async (req, res, next) => {
  const { limit, offset, ...conditions } = req.query
  const pagination = {
    limit,
    offset
  }
  const userResponse = await userBusinness.findUserByConditions({ conditions, pagination })
  res.status(userResponse.status).send(userResponse)
})

router.post("/", async (req, res, next) => {
  const body = req.body
  const userResponse = await userBusinness.createUser(body)
  res.status(userResponse.status).send(userResponse)
})

router.put("/:id", async (req, res, next) => {
  const body = req.body
  const userResponse = await userBusinness.createUser({ id, body })
  res.status(userResponse.status).send(userResponse)
})

export default router
