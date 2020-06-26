import { Router } from "express"
import { logBusiness } from "server/business"
import checkPagination from "server/middleware/checkPagination"

const router = Router()

router.get("/find-by-conditions", checkPagination, async (req, res, next) => {
  const { limit, offset, ...conditions } = req.query
  const pagination = {
    limit,
    offset
  }
  const logResponse = await logBusiness.findLogByConditions({ conditions, pagination })
  res.status(logResponse.status).send(logResponse)
})

router.get("/:id", async (req, res, next) => {
  const { limit, offset } = req.query
  const id = req.params.id
  const pagination = {
    limit,
    offset
  }
  const logResponse = await logBusiness.findLog({ id, pagination })
  res.status(logResponse.status).send(logResponse)
})

router.post("/", async (req, res, next) => {
  const body = req.body
  const logResponse = await logBusiness.createLog(body)
  res.status(logResponse.status).send(logResponse)
})

router.put("/:id", async (req, res, next) => {
  const body = req.params.id
  const logResponse = await logBusiness.createLog(id, body)
  res.status(logResponse.status).send(logResponse)
})

export default router
