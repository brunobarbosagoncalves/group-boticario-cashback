import axios from "axios"
require("services/environment")

const URL_BACK = process.env.URL_BACK
let TOKEN = null

beforeAll(() => {})
afterAll(() => {})
beforeEach(() => {})
afterEach(() => {})
test("Create user(resale)", async done => {
  const userResale = await axios.post(`${URL_BACK}/v1/user`)
  done()
})
