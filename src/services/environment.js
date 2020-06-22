import path from "path"

export default require("dotenv-flow").config({
  node_env: process.env.NODE_ENV.trim() || "development",
  path: `${path.join(__dirname, "../..")}`,
  purge_dotenv: true
})
