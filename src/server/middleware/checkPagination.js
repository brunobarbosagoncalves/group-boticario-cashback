export default (req, res, next) => {
  const offset = req.query.offset
  const limit = req.query.limit

  if (!offset || !limit) return res.status(400).send(`Offset and limit required`)

  if (Number.isNaN(parseInt(offset)) || Number.isNaN(parseInt(limit)))
    return res.status(400).send(`Offset or limit not a number`)

  if (limit > 500) return res.status(400).send(`Limit pagination is 500 records`)

  //Convert query string to number
  req.query.offset = Number.parseInt(req.query.offset)
  req.query.limit = Number.parseInt(req.query.limit)

  next()
}
