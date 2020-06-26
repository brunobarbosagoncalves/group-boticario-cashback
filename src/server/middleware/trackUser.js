import { v4 as uuidv4 } from "uuid"

export default (req, res, next) => {
  if (!res.get("requestId")) {
    res.append("requestId", uuidv4())
  }
  next()
}
