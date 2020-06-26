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
import trackUser from "server/middleware/trackUser"
import checkToken from "server/middleware/checkToken"

//Load envs
require("services/environment")

const HOST = process.env.HOST
const SERVER_PORT = process.env.SERVER_PORT

//documentation api
import swaggerDocument from "server/swagger"

const app = express()

//set info config in express
app.set("trust proxy", true)
app.options("*", cors())

//middlewares
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())
app.use(methodOverride())
app.use(compression())
app.use(trackUser)

if (process.env.NODE_ENV != "production") {
  app.use(responseTime())
}

//routes
app.get("/", (req, res, next) => res.status(200).send(`Running on ${HOST}:${SERVER_PORT}`))

app.use("/v1/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument, { docExpansion: "none" }))
app.use("/v1/user", checkToken, routes.userRoutes)
app.use("/v1/item", checkToken, routes.itemRoutes)
app.use("/v1/product", checkToken, routes.productRoutes)
app.use("/v1/purchase", checkToken, routes.purchaseRoutes)
app.use("/v1/log", checkToken, routes.logRoutes)
app.use("/v1/cron", checkToken, routes.cronRoutes)
app.use("/v1/public", routes.publicRoutes)

app.use("*", (req, res, next) => {
  return res.status(400).send(`404`)
})

app.listen(SERVER_PORT, HOST, () => {
  console.log(`Running on ${HOST}:${SERVER_PORT}`)
})
