import { Router } from "express"
import { publicBusiness } from "server/business"

const router = Router()

router.post("/login", async (req, res, next) => {
  const body = req.body
  const userResponse = await publicBusiness.loginUser(body)

  res.status(userResponse.status).send(userResponse)
})

export default router
