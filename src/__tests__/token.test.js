import { encryptToken, decryptToken } from "services/token"

require("services/environment")

const URL_BACK = process.env.URL_BACK
let TOKEN = null

// jest.setTimeout(3000)

beforeAll(() => {})
afterAll(() => {})
beforeEach(() => {})
afterEach(() => {})

test("encryptToken", async done => {
  const res = await encryptToken({ name: "Bruno", age: "31" })
  expect(res).toBeDefined()
  TOKEN = res
  done()
})

test("decryptToken", async done => {
  const res = await decryptToken(TOKEN)
  expect(res).toBeDefined()
  expect(res.name).toBe("Bruno")
  expect(res.age).toBe("31")

  done()
})
