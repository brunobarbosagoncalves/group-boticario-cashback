import axios from "axios"

class ApiCashbackExternal {
  async getData() {
    return axios.get(
      "https://mdaqk8ek5j.execute-api.us-east-1.amazonaws.com/v1/cashback?cpf=12312312323",
      { headers: { token: "ZXPURQOARHiMc6Y0flhRC1LVlZQVFRnm" } }
    )
  }
}

export default new ApiCashbackExternal()
