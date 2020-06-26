import { decryptToken } from "services/token"
import response from "services/response"

export default async (req, res, next) => {
  try {
    const user = await decryptToken(req.get("Authorization"))

    if (!user) {
      const resp = response.error({}, { status: 401, message: "Unauthorized" })
      return res.status(resp.status).send(resp)
    }

    next()
  } catch (error) {
    const resp = response.error({}, { status: 401, message: "Unauthorized" })
    return res.status(resp.status).send(resp)
  }
}
