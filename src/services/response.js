class response {
  success(data, message = "") {
    return { hasError: false, status: 200, data, message }
  }
  error(error, message = "") {
    return { hasError: true, status: 400, error, message }
  }
}

export default response = new response()
