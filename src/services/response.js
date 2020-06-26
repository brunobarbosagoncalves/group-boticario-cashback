class response {
  constructor() {
    this.data = {}
  }

  info() {
    return this.data
  }

  success(data = {}, options = {}) {
    const { message = "", status = 200 } = options
    this.data = {
      hasError: false,
      status: status || 200,
      message: (data && data.message) || message || "",
      data
    }
    return this.data
  }

  error(error = {}, options = {}) {
    const { message = "", status = 400 } = options
    this.data = {
      hasError: true,
      status: status || 400,
      message: (error && error.message) || message || "",
      error
    }
    return this.data
  }
}

export default new response()
