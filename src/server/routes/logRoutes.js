import { Router } from "express"
import { logBusinness } from "server/business"
import checkPagination from "server/middleware/checkPagination"

const router = Router()

router.get("/:id", async (req, res, next) => {
  const { limit, offset } = req.query
  const id = req.params.id
  const pagination = {
    limit,
    offset
  }
  const logResponse = await logBusinness.findLog({ id, pagination })
  res.status(logResponse.status).send(logResponse)
})
router.get("/find-log-by-conditions", checkPagination, async (req, res, next) => {
  const { limit, offset, ...conditions } = req.query
  const pagination = {
    limit,
    offset
  }
  const logResponse = await logBusinness.findLogByConditions({ conditions, pagination })
  res.status(logResponse.status).send(logResponse)
})

router.post("/", async (req, res, next) => {
  const body = req.body
  const logResponse = await logBusinness.createLog(body)
  res.status(logResponse.status).send(logResponse)
})

router.put("/:id", async (req, res, next) => {
  const body = req.body
  const logResponse = await logBusinness.createLog({ id, body })
  res.status(logResponse.status).send(logResponse)
})

export default router
