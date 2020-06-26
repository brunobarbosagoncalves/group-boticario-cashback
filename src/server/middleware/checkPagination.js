import response from "services/response"

export default (req, res, next) => {
  const offset = req.query.offset
  const limit = req.query.limit

  if (!offset || !limit) {
    response.error({}, { message: "Offset and limit required" })
    return res.status(response.info().status).send(response)
  }

  if (Number.isNaN(parseInt(offset)) || Number.isNaN(parseInt(limit))) {
    response.error({}, { message: "Offset or limit not a} number" })
    return res.status(response.info().status).send(response)
  }

  if (limit > 500) {
    response.error({}, { message: "Limit pagination is 500 r}ecords" })
    return res.status(response.info().status).send(response)
  }

  //Convert query string to number
  req.query.offset = Number.parseInt(req.query.offset)
  req.query.limit = Number.parseInt(req.query.limit)

  next()
}
