import "core-js/stable"
import "regenerator-runtime/runtime"

import express from "express"
import cors from "cors"
import path from "path"
import swaggerUi from "swagger-ui-express"

//middlewares
import methodOverride from "method-override"
import bodyParser from "body-parser"
import compression from "compression"
import responseTime from "response-time"

import routes from "server/routes"

//Load envs
require("services/environment")

const HOST = process.env.HOST
const SERVER_PORT = process.env.SERVER_PORT

console.log("IN SERVER::", HOST, SERVER_PORT)

//documentation api
const swaggerDocument = require("server/swagger.json")

const app = express()

//middlewares
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())
app.use(methodOverride())
app.use(compression())
app.options("*", cors())

if (process.env.NODE_ENV != "production") {
  app.use(responseTime())
}
//routes
app.use("/v1/api", routes.apiRoutes)
app.use("/v1/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument, { docExpansion: "none" }))
app.use("/v1/user", routes.userRoutes)

app.use("/", (req, res, next) => {
  return res.status(200).send(`Running on ${HOST}:${SERVER_PORT}`)
})

app.use("*", (req, res, next) => {
  return res.status(400).send(`404 - Running on ${HOST}:${SERVER_PORT}`)
})

app.listen(SERVER_PORT, HOST, () => {
  console.log(`Running on ${HOST}:${SERVER_PORT}`)
})
